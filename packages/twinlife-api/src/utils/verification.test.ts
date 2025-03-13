import { verificationManager } from './verification';

// 设置测试环境
process.env.NODE_ENV = 'test';

/**
 * 等待指定的时间
 * @param ms 毫秒数
 */
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 测试发送验证码
 */
async function testSendCode() {
  try {
    const testPhone = '18373093892';
    
    console.log('\n1. 测试发送验证码...');
    await verificationManager.sendCode(testPhone);
    console.log('✓ 测试通过：成功发送验证码');
  } catch (error) {
    console.error('✗ 测试失败：', error);
  }
}

/**
 * 测试发送频率限制
 */
async function testSendRateLimit() {
  try {
    const testPhone = '18373093893';
    
    console.log('\n2. 测试发送频率限制...');
    console.log('第一次发送...');
    await verificationManager.sendCode(testPhone);
    
    console.log('立即尝试第二次发送...');
    try {
      await verificationManager.sendCode(testPhone);
      console.log('✗ 测试失败：应该抛出频率限制错误');
    } catch (error) {
      if (error instanceof Error && error.message.includes('请等待')) {
        console.log('✓ 测试通过：成功捕获频率限制错误');
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('✗ 测试失败：', error);
  }
}

/**
 * 测试验证码验证
 */
async function testVerifyCode() {
  try {
    const testPhone = '18373093894';
    
    console.log('\n3. 测试验证码验证...');
    
    // 发送验证码
    await verificationManager.sendCode(testPhone);
    
    // 模拟错误的验证码
    try {
      verificationManager.verifyCode(testPhone, '000000');
      console.log('✗ 测试失败：应该抛出验证码错误');
    } catch (error) {
      if (error instanceof Error && error.message === '验证码错误') {
        console.log('✓ 测试通过：成功捕获验证码错误');
      } else {
        throw error;
      }
    }
    
    // 等待验证码过期
    console.log('等待验证码过期...');
    await wait(11000);
    
    // 模拟验证码过期
    try {
      verificationManager.verifyCode(testPhone, '123456');
      console.log('✗ 测试失败：应该抛出验证码过期错误');
    } catch (error) {
      if (error instanceof Error && error.message === '验证码不存在或已过期') {
        console.log('✓ 测试通过：成功捕获验证码过期错误');
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('✗ 测试失败：', error);
  }
}

/**
 * 测试验证码尝试次数限制
 */
async function testVerifyAttempts() {
  try {
    const testPhone = '18373093895';
    
    console.log('\n4. 测试验证码尝试次数限制...');
    
    // 发送验证码
    await verificationManager.sendCode(testPhone);
    
    // 尝试多次错误验证
    for (let i = 0; i < 4; i++) {
      try {
        console.log(`第 ${i + 1} 次尝试验证...`);
        verificationManager.verifyCode(testPhone, '000000');
        console.log('✗ 测试失败：应该抛出验证码错误');
      } catch (error) {
        if (error instanceof Error) {
          if (i < 3 && error.message === '验证码错误') {
            console.log('✓ 验证码错误，符合预期');
          } else if (i === 3 && error.message === '验证码已失效，请重新获取') {
            console.log('✓ 测试通过：成功捕获尝试次数超限错误');
          } else {
            throw error;
          }
        }
      }
    }
  } catch (error) {
    console.error('✗ 测试失败：', error);
  }
}

/**
 * 运行所有测试
 */
async function runAllTests() {
  console.log('开始运行验证码管理测试...\n');
  
  // 1. 测试发送验证码
  await testSendCode();
  
  // 2. 测试发送频率限制
  await testSendRateLimit();
  
  // 3. 测试验证码验证
  await testVerifyCode();
  
  // 4. 测试验证码尝试次数限制
  await testVerifyAttempts();
  
  console.log('\n测试完成！');
}

// 运行所有测试
runAllTests(); 