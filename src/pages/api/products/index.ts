import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from '@/lib/db'
import { Product } from '@/lib/models'
import { getSession } from '@/lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase()

  if (req.method === 'GET') {
    try {
      // Aggressive edge caching (cache for 60s, serve stale for up to 5 mins while revalidating)
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
      
      const { category, featured, search, limit } = req.query
      const filter: any = {}
      if (category) filter.category = category
      if (featured === 'true') filter.featured = true
      if (search) {
        // Find matching categories first so searching by category name returns products
        const { Category } = await import('@/lib/models')
        const matchingCategories = await Category.find({
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { mainCategory: { $regex: search, $options: 'i' } }
          ]
        }).select('_id')
        const catIds = matchingCategories.map((c: any) => c._id)

        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { brandName: { $regex: search, $options: 'i' } },
        ]
        
        if (catIds.length > 0) {
          filter.$or.push({ category: { $in: catIds } })
        }
      }
      const products = await Product.find(filter)
        .populate('category', 'name')
        .populate('brand', 'name image')
        .sort({ createdAt: -1 })
        .limit(limit ? parseInt(limit as string) : 100)
        .lean()
      return res.status(200).json(products)
    } catch (error: any) {
      console.error('Error in GET /products:', error?.message || error)
      return res.status(500).json({ error: 'Failed to fetch products', details: error?.message })
    }
  }

  if (req.method === 'POST') {
    try {
      const session = await getSession(req)
      if (!session) return res.status(401).json({ error: 'Unauthorized' })

      const product = await Product.create(req.body)
      return res.status(201).json(product)
    } catch (error: any) {
      console.error('Error in POST /products:', error?.message || error)
      if (error?.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation failed', details: error?.message })
      }
      return res.status(500).json({ error: 'Failed to create product', details: error?.message })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
