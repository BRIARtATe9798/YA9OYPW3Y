// 代码生成时间: 2025-10-04 20:46:14
// Import necessary modules
const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

// Constant for log directory
const LOG_DIR = path.join(__dirname, 'logs');

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Create a Winston logger instance
const logger = createLogger({
  // Define log format
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  // Define transports
  transports: [
    new transports.File({
      filename: path.join(LOG_DIR, 'audit.log'),
      level: 'info',
    })},
  ],
  // Handle exceptions
  exceptionHandlers: [
    new transports.File({
      filename: path.join(LOG_DIR, 'exceptions.log'),
    })],
  // Rethrow errors if needed
  exitOnError: false,
});

// Add custom log levels if necessary
logger.addColors({
  info: 'green',
  warn: 'yellow',
  error: 'red',
  debug: 'blue',
});

// Export the logger instance
module.exports = logger;

/*
 * Example usage:
 * logger.info('User logged in successfully');
 * logger.warn('Potential security issue detected');
 * logger.error('An error occurred');
 * logger.debug('Debugging: user data', user);
 */