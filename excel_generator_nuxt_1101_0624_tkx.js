// 代码生成时间: 2025-11-01 06:24:24
const ExcelJS = require('exceljs');

const fs = require('fs').promises;

const path = require('path');


// Excel文件生成器

class ExcelGenerator {

    constructor() {

        this.workbook = new ExcelJS.Workbook();

        this.sheet = this.workbook.addWorksheet('My Sheet');
    }


    // 添加一行数据到工作表
    addRow(data) {
        try {
            const row = this.sheet.addRow(data);
            return row;
        } catch (error) {
            throw new Error('Failed to add row: ' + error.message);
        }
    }


    // 设置列的属性
    setColumnWidth(columnIndex, width) {
        try {
            this.sheet.getColumn(columnIndex).width = width;
        } catch (error) {
            throw new Error('Failed to set column width: ' + error.message);
        }
    }


    // 保存工作簿到文件
    async save(filename) {
        try {
            const filePath = path.join(process.cwd(), filename);
            await fs.writeFile(filePath, this.workbook.xlsx.writeBuffer());
            console.log('Excel file saved successfully.');
        } catch (error) {
            throw new Error('Failed to save Excel file: ' + error.message);
        }
    }
}

// 使用ExcelGenerator
async function generateExcel() {
    const generator = new ExcelGenerator();

    // 添加数据行
    generator.addRow(['Name', 'Age', 'City']);
    generator.addRow(['John Doe', '30', 'New York']);
    generator.addRow(['Jane Smith', '25', 'Los Angeles']);

    // 设置列宽
    generator.setColumnWidth(1, 20);
    generator.setColumnWidth(2, 10);
    generator.setColumnWidth(3, 15);

    // 保存Excel文件
    await generator.save('sample.xlsx');
}

// 调用函数
generateExcel();
