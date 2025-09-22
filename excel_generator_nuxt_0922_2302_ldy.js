// 代码生成时间: 2025-09-22 23:02:20
import ExcelJS from 'exceljs';
import { defineNuxtPlugin } from '#app';

// 定义一个插件函数，用于创建和导出Excel文件
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('excelGenerator', {
    // 创建一个新的Excel工作簿
    createWorkbook() {
      return new ExcelJS.Workbook();
    },

    // 添加一个工作表到工作簿
    addWorksheet(wb, title) {
      return wb.addWorksheet(title);
    },

    // 在工作表中添加一行数据
    addRow(ws, rowData) {
      if (!ws || !rowData) {
        throw new Error('Worksheet or rowData cannot be null');
      }
      ws.addRow(rowData);
    },

    // 导出工作簿为Excel文件
    exportWorkbook(wb, filename) {
      if (!wb) {
        throw new Error('Workbook cannot be null');
      }
      return new Promise((resolve, reject) => {
        wb.xlsx.writeBuffer().then((buffer) => {
          const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          resolve();
        }).catch(reject);
      });
    },
  });
});

// 使用插件的例子，应该放在组件或页面中
/*
async function generateExcel() {
  const workbook = await nuxtApp.$excelGenerator.createWorkbook();
  const worksheet = await nuxtApp.$excelGenerator.addWorksheet(workbook, 'My Sheet');
  nuxtApp.$excelGenerator.addRow(worksheet, ['Name', 'Age', 'City']);
  nuxtApp.$excelGenerator.addRow(worksheet, ['Alice', 30, 'New York']);
  nuxtApp.$excelGenerator.addRow(worksheet, ['Bob', 25, 'Los Angeles']);
  await nuxtApp.$excelGenerator.exportWorkbook(workbook, 'example.xlsx');
}
*/