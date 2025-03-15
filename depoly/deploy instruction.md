1. API服务部署（腾讯云函数SCF）
登录腾讯云控制台：https://console.cloud.tencent.com/
进入云函数SCF服务
创建新函数，选择"自定义创建"
函数名称填写"twinlife-api"
运行环境选择"Node.js 16.13"
提交方法选择"本地上传zip包"，上传刚才创建的twinlife-api.zip文件（位于packages/twinlife-api/twinlife-api.zip）
执行方法填写"index.handler"
高级配置中设置内存为128MB，超时时间为10秒
环境变量中添加以下变量（从.env文件中获取）：
创建函数后，添加API网关触发器，配置为允许所有方法，启用CORS
2. 前端部署（GitHub Pages）
由于我们在构建前端应用时遇到了问题，您可以使用以下方法部署前端：
使用GitHub Actions自动部署
项目已配置GitHub Actions工作流，每次推送到main分支时会自动部署
确保.github/workflows目录中有正确的工作流配置
手动部署
修复构建问题后，运行npm run build命令
将out目录中的文件上传到GitHub Pages或其他静态托管服务
3. 配置前端API地址
部署完成后，您需要配置前端应用使用正确的API地址：
在前端应用中，设置环境变量NEXT_PUBLIC_API_URL为API网关的URL
或者修改web/src/api/index.ts文件中的baseURL为API网关的URL
测试部署
部署完成后，您可以使用以下方法测试部署是否成功：
访问前端应用URL
尝试注册新用户
尝试登录
检查API调用是否正常工作