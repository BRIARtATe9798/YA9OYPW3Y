// 代码生成时间: 2025-10-04 01:44:50
const fs = require('fs-extra');
const path = require('path');
const { promisify } = require('util');

// Promisify the 'fs' module for better async handling
const readdir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);

// Temporary file cleaner class
class TemporaryFileCleaner {
  // Path to the directory containing temporary files
  constructor(directory) {
    this.directory = directory;
  }

  // Removes all files in the temporary directory
  async cleanUp() {
    try {
      // Read all files in the directory
      const files = await readdir(this.directory);
      
      // Loop through each file and unlink it
      for (const file of files) {
        const filePath = path.join(this.directory, file);
        await unlink(filePath);
        console.log(`Removed temporary file: ${filePath}`);
      }
    } catch (error) {
      console.error('Error during temporary file cleanup:', error);
      throw error;
    }
  }
}

// Example usage
(async () => {
  // Define the path to the temporary directory
  const tempDirPath = path.join(__dirname, 'temp');

  // Initialize the TemporaryFileCleaner instance
  const cleaner = new TemporaryFileCleaner(tempDirPath);

  // Clean up temporary files
  try {
    await cleaner.cleanUp();
    console.log('All temporary files have been removed.');
  } catch (error) {
    console.error('Failed to remove temporary files:', error);
  }
})();