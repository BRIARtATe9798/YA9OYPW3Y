// 代码生成时间: 2025-09-23 22:57:22
// Import necessary modules
const os = require('os');
const { performance } = require('perf_hooks');

// Define constants for system metrics
const CPU_USAGE = 'cpu';
const MEMORY_USAGE = 'memory';

// Function to get system CPU usage
function getCPUUsage() {
  try {
    // Use the os module to get the CPU usage
    return os.cpus().map(cpu => cpu.times.user).reduce((a, b) => a + b, 0) / os.cpus().length;
  } catch (error) {
    // Handle any errors that occur
    console.error('Error fetching CPU usage:', error);
    throw error;
  }
}

// Function to get system memory usage
function getMemoryUsage() {
  try {
    // Use the os module to get the memory usage
    const memoryUsage = os.totalmem() - os.freemem();
    return memoryUsage;
  } catch (error) {
    // Handle any errors that occur
    console.error('Error fetching memory usage:', error);
    throw error;
  }
}

// Function to get system performance metrics
function getSystemPerformanceMetrics() {
  try {
    // Measure the time it takes to get CPU and memory usage
    const startTime = performance.now();
    const cpuUsage = getCPUUsage();
    const memoryUsage = getMemoryUsage();
    const endTime = performance.now();

    // Log the system performance metrics
    console.log(`CPU Usage: ${cpuUsage}%`);
    console.log(`Memory Usage: ${memoryUsage} MB`);
    console.log(`Time taken to fetch metrics: ${endTime - startTime} ms`);

    // Return the system performance metrics
    return {
      [CPU_USAGE]: cpuUsage,
      [MEMORY_USAGE]: memoryUsage,
    };
  } catch (error) {
    // Handle any errors that occur
    console.error('Error fetching system performance metrics:', error);
    throw error;
  }
}

// Export the functions
module.exports = {
  getCPUUsage,
  getMemoryUsage,
  getSystemPerformanceMetrics,
};