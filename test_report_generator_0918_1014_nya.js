// 代码生成时间: 2025-09-18 10:14:44
// Import necessary modules and dependencies
const fs = require('fs');
const path = require('path');
const { generateReport } = require('./report_generator_utils');

// Define the TestReportGenerator class
class TestReportGenerator {
  // Constructor
  constructor() {
    this.outputPath = './test_reports'; // Default output path
  }

  // Method to set the output path
  setOutputPath(outputPath) {
    this.outputPath = outputPath;
  }

  // Method to generate the test report
  async generate(options) {
    try {
      // Validate input options
      if (!options || typeof options !== 'object') {
        throw new Error('Invalid options provided');
      }

      // Check if the output directory exists, if not create it
      const outputDir = path.join(__dirname, this.outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Generate the report
      const report = await generateReport(options);

      // Write the report to a file
      const filePath = path.join(outputDir, `test_report_${Date.now()}.html`);
      fs.writeFileSync(filePath, report);

      return filePath;
    } catch (error) {
      console.error('Error generating test report:', error.message);
      throw error;
    }
  }
}

// Export the TestReportGenerator class
module.exports = TestReportGenerator;
