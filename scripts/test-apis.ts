import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_URL = 'http://localhost:3000/api';

async function testAuth() {
  console.log('Testing authentication...');
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@seaduckmarine.com',
      password: 'password123'
    });
    console.log('✅ Auth working perfectly. Token received:', res.data.token ? 'Yes' : 'No');
    return res.data.token;
  } catch (error: any) {
    console.error('❌ Auth failed:', error.response?.data || error.message);
    return null;
  }
}

async function testUpload() {
  console.log('\nTesting image upload...');
  try {
    // 1x1 transparent png base64
    const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    
    const res = await axios.post(`${API_URL}/upload`, {
      fileBase64: base64Image,
      folder: 'test'
    });
    
    console.log('✅ Upload working perfectly. Image URL:', res.data.secure_url);
  } catch (error: any) {
    console.error('❌ Upload failed:', error.response?.data || error.message);
  }
}

async function testOtherApis() {
  console.log('\nTesting other APIs connection...');
  const endpoints = ['/products', '/categories', '/brands', '/services'];
  
  for (const endpoint of endpoints) {
    try {
      const res = await axios.get(`${API_URL}${endpoint}`);
      console.log(`✅ ${endpoint} connected. Found ${res.data.length || (res.data.products && res.data.products.length) || 0} items.`);
    } catch (error: any) {
      console.error(`❌ ${endpoint} connection failed:`, error.response?.data || error.message);
    }
  }
}

async function runTests() {
  const token = await testAuth();
  await testUpload();
  await testOtherApis();
  console.log('\nAll tests finished. Server did not crash!');
}

runTests();
