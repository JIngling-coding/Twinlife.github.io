"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  BookOpen,
  CheckSquare,
  Calendar,
  ArrowRightLeft,
  Trophy,
  BrainIcon,
  ZapIcon,
  Lightbulb,
} from "lucide-react"

export default function CompanyPage() {
  return (
    <div className="h-full overflow-auto pb-8">
      <h2 className="text-xl font-medium mb-4">公司管理</h2>
      <p className="text-muted-foreground mb-6">个人公司理念，用户即公司</p>

      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="departments">部门化管理</TabsTrigger>
          <TabsTrigger value="collaboration">部门协同机制</TabsTrigger>
          <TabsTrigger value="growth">能力成长体系</TabsTrigger>
        </TabsList>

        {/* 部门化管理模块 */}
        <TabsContent value="departments" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 财务部 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">财务部</CardTitle>
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>资金流动与资产配置</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    <span>动态财务看板（收支趋势/资产配置）</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    <span>智能预算管家</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 市场部 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">市场部</CardTitle>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <CardDescription>个人品牌与竞争力</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    <span>社交竞争力评估（人脉指数/职业发展）</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    <span>个人品牌建设工具</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 研发部 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">研发部</CardTitle>
                  <BookOpen className="h-5 w-5 text-purple-500" />
                </div>
                <CardDescription>知识技能与学习系统</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <span>知识技能图谱（学习进度/创新项目）</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    <span>个性化学习系统</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 外交部 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">外交部</CardTitle>
                  <Globe className="h-5 w-5 text-orange-500" />
                </div>
                <CardDescription>人脉关系与社交活动</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                    <span>人脉关系图谱（社交活跃度/跨文化指数）</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                    <span>活动策划助手</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 产品部 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">产品部</CardTitle>
                  <CheckSquare className="h-5 w-5 text-red-500" />
                </div>
                <CardDescription>成果管理与质量优化</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-red-500"></div>
                    <span>成果管理中心（项目进度/作品评分）</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-red-500"></div>
                    <span>质量优化引擎</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 行政部 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">行政部</CardTitle>
                  <Calendar className="h-5 w-5 text-cyan-500" />
                </div>
                <CardDescription>日程管理与资源调度</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                    <span>智能日程管家（任务完成率/时间分配）</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                    <span>资源调度系统</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 部门协同机制 */}
        <TabsContent value="collaboration" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>跨部门数据联动</CardTitle>
              <CardDescription>建立部门间协作与数据共享机制</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <ArrowRightLeft className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">财务-市场</p>
                    <p className="text-sm text-muted-foreground">预算与ROI分析闭环</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ArrowRightLeft className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">市场-研发</p>
                    <p className="text-sm text-muted-foreground">需求与技术转化通道</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ArrowRightLeft className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-medium">研发-产品</p>
                    <p className="text-sm text-muted-foreground">成果应用与用户反馈循环</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ArrowRightLeft className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium">产品-外交</p>
                    <p className="text-sm text-muted-foreground">成果输出与资源获取联动</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ArrowRightLeft className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium">外交-行政</p>
                    <p className="text-sm text-muted-foreground">活动执行与资源协调配合</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ArrowRightLeft className="h-5 w-5 text-cyan-500 mt-0.5" />
                  <div>
                    <p className="font-medium">行政-财务</p>
                    <p className="text-sm text-muted-foreground">成本控制与预算优化协同</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 能力成长体系 */}
        <TabsContent value="growth" className="space-y-4 mt-4">
          {/* CEO能力指数 */}
          <Card>
            <CardHeader>
              <CardTitle>CEO能力指数</CardTitle>
              <CardDescription>全方位能力评估与提升系统</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <BrainIcon className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">决策力</span>
                  </div>
                  <p className="text-sm text-muted-foreground">目标决策准确率分析+情景模拟训练</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <ZapIcon className="h-5 w-5 text-green-500" />
                    <span className="font-medium">执行力</span>
                  </div>
                  <p className="text-sm text-muted-foreground">任务完成度评估+习惯养成系统</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">创新力</span>
                  </div>
                  <p className="text-sm text-muted-foreground">创意产出分析+思维激发工具</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-purple-500" />
                    <span className="font-medium">学习力</span>
                  </div>
                  <p className="text-sm text-muted-foreground">知识增长曲线+个性化学习路径</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-orange-500" />
                    <span className="font-medium">社交力</span>
                  </div>
                  <p className="text-sm text-muted-foreground">关系网络分析+沟通技巧训练</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 成就激励系统 */}
          <Card>
            <CardHeader>
              <CardTitle>成就激励系统</CardTitle>
              <CardDescription>多维度成长激励与奖励机制</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-xs text-white font-bold">D</span>
                    </div>
                    <span className="font-medium">道具卡</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 pl-8">
                    <li>时间加速卡</li>
                    <li>灵感收集器</li>
                    <li>资源倍增器</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                      <span className="text-xs text-white font-bold">S</span>
                    </div>
                    <span className="font-medium">段位晋升</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">从初创CEO到集团主席的成长路径</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">勋章体系</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 pl-8">
                    <li>专业认证</li>
                    <li>里程碑成就</li>
                    <li>特殊贡献奖励</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

