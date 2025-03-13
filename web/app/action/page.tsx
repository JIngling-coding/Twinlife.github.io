"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  ListTodo,
  Calendar,
  BarChart4,
  Clock,
  AlertTriangle,
  Users,
  Zap,
  Award,
  Layers,
  GitBranch,
  Sparkles,
  Brain,
  Flame,
  Trophy,
  LineChart,
  Lightbulb,
  Globe,
  BookOpen,
  CheckSquare,
  BarChart3,
} from "lucide-react"
import { TaskViews } from "@/components/task-views"

export default function ActionManagementPage() {
  return (
    <div className="h-full overflow-auto pb-20">
      <div className="mb-6">
        <TaskViews />
      </div>

      <Tabs defaultValue="goals" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="goals">目标体系</TabsTrigger>
          <TabsTrigger value="projects">项目管理</TabsTrigger>
          <TabsTrigger value="tasks">任务执行</TabsTrigger>
          <TabsTrigger value="data">数据中心</TabsTrigger>
        </TabsList>

        {/* 目标体系构建 */}
        <TabsContent value="goals" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SMART目标分解 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">SMART目标分解</CardTitle>
                  <Target className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>将长期目标拆解为可量化、有时限的子目标</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">5年职业规划</span>
                      <Badge variant="outline">长期</Badge>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>

                  <div className="space-y-2 pl-4 border-l-2 border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">年度能力提升计划</span>
                      <Badge variant="outline">中期</Badge>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>

                  <div className="space-y-2 pl-8 border-l-2 border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">季度项目里程碑</span>
                      <Badge variant="outline">短期</Badge>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <span className="text-xs text-muted-foreground">目标树成长进度: 45%</span>
              </CardFooter>
            </Card>

            {/* 目标优先级矩阵 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">目标优先级矩阵</CardTitle>
                  <Layers className="h-5 w-5 text-purple-500" />
                </div>
                <CardDescription>四象限法标注目标紧急/重要程度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 h-[180px]">
                  <div className="border rounded p-2 bg-red-50">
                    <div className="text-xs font-medium mb-1 text-red-600">紧急且重要</div>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center">
                        <div className="mr-1 h-1 w-1 rounded-full bg-red-500"></div>
                        <span>完成季度报告</span>
                      </li>
                      <li className="flex items-center">
                        <div className="mr-1 h-1 w-1 rounded-full bg-red-500"></div>
                        <span>准备客户演示</span>
                      </li>
                    </ul>
                  </div>
                  <div className="border rounded p-2 bg-amber-50">
                    <div className="text-xs font-medium mb-1 text-amber-600">重要不紧急</div>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center">
                        <div className="mr-1 h-1 w-1 rounded-full bg-amber-500"></div>
                        <span>技能提升计划</span>
                      </li>
                      <li className="flex items-center">
                        <div className="mr-1 h-1 w-1 rounded-full bg-amber-500"></div>
                        <span>长期项目规划</span>
                      </li>
                    </ul>
                  </div>
                  <div className="border rounded p-2 bg-blue-50">
                    <div className="text-xs font-medium mb-1 text-blue-600">紧急不重要</div>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center">
                        <div className="mr-1 h-1 w-1 rounded-full bg-blue-500"></div>
                        <span>回复邮件</span>
                      </li>
                      <li className="flex items-center">
                        <div className="mr-1 h-1 w-1 rounded-full bg-blue-500"></div>
                        <span>日常会议</span>
                      </li>
                    </ul>
                  </div>
                  <div className="border rounded p-2 bg-gray-50">
                    <div className="text-xs font-medium mb-1 text-gray-600">不紧急不重要</div>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center">
                        <div className="mr-1 h-1 w-1 rounded-full bg-gray-500"></div>
                        <span>社交媒体浏览</span>
                      </li>
                      <li className="flex items-center">
                        <div className="mr-1 h-1 w-1 rounded-full bg-gray-500"></div>
                        <span>非必要会议</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <span className="text-xs text-muted-foreground">推荐执行时段: 上午9:00-11:00 (能量高峰)</span>
              </CardFooter>
            </Card>

            {/* 目标-资源匹配度分析 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">目标-资源匹配度分析</CardTitle>
                  <BarChart4 className="h-5 w-5 text-green-500" />
                </div>
                <CardDescription>预警资源不足的高优先级目标</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">技能提升计划</span>
                      <span className="text-xs text-green-600 font-medium">匹配度: 85%</span>
                    </div>
                    <div className="flex items-center text-xs space-x-2">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-blue-500" />
                        <span>时间: 充足</span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="h-3 w-3 mr-1 text-yellow-500" />
                        <span>能量: 充足</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1 text-purple-500" />
                        <span>支持: 充足</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">季度项目里程碑</span>
                      <span className="text-xs text-amber-600 font-medium">匹配度: 65%</span>
                    </div>
                    <div className="flex items-center text-xs space-x-2">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-blue-500" />
                        <span>时间: 紧张</span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="h-3 w-3 mr-1 text-yellow-500" />
                        <span>能量: 充足</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1 text-purple-500" />
                        <span>支持: 充足</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">客户拓展计划</span>
                      <span className="text-xs text-red-600 font-medium">匹配度: 45%</span>
                    </div>
                    <div className="flex items-center text-xs space-x-2">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-red-500" />
                        <span>时间: 不足</span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="h-3 w-3 mr-1 text-red-500" />
                        <span>能量: 不足</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1 text-blue-500" />
                        <span>支持: 充足</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center text-xs text-red-500">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  <span>资源预警: 客户拓展计划需调整范围或增加资源</span>
                </div>
              </CardFooter>
            </Card>

            {/* 游戏化设计 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">游戏化激励</CardTitle>
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
                <CardDescription>通过游戏化元素提升目标达成动力</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                      <span className="text-sm font-medium">目标树成长系统</span>
                    </div>
                    <div className="pl-6 text-xs text-muted-foreground">
                      每完成子目标，虚拟目标树生长并掉落「能量果实」
                    </div>
                    <div className="pl-6 flex items-center">
                      <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        已收集: 12个能量果实
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-purple-500" />
                      <span className="text-sm font-medium">成就徽章</span>
                    </div>
                    <div className="pl-6 text-xs text-muted-foreground">连续3个月完成核心目标解锁「战略大师」称号</div>
                    <div className="pl-6 flex space-x-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                        <span className="text-xs text-white font-bold">专注</span>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                        <span className="text-xs text-white font-bold">坚持</span>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-400 font-bold">?</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <span className="text-xs text-muted-foreground">下一成就: 连续完成目标还需 7 天</span>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* 项目管理模块 */}
        <TabsContent value="projects" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 项目驾驶舱 */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">项目驾驶舱</CardTitle>
                  <GitBranch className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>可视化看板展示项目阶段进度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">个人品牌建设项目</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                        进行中
                      </Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div className="border rounded p-2 bg-green-50">
                        <div className="text-xs font-medium mb-1 text-green-600">规划阶段</div>
                        <Progress value={100} className="h-1.5 mb-1" />
                        <span className="text-xs text-muted-foreground">已完成</span>
                      </div>
                      <div className="border rounded p-2 bg-blue-50">
                        <div className="text-xs font-medium mb-1 text-blue-600">执行阶段</div>
                        <Progress value={60} className="h-1.5 mb-1" />
                        <span className="text-xs text-muted-foreground">进行中</span>
                      </div>
                      <div className="border rounded p-2 bg-gray-50">
                        <div className="text-xs font-medium mb-1 text-gray-600">验证阶段</div>
                        <Progress value={0} className="h-1.5 mb-1" />
                        <span className="text-xs text-muted-foreground">未开始</span>
                      </div>
                      <div className="border rounded p-2 bg-gray-50">
                        <div className="text-xs font-medium mb-1 text-gray-600">优化阶段</div>
                        <Progress value={0} className="h-1.5 mb-1" />
                        <span className="text-xs text-muted-foreground">未开始</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs mt-1">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-blue-500" />
                        <span>预计完成时间: 2023/12/15</span>
                      </div>
                      <div className="flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
                        <span className="text-amber-600">风险预警: 执行阶段进度略慢</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t pt-3">
                    <div className="space-y-1">
                      <span className="text-xs font-medium">时间资源</span>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>已用</span>
                          <span>45小时</span>
                        </div>
                        <Progress value={45} className="h-1.5" />
                        <div className="flex items-center justify-between text-xs">
                          <span>预算</span>
                          <span>100小时</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-medium">资金资源</span>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>已用</span>
                          <span>¥2,500</span>
                        </div>
                        <Progress value={50} className="h-1.5" />
                        <div className="flex items-center justify-between text-xs">
                          <span>预算</span>
                          <span>¥5,000</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-medium">人力资源</span>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>已用</span>
                          <span>3人</span>
                        </div>
                        <Progress value={75} className="h-1.5" />
                        <div className="flex items-center justify-between text-xs">
                          <span>预算</span>
                          <span>4人</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 协作系统 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">协作系统</CardTitle>
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
                <CardDescription>项目协作与资源整合</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">外交部合作邀请</span>
                    </div>
                    <div className="pl-6 text-xs text-muted-foreground">一键生成项目需求文档，邀请外部协作者</div>
                    <div className="pl-6 flex space-x-2">
                      <Badge variant="outline" className="text-xs">
                        设计师
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        开发者
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        营销专家
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-purple-500" />
                      <span className="text-sm font-medium">研发部技术支持</span>
                    </div>
                    <div className="pl-6 text-xs text-muted-foreground">自动关联知识库中的相关方法论模板</div>
                    <div className="pl-6 flex space-x-2">
                      <Badge variant="outline" className="text-xs bg-purple-50">
                        敏捷开发
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-purple-50">
                        设计思维
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 特色功能 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">特色功能</CardTitle>
                  <Sparkles className="h-5 w-5 text-amber-500" />
                </div>
                <CardDescription>项目管理增强工具</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Brain className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">情景模拟器</span>
                    </div>
                    <div className="pl-6 text-xs text-muted-foreground">预测项目不同决策的结果</div>
                    <div className="pl-6 grid grid-cols-2 gap-2 text-xs">
                      <div className="border rounded p-1.5 bg-blue-50">
                        <div className="font-medium text-blue-700 mb-1">加班赶工</div>
                        <div className="flex items-center">
                          <Zap className="h-3 w-3 mr-1 text-red-500" />
                          <span className="text-red-600">能量-30%</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-green-500" />
                          <span className="text-green-600">进度+15%</span>
                        </div>
                      </div>
                      <div className="border rounded p-1.5 bg-green-50">
                        <div className="font-medium text-green-700 mb-1">调整范围</div>
                        <div className="flex items-center">
                          <Zap className="h-3 w-3 mr-1 text-blue-500" />
                          <span className="text-blue-600">能量+5%</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-amber-500" />
                          <span className="text-amber-600">进度-5%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                      <span className="text-sm font-medium">里程碑庆祝</span>
                    </div>
                    <div className="pl-6 text-xs text-muted-foreground">
                      完成关键节点触发全屏特效，积累「团队士气值」
                    </div>
                    <div className="pl-6 flex items-center">
                      <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                        团队士气值: 78/100
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 任务执行引擎 */}
        <TabsContent value="tasks" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 智能任务池 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">智能任务池</CardTitle>
                  <ListTodo className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>自动抓取目标体系中的待办事项</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 border rounded bg-red-50">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">完成客户提案</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      紧急重要
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded bg-amber-50">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                      <span className="text-sm">学习新技能</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      重要不紧急
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded bg-blue-50">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">回复邮件</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      紧急不重要
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded bg-gray-50">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                      <span className="text-sm">整理文件</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      不紧急不重要
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <span className="text-xs text-muted-foreground">支持语音/文字快速录入临时任务</span>
              </CardFooter>
            </Card>

            {/* 动态排序系统 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">动态排序系统</CardTitle>
                  <Layers className="h-5 w-5 text-purple-500" />
                </div>
                <CardDescription>基于能量曲线预测推荐任务执行时段</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">今日能量曲线</div>
                    <div className="h-20 bg-gray-50 rounded border relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-8 border-b border-dashed border-blue-300 relative">
                          <div
                            className="absolute h-2 w-2 bg-blue-500 rounded-full"
                            style={{ left: "10%", top: "-4px" }}
                          ></div>
                          <div
                            className="absolute h-2 w-2 bg-blue-500 rounded-full"
                            style={{ left: "30%", top: "-4px" }}
                          ></div>
                          <div
                            className="absolute h-2 w-2 bg-blue-500 rounded-full"
                            style={{ left: "50%", top: "-4px" }}
                          ></div>
                          <div
                            className="absolute h-2 w-2 bg-blue-500 rounded-full"
                            style={{ left: "70%", top: "-4px" }}
                          ></div>
                          <div
                            className="absolute h-2 w-2 bg-blue-500 rounded-full"
                            style={{ left: "90%", top: "-4px" }}
                          ></div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 text-xs p-1">早晨</div>
                      <div className="absolute bottom-0 right-0 text-xs p-1">晚上</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">推荐执行时段</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded bg-green-50">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">创意类任务</span>
                        </div>
                        <span className="text-xs">上午 9:00-11:00</span>
                      </div>

                      <div className="flex items-center justify-between p-2 border rounded bg-blue-50">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-sm">分析类任务</span>
                        </div>
                        <span className="text-xs">下午 2:00-4:00</span>
                      </div>

                      <div className="flex items-center justify-between p-2 border rounded bg-purple-50">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                          <span className="text-sm">沟通类任务</span>
                        </div>
                        <span className="text-xs">下午 4:00-6:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center text-xs text-amber-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  <span>紧急任务插队时，自动计算对其他任务的影响</span>
                </div>
              </CardFooter>
            </Card>

            {/* 执行反馈闭环 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">执行反馈闭环</CardTitle>
                  <LineChart className="h-5 w-5 text-green-500" />
                </div>
                <CardDescription>优化未来任务预估模型</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">任务完成记录</div>
                    <div className="space-y-2">
                      <div className="p-2 border rounded">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">客户提案设计</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            已完成
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-blue-500" />
                            <span>预估: 2小时</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-amber-500" />
                            <span>实际: 3小时</span>
                          </div>
                          <div className="flex items-center">
                            <Zap className="h-3 w-3 mr-1 text-purple-500" />
                            <span>难度: 中等</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 border rounded">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">数据分析报告</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            已完成
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-blue-500" />
                            <span>预估: 4小时</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-green-500" />
                            <span>实际: 3.5小时</span>
                          </div>
                          <div className="flex items-center">
                            <Zap className="h-3 w-3 mr-1 text-red-500" />
                            <span>难度: 较高</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Lightbulb className="h-3 w-3 mr-1" />
                  <span>支持「执行阻力分析」：标记拖延原因</span>
                </div>
              </CardFooter>
            </Card>

            {/* 游戏化工具 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">游戏化工具</CardTitle>
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
                <CardDescription>将任务执行游戏化，提升完成动力</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">时间沙漏</span>
                    </div>
                    <div className="pl-6 text-xs text-muted-foreground">设定任务倒计时，准时完成获得双倍经验值</div>
                    <div className="pl-6 p-2 border rounded bg-blue-50 text-xs">
                      <div className="font-medium mb-1">当前任务: 完成周报</div>
                      <div className="flex items-center justify-between">
                        <span>剩余时间: 00:45:30</span>
                        <span>奖励: 50经验值</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Flame className="h-4 w-4 mr-2 text-red-500" />
                      <span className="text-sm font-medium">BOSS战模式</span>
                    </div>
                    <div className="pl-6 text-xs text-muted-foreground">
                      将复杂任务包装为「关卡BOSS」，使用「专注力武器」击败
                    </div>
                    <div className="pl-6 p-2 border rounded bg-red-50 text-xs">
                      <div className="font-medium mb-1">当前BOSS: 季度报告</div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span>BOSS生命值:</span>
                          <Progress value={35} className="h-1.5 w-16 ml-1" />
                        </div>
                        <span>奖励: 稀有道具</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <span className="text-xs text-muted-foreground">本周已获得: 350经验值 | 2个稀有道具</span>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* 行动数据中心 */}
        <TabsContent value="data" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 执行效能仪表盘 */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">执行效能仪表盘</CardTitle>
                  <BarChart4 className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>核心指标与对比分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="p-3 border rounded bg-blue-50">
                    <div className="text-xs text-muted-foreground mb-1">任务完成率</div>
                    <div className="text-2xl font-bold text-blue-700">78%</div>
                    <div className="text-xs text-green-600 mt-1">↑ 5% 环比上周</div>
                  </div>

                  <div className="p-3 border rounded bg-green-50">
                    <div className="text-xs text-muted-foreground mb-1">平均耗时</div>
                    <div className="text-2xl font-bold text-green-700">1.2h</div>
                    <div className="text-xs text-red-600 mt-1">↑ 0.2h 环比上周</div>
                  </div>

                  <div className="p-3 border rounded bg-amber-50">
                    <div className="text-xs text-muted-foreground mb-1">计划偏离度</div>
                    <div className="text-2xl font-bold text-amber-700">15%</div>
                    <div className="text-xs text-green-600 mt-1">↓ 3% 环比上周</div>
                  </div>

                  <div className="p-3 border rounded bg-purple-50">
                    <div className="text-xs text-muted-foreground mb-1">习惯稳固指数</div>
                    <div className="text-2xl font-bold text-purple-700">82%</div>
                    <div className="text-xs text-green-600 mt-1">↑ 7% 环比上周</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-medium">执行力变化曲线</div>
                  <div className="h-40 bg-gray-50 rounded border relative">
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                      执行力变化趋势图
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>4周前</span>
                    <span>3周前</span>
                    <span>2周前</span>
                    <span>1周前</span>
                    <span>本周</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI参谋系统 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">AI参谋系统</CardTitle>
                  <Brain className="h-5 w-5 text-purple-500" />
                </div>
                <CardDescription>诊断执行瓶颈与生成优化方案</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">执行瓶颈诊断</div>
                    <div className="p-3 border rounded bg-red-50">
                      <div className="text-sm font-medium text-red-800 mb-2">高频失败任务类型</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span>社交类任务</span>
                          <span className="text-red-600">完成率 30%</span>
                        </div>
                        <Progress value={30} className="h-1.5" />

                        <div className="flex items-center justify-between text-xs">
                          <span>创意类任务</span>
                          <span className="text-amber-600">完成率 55%</span>
                        </div>
                        <Progress value={55} className="h-1.5" />

                        <div className="flex items-center justify-between text-xs">
                          <span>长期项目</span>
                          <span className="text-green-600">完成率 75%</span>
                        </div>
                        <Progress value={75} className="h-1.5" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">优化方案推荐</div>
                    <div className="p-3 border rounded bg-blue-50">
                      <div className="text-sm font-medium text-blue-800 mb-2">针对性提升建议</div>
                      <ul className="space-y-2 text-xs">
                        <li className="flex items-start">
                          <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                          <span>参加「任务拆解工作坊」，将社交类任务拆分为更小步骤</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                          <span>尝试「专注力训练课程」，提升创意类任务的执行效率</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                          <span>调整长期项目的里程碑设置，增加阶段性反馈</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Lightbulb className="h-3 w-3 mr-1" />
                  <span>AI会根据您的执行数据持续优化建议</span>
                </div>
              </CardFooter>
            </Card>

            {/* 跨部门联动 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">跨部门联动</CardTitle>
                  <GitBranch className="h-5 w-5 text-green-500" />
                </div>
                <CardDescription>行动数据的跨部门应用</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckSquare className="h-4 w-4 mr-2 text-red-500" />
                      <span className="text-sm font-medium">产品部联动</span>
                    </div>
                    <div className="pl-6 text-xs text-muted-foreground">
                      向产品部输出「执行力评分」，影响作品更新频率
                    </div>
                    <div className="pl-6 p-2 border rounded bg-red-50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">执行力评分</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          78分
                        </Badge>
                      </div>
                      <div className="text-xs">
                        <p>影响：作品更新频率提升15%</p>
                        <p>建议：保持当前执行节奏，稳步提升产出质量</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">财务部联动</span>
                    </div>
                    <div className="pl-6 text-xs text-muted-foreground">
                      为财务部提供「时间成本」数据，优化资金分配策略
                    </div>
                    <div className="pl-6 p-2 border rounded bg-blue-50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">时间成本分析</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          已同步
                        </Badge>
                      </div>
                      <div className="text-xs">
                        <p>高价值时间：每周一上午、周四下午</p>
                        <p>建议：将高投入项目安排在高价值时间段</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center text-xs text-green-600">
                  <Zap className="h-3 w-3 mr-1" />
                  <span>跨部门数据联动已提升整体效能12%</span>
                </div>
              </CardFooter>
            </Card>

            {/* 核心价值升级 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">核心价值升级</CardTitle>
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
                <CardDescription>行动管理带来的核心价值</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-2 border rounded bg-blue-50">
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">目标-执行一致性</span>
                    </div>
                    <div className="pl-6 text-xs text-blue-700 mt-1">确保每日任务与人生战略方向高度对齐</div>
                  </div>

                  <div className="p-2 border rounded bg-green-50">
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm font-medium text-green-800">动态适应性</span>
                    </div>
                    <div className="pl-6 text-xs text-green-700 mt-1">根据实时能量状态与资源变化智能调整计划</div>
                  </div>

                  <div className="p-2 border rounded bg-purple-50">
                    <div className="flex items-center">
                      <BarChart4 className="h-4 w-4 mr-2 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">行为数据资产化</span>
                    </div>
                    <div className="pl-6 text-xs text-purple-700 mt-1">长期积累的执行数据转化为个人能力认证凭证</div>
                  </div>

                  <div className="p-2 border rounded bg-amber-50">
                    <div className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-amber-600" />
                      <span className="text-sm font-medium text-amber-800">痛苦最小化</span>
                    </div>
                    <div className="pl-6 text-xs text-amber-700 mt-1">游戏化机制大幅降低行动启动的心理阻力</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Lightbulb className="h-3 w-3 mr-1" />
                  <span>精细化行动管理是实现个人目标的核心引擎</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

