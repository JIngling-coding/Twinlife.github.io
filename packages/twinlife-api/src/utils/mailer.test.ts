import { sendVerificationEmail } from './mailer';

/**
 * 测试邮件发送
 */
async function testEmailSending() {
  try {
    const testEmail = '1142134248@qq.com'; // 发送到同一个邮箱进行测试
    const testCode = '123456';
    
    console.log('开始发送测试邮件...');
    await sendVerificationEmail(testEmail, testCode);
    console.log('测试邮件发送成功！');
  } catch (error) {
    console.error('测试邮件发送失败:', error);
  }
}

// 运行测试
testEmailSending(); 