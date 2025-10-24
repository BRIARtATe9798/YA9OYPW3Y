// 代码生成时间: 2025-10-25 05:04:49
const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

// 定义备份和恢复工具类
class BackupRestoreTool {
  // 构造函数，接收备份恢复相关的配置参数
  constructor({ backupDir, restoreDir }) {
    this.backupDir = backupDir;
    this.restoreDir = restoreDir;
  }

  // 创建备份
  async createBackup() {
    try {
      // 确保备份目录存在
      await fs.ensureDir(this.backupDir);

      // 创建备份文件路径
      const backupFilePath = path.join(this.backupDir, `backup_${new Date().toISOString()}.zip`);

      // 创建归档文件
      const archive = archiver('zip', { zlib: { level: 9 } });
      const output = fs.createWriteStream(backupFilePath);
      
      // 监听归档进度
      archive.on('error', (err) => {
        throw err;
      });
      output.on('close', () => {
        console.log('备份完成。');
      });

      // 归档目录
      archive.pipe(output);
      archive.directory(this.restoreDir, false);
      archive.finalize();

      // 返回备份文件路径
      return backupFilePath;
    } catch (error) {
      console.error('备份失败:', error);
      throw error;
    }
  }

  // 恢复备份
  async restoreBackup(backupFilePath) {
    try {
      // 确保备份文件存在
      await fs.ensureFile(backupFilePath);

      // 解压备份文件到恢复目录
      const extract = archiver('zip', { zlib: { level: 9 } });
      const input = fs.createReadStream(backupFilePath);
      const output = fs.createWriteStream(this.restoreDir);
      
      // 监听解压进度
      input.on('error', (err) => {
        throw err;
      });
      output.on('close', () => {
        console.log('恢复完成。');
      });

      // 解压文件
      input.pipe(extract).pipe(output);
      await extract.finalize();

    } catch (error) {
      console.error('恢复失败:', error);
      throw error;
    }
  }
}

// 使用示例
(async () => {
  const backupRestoreTool = new BackupRestoreTool({
    backupDir: './backups',
    restoreDir: './restore'
  });

  // 创建备份
  const backupFilePath = await backupRestoreTool.createBackup();
  console.log('备份文件路径:', backupFilePath);

  // 恢复备份
  await backupRestoreTool.restoreBackup(backupFilePath);
})();
