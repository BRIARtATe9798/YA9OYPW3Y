// 代码生成时间: 2025-10-15 02:46:21
const { createMediaStream, createWriteStream } = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = createMediaStream();
const fs = require('fs');
const path = require('path');

/**
 * Transcodes a multimedia file from one format to another.
 * @param {string} inputFilePath - The path to the input multimedia file.
 * @param {string} outputFilePath - The path to the output multimedia file.
 * @param {string} outputFormat - The desired output format (e.g., 'mp4', 'webm').
 * @returns {Promise<void>} - A promise that resolves when the transcoding is complete.
 */
async function transcodeMedia(inputFilePath, outputFilePath, outputFormat) {
  // Check if the input file exists
  if (!fs.existsSync(inputFilePath)) {
    throw new Error(`Input file not found: ${inputFilePath}`);
  }

  try {
    // Create a readable stream from the input file
    const input = fs.createReadStream(inputFilePath);

    // Create a writeable stream to the output file
    const output = createWriteStream(outputFilePath);

    // Use ffmpeg to transcode the media file
    ffmpeg(input, output)
      .on('error', (err) => {
        throw new Error(`Transcoding error: ${err.message}`);
      })
      .on('end', () => {
        console.log(`Transcoding complete: ${outputFilePath}`);
      });

    // Wait for the transcoding process to finish
    await new Promise((resolve, reject) => {
      ffmpeg(input, output)
        .on('error', reject)
        .on('end', resolve);
    });
  } catch (error) {
    console.error(`Failed to transcode media: ${error.message}`);
    throw error;
  }
}

// Example usage
const inputFilePath = path.join(__dirname, 'input.mp4');
const outputFilePath = path.join(__dirname, 'output.webm');
const outputFormat = 'webm';

transcodeMedia(inputFilePath, outputFilePath, outputFormat)
  .then(() => console.log('Transcoding successful.'))
  .catch((error) => console.error('Transcoding failed:', error));
