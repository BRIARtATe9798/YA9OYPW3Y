// 代码生成时间: 2025-10-14 21:20:37
// Import necessary modules
const fs = require('fs').promises;
const path = require('path');

// Function to list all media assets in a directory
async function listAssets(directory) {
  try {
    // Check if the directory exists
    const stats = await fs.stat(directory);
    if (!stats.isDirectory()) {
      throw new Error('Provided path is not a directory');
    }
    // Read the directory contents
    const files = await fs.readdir(directory);
    // Filter out non-media files (assuming media files have specific extensions)
    const mediaFiles = files.filter(file => /\.(jpg|jpeg|png|gif|mp4)$/i.test(file));
    return mediaFiles;
  } catch (error) {
    // Handle errors, such as directory not found
    console.error('Error listing assets:', error.message);
    throw error;
  }
}

// Function to add a new media asset
async function addAsset(directory, assetPath) {
  try {
    // Check if the directory exists
    const stats = await fs.stat(directory);
    if (!stats.isDirectory()) {
      throw new Error('Provided path is not a directory');
    }
    // Copy the asset to the media directory
    await fs.copyFile(assetPath, path.join(directory, path.basename(assetPath)));
    console.log('Asset added successfully');
  } catch (error) {
    // Handle errors, such as file not found or permission issues
    console.error('Error adding asset:', error.message);
    throw error;
  }
}

// Function to remove a media asset
async function removeAsset(directory, fileName) {
  try {
    // Check if the directory exists
    const stats = await fs.stat(directory);
    if (!stats.isDirectory()) {
      throw new Error('Provided path is not a directory');
    }
    // Remove the file from the directory
    await fs.unlink(path.join(directory, fileName));
    console.log('Asset removed successfully');
  } catch (error) {
    // Handle errors, such as file not found or permission issues
    console.error('Error removing asset:', error.message);
    throw error;
  }
}

// Export the functions for use in other parts of the application
module.exports = {
  listAssets,
  addAsset,
  removeAsset
};