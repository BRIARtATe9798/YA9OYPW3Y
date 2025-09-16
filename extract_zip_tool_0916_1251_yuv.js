// 代码生成时间: 2025-09-16 12:51:18
// extract_zip_tool.js - A utility tool for extracting zip files using JS and Nuxt framework.

// Importing necessary modules
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip'); // Node.js package to handle zip files

// Function to extract a zip file
async function extractZipFile(zipFilePath, targetFolderPath) {
  // Check if the zip file exists
  if (!fs.existsSync(zipFilePath)) {
    throw new Error('Zip file does not exist.');
  }

  // Create the target folder if it does not exist
  if (!fs.existsSync(targetFolderPath)) {
    fs.mkdirSync(targetFolderPath, { recursive: true });
  }

  // Read the zip file
  const zip = new AdmZip(zipFilePath);
  // Extract all files from the zip file into the target folder
  zip.extractAllTo(targetFolderPath, /*overwrite*/true);

  console.log('Zip file extracted successfully.');
}

// Function to handle extraction error
function handleError(error) {
  console.error('Failed to extract zip file:', error.message);
}

// Example usage
const zipFilePath = 'path/to/your/file.zip';
const targetFolderPath = 'path/to/your/destination';

extractZipFile(zipFilePath, targetFolderPath)
  .then(() => console.log('Extraction completed.'))
  .catch(handleError);
