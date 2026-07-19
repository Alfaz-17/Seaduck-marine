import mongoose from 'mongoose'

const MONGODB_URI = process.env.DB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the DB_URI environment variable inside .env')
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache
}

let cached: MongooseCache = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      connectTimeoutMS: 3000,
      serverSelectionTimeoutMS: 3000,
      socketTimeoutMS: 3000,
      autoIndex: false,
    }

    // Strict 3.5s timeout fallback to prevent any event loop hangs
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Mongoose connection timed out (3.5s limit)')), 3500)
    })

    const connectionPromise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      return mongooseInstance
    })

    cached.promise = Promise.race([connectionPromise, timeoutPromise])
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

async function disconnectFromDatabase() {
  try {
    if (mongoose.connection && mongoose.connection.readyState !== 0) {
      await mongoose.disconnect()
    }
  } catch (err) {
    console.error("Error during database disconnect:", err)
  } finally {
    cached.conn = null
    cached.promise = null
  }
}

export { connectToDatabase, disconnectFromDatabase }
export default connectToDatabase
