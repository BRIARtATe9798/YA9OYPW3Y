// 代码生成时间: 2025-09-20 08:03:04
// Import required modules
const crypto = require('crypto');

/**
 * Encrypt a password using a secret key and algorithm
 *
 * @param {string} password - The password to encrypt
 * @param {string} secretKey - The secret key for encryption
 * @param {string} algorithm - The algorithm to use for encryption (default: 'aes-256-cbc')
 * @returns {string} - The encrypted password
 */
function encryptPassword(password, secretKey, algorithm = 'aes-256-cbc') {
  return new Promise((resolve, reject) => {
    // Generate a random initialization vector
    crypto.randomBytes(16, (err, iv) => {
      if (err) reject(err);

      // Create a cipher using the provided algorithm
      const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);

      // Encrypt the password and append the initialization vector to the result
      let encrypted = '';
      cipher.on('readable', () => {
        const data = cipher.read();
        if (data) encrypted += data.toString('hex');
      });
      cipher.on('end', () => {
        resolve(iv.toString('hex') + encrypted);
      });
      cipher.on('error', (err) => {
        reject(err);
      });
      cipher.write(password);
      cipher.end();
    });
  });
}

/**
 * Decrypt a password using a secret key and algorithm
 *
 * @param {string} encryptedPassword - The encrypted password to decrypt
 * @param {string} secretKey - The secret key for decryption
 * @param {string} algorithm - The algorithm to use for decryption (default: 'aes-256-cbc')
 * @returns {string} - The decrypted password
 */
function decryptPassword(encryptedPassword, secretKey, algorithm = 'aes-256-cbc') {
  return new Promise((resolve, reject) => {
    // Extract the initialization vector from the encrypted password
    const iv = Buffer.from(encryptedPassword.substring(0, 32), 'hex');
    const encryptedText = encryptedPassword.substring(32);

    // Create a decipher using the provided algorithm
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);

    // Decrypt the password
    let decrypted = '';
    decipher.on('readable', () => {
      const data = decipher.read();
      if (data) decrypted += data.toString('utf8');
    });
    decipher.on('end', () => {
      resolve(decrypted);
    });
    decipher.on('error', (err) => {
      reject(err);
    });
    decipher.write(encryptedText, 'hex');
    decipher.end();
  });
}

// Export the functions for use in other modules
module.exports = { encryptPassword, decryptPassword };