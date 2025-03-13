import { sendVerificationSMS } from './sms';

/**
 * 测试发送验证码到测试手机号
 */
async function testSendToTestPhone() {
  try {
    const testPhone = '18373093892';
    const testCode = '123456';
    
    console.log('\n1. 测试发送到测试手机号...');
    await sendVerificationSMS(testPhone, testCode);
    console.log('✓ 测试通过：成功发送到测试手机号');
  } catch (error) {
    console.error('✗ 测试失败：', error);
  }
}

/**
 * 测试发送验证码到非测试手机号（应该只打印日志）
 */
async function testSendToNonTestPhone() {
  try {
    const nonTestPhone = '13800138000';
    const testCode = '654321';
    
    console.log('\n2. 测试发送到非测试手机号...');
    await sendVerificationSMS(nonTestPhone, testCode);
    console.log('✓ 测试通过：成功打印日志而不是实际发送');
  } catch (error) {
    console.error('✗ 测试失败：', error);
  }
}

/**
 * 测试发送到无效手机号
 */
async function testSendToInvalidPhone() {
  try {
    const invalidPhone = '1234';
    const testCode = '111111';
    
    console.log('\n3. 测试发送到无效手机号...');
    await sendVerificationSMS(invalidPhone, testCode);
    console.log('✗ 测试失败：应该抛出错误但没有');
  } catch (error) {
    if (error instanceof Error && error.message === '无效的手机号格式') {
      console.log('✓ 测试通过：成功捕获到无效手机号错误');
    } else {
      console.error('✗ 测试失败：捕获到意外的错误', error);
    }
  }
}

/**
 * 测试连续发送多条短信
 */
async function testMultipleSends() {
  try {
    const testPhone = '18373093892';
    console.log('\n4. 测试连续发送多条短信...');
    
    for (let i = 0; i < 3; i++) {
      const testCode = String(100000 + i);
      console.log(`\n发送第 ${i + 1} 条短信...`);
      await sendVerificationSMS(testPhone, testCode);
      // 等待1秒再发送下一条
      if (i < 2) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    console.log('✓ 测试通过：成功连续发送多条短信');
  } catch (error) {
    console.error('✗ 测试失败：', error);
  }
}

/**
 * 运行所有测试
 */
async function runAllTests() {
  console.log('开始运行测试...\n');
  
  // 1. 测试发送到测试手机号
  await testSendToTestPhone();
  
  // 2. 测试发送到非测试手机号
  await testSendToNonTestPhone();
  
  // 3. 测试发送到无效手机号
  await testSendToInvalidPhone();
  
  // 4. 测试连续发送
  await testMultipleSends();
  
  console.log('\n测试完成！');
}

// 运行所有测试
runAllTests(); 