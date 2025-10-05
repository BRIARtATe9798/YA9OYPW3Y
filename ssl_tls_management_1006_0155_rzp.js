// 代码生成时间: 2025-10-06 01:55:22
 * 作者：[Nuxt开发者]
 * 日期：[2023-04-03]
 */

// 引入必要的模块
const fs = require('fs');
const https = require('https');
const { promisify } = require('util');
const getCertificate = promisify(https.get);
const pem = require('pem');

// 验证SSL/TLS证书有效性
async function verifyCertificate(host, port) {
  // 检查传入的参数
  if (!host || !port) {
    throw new Error('Host and port are required');
  }

  try {
    // 获取证书信息
    const certInfo = await getCertificate({
      host: host,
      port: port,
      rejectUnauthorized: false,
    });

    // 证书信息
    const { cert } = certInfo;
    if (!cert) {
      throw new Error('No certificate found');
    }

    // 验证证书
    const { subject, issuer, valid_to } = cert;
    console.log(`Subject: ${subject.commonName}
Issuer: ${issuer.commonName}
Valid until: ${valid_to}`);
  } catch (error) {
    // 错误处理
    console.error('Error verifying certificate:', error.message);
    throw error;
  }
}

// 生成SSL/TLS证书
async function generateCertificate(commonName) {
  // 检查传入的参数
  if (!commonName) {
    throw new Error('Common name is required');
  }

  try {
    // 生成证书
    const keys = await pem.createCertificate({
      days: 365,
      selfSigned: true,
   });

    // 保存证书
    await fs.promises.writeFile('server.key', keys.serviceKey);
    await fs.promises.writeFile('server.crt', keys.certificate);
    console.log('Certificate generated successfully');
  } catch (error) {
    // 错误处理
    console.error('Error generating certificate:', error.message);
    throw error;
  }
}

// 导出模块
module.exports = {
  verifyCertificate,
  generateCertificate,
};