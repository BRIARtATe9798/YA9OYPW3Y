// 代码生成时间: 2025-10-08 19:10:39
// Import necessary modules and components
const axios = require('axios');

// Define the TestingEnvironmentService class
class TestingEnvironmentService {
  // Constructor
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // Method to create a new testing environment
  async createEnvironment(payload) {
    try {
      const response = await axios.post(`${this.baseURL}/environment`, payload);
      return response.data;
    } catch (error) {
      console.error('Failed to create testing environment:', error);
      throw error;
    }
  }

  // Method to retrieve all testing environments
  async getAllEnvironments() {
    try {
      const response = await axios.get(`${this.baseURL}/environment`);
      return response.data;
    } catch (error) {
      console.error('Failed to retrieve testing environments:', error);
      throw error;
    }
  }

  // Method to update a testing environment
  async updateEnvironment(id, payload) {
    try {
      const response = await axios.put(`${this.baseURL}/environment/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Failed to update testing environment:', error);
      throw error;
    }
  }

  // Method to delete a testing environment
  async deleteEnvironment(id) {
    try {
      const response = await axios.delete(`${this.baseURL}/environment/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete testing environment:', error);
      throw error;
    }
  }
}

// Export the TestingEnvironmentService class for use in other parts of the application
module.exports = TestingEnvironmentService;