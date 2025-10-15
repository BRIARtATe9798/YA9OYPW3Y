// 代码生成时间: 2025-10-16 02:54:21
// Import necessary modules and utilities
const { createClient } = require('@nuxt/content')
const client = createClient({
  apiBaseURL: process.env.CONTENT_API_BASE_URL,
})

// Define the MediaAssetService class
class MediaAssetService {
  // Constructor to initialize the content client
  constructor() {
    this.assets = client.getCollection('media-assets')
  }

  // Method to fetch all media assets
  async getAllAssets() {
    try {
      const assets = await this.assets.getAll()
      return assets
    } catch (error) {
      // Handle error and throw a user-friendly message
      console.error('Failed to fetch all media assets:', error)
      throw new Error('Error fetching media assets')
    }
  }

  // Method to fetch a single media asset by slug
  async getAssetBySlug(slug) {
    try {
      const asset = await this.assets.get(slug)
      return asset
    } catch (error) {
      // Handle error and throw a user-friendly message
      console.error('Failed to fetch media asset by slug:', error)
      throw new Error(`Error fetching media asset with slug: ${slug}`)
    }
  }

  // Method to create a new media asset
  async createAsset(data) {
    try {
      const asset = await this.assets.create(data)
      return asset
    } catch (error) {
      // Handle error and throw a user-friendly message
      console.error('Failed to create media asset:', error)
      throw new Error('Error creating media asset')
    }
  }

  // Method to update an existing media asset
  async updateAsset(slug, data) {
    try {
      const asset = await this.assets.update(slug, data)
      return asset
    } catch (error) {
      // Handle error and throw a user-friendly message
      console.error('Failed to update media asset:', error)
      throw new Error(`Error updating media asset with slug: ${slug}`)
    }
  }

  // Method to delete a media asset
  async deleteAsset(slug) {
    try {
      const asset = await this.assets.delete(slug)
      return asset
    } catch (error) {
      // Handle error and throw a user-friendly message
      console.error('Failed to delete media asset:', error)
      throw new Error(`Error deleting media asset with slug: ${slug}`)
    }
  }
}

// Export the MediaAssetService class
module.exports = MediaAssetService