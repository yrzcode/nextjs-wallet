module.exports = {
  storybookUrl: 'http://localhost:6006',
  
  // 配置浏览器
  browsers: ['chromium'],
  
  // 测试超时时间
  testTimeout: 15000,
  
  // 并发运行数量
  maxWorkers: process.env.CI ? 2 : undefined,
  
  // 要测试的story文件
  include: [
    '**/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  
  // 排除的story文件
  exclude: [
    '**/stories/**/Introduction.stories.mdx'
  ]
}; 