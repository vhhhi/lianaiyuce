# 首页开发文档

## 页面结构
首页作为用户进入应用的第一个页面，主要包含以下几个部分：

1. 产品介绍
   - 产品价值主张
     ```typescript
     // components/ValueProposition/index.tsx
     const ValueProposition: React.FC = () => {
       return (
         <section className={styles.valueSection}>
           <h1>找到您的完美伴侣</h1>
           <p>基于AI的智能匹配系统，帮助您找到真正的灵魂伴侣</p>
           <Button type="primary" size="large">立即开始</Button>
         </section>
       );
     };
     ```
   
   - 核心功能展示
     * 使用Grid布局展示功能卡片
     * 添加hover效果增强交互
     * 配置响应式布局适配各种屏幕
     ```typescript
     // components/FeatureShowcase/index.tsx
     const FeatureShowcase: React.FC = () => {
       const features = [
         {
           title: '智能测评',
           description: '多维度个性测试',
           icon: <TestIcon />
         },
         // ...更多功能
       ];
     
       return (
         <Row gutter={[24, 24]}>
           {features.map(feature => (
             <Col xs={24} sm={12} md={8} key={feature.title}>
               <FeatureCard {...feature} />
             </Col>
           ))}
         </Row>
       );
     };
     ```
   
   - 产品特色亮点
     * 使用动画效果突出显示
     * 配合图标增强视觉效果
     * 添加交互反馈

2. 功能导航
   - 测评入口
     ```typescript
     // components/Navigation/TestingEntry.tsx
     const TestingEntry: React.FC = () => {
       const navigate = useNavigate();
     
       const entries = [
         {
           title: '个性测试',
           path: '/test/personality',
           icon: <PersonalityIcon />
         },
         {
           title: '匹配分析',
           path: '/test/matching',
           icon: <MatchingIcon />
         },
         // ...更多入口
       ];
     
       return (
         <div className={styles.entryGrid}>
           {entries.map(entry => (
             <Card
               key={entry.path}
               onClick={() => navigate(entry.path)}
               className={styles.entryCard}
             >
               {entry.icon}
               <h3>{entry.title}</h3>
             </Card>
           ))}
         </div>
       );
     };
     ```
   
   - 个人中心入口
     * 用户信息展示
     * 快捷功能入口
     * 消息通知集成
   
   - 社区入口
     * 最新话题预览
     * 热门讨论展示
     * 活动公告通知
   
   - 会员服务入口
     * 会员权益展示
     * 购买套餐入口
     * 专属服务通道

3. 成功案例展示
   ```typescript
   // components/SuccessStories/index.tsx
   const SuccessStories: React.FC = () => {
     const [activeIndex, setActiveIndex] = useState(0);
     
     const stories = [
       {
         id: 1,
         title: '找到真爱',
         content: '通过Love Match的匹配...',
         image: '/images/story1.jpg',
         rating: 5
       },
       // ...更多案例
     ];
     
     return (
       <Carousel
         autoplay
         effect="fade"
         afterChange={setActiveIndex}
       >
         {stories.map(story => (
           <StoryCard key={story.id} {...story} />
         ))}
       </Carousel>
     );
   };
   ```

4. 专家团队介绍
   ```typescript
   // components/ExpertTeam/index.tsx
   const ExpertTeam: React.FC = () => {
     const experts = [
       {
         id: 1,
         name: '张医生',
         title: '心理咨询师',
         avatar: '/images/expert1.jpg',
         description: '从业20年...'
       },
       // ...更多专家
     ];
     
     return (
       <section className={styles.expertSection}>
         <h2>专业团队</h2>
         <Row gutter={[24, 24]}>
           {experts.map(expert => (
             <Col xs={24} sm={12} md={8} lg={6} key={expert.id}>
               <ExpertCard {...expert} />
             </Col>
           ))}
         </Row>
       </section>
     );
   };
   ```

## 开发计划
1. 第一阶段：环境搭建（1周）
   - 配置开发环境
     ```bash
     # 安装依赖
     npm install
     
     # 配置ESLint
     npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
     
     # 配置Prettier
     npm install prettier --save-dev
     ```
   
   - 创建基础目录结构
     ```
     src/
       ├── pages/
       │   └── home/
       │       ├── components/
       │       ├── assets/
       │       ├── hooks/
       │       ├── utils/
       │       └── types/
       ├── shared/
       │   ├── components/
       │   └── utils/
       └── styles/
     ```
   
   - 设置开发规范
     * 编写.editorconfig
     * 配置Git Hooks
     * 设置提交规范

2. 第二阶段：基础布局（2周）
   - 创建页面框架
     ```typescript
     // pages/home/index.tsx
     const HomePage: React.FC = () => {
       return (
         <Layout>
           <Header>
             <Navbar />
           </Header>
           <Content>
             <ValueProposition />
             <FeatureShowcase />
             <SuccessStories />
             <ExpertTeam />
           </Content>
           <Footer>
             <FooterContent />
           </Footer>
         </Layout>
       );
     };
     ```
   
   - 实现响应式布局
     ```css
     /* styles/breakpoints.css */
     @media (max-width: 576px) {
       .container {
         padding: 0 16px;
       }
     }
     
     @media (min-width: 577px) and (max-width: 768px) {
       .container {
         padding: 0 24px;
       }
     }
     ```

3. 第三阶段：内容开发（2周）
   - 组件开发计划
     * 第1-3天：导航组件
     * 第4-6天：产品介绍
     * 第7-9天：功能展示
     * 第10-12天：案例展示
   
   - 内容填充规范
     * 文案审核流程
     * 图片规格标准
     * 动画效果规范

4. 第四阶段：功能实现（2周）
   - 交互功能
     ```typescript
     // hooks/useScrollAnimation.ts
     export const useScrollAnimation = () => {
       const [visible, setVisible] = useState(false);
       const elementRef = useRef<HTMLDivElement>(null);
     
       useEffect(() => {
         const observer = new IntersectionObserver(
           ([entry]) => {
             setVisible(entry.isIntersecting);
           },
           { threshold: 0.1 }
         );
     
         if (elementRef.current) {
           observer.observe(elementRef.current);
         }
     
         return () => observer.disconnect();
       }, []);
     
       return { elementRef, visible };
     };
     ```
   
   - 性能优化
     * 图片懒加载
     * 组件懒加载
     * 路由预加载

## 注意事项
1. 代码质量
   - 代码审查清单
     * 类型定义完整性
     * 组件解耦程度
     * 性能隐患检查
     * 错误处理完整性
   
   - 测试覆盖
     ```typescript
     // __tests__/HomePage.test.tsx
     describe('HomePage', () => {
       it('should render all sections', () => {
         const { getByTestId } = render(<HomePage />);
         
         expect(getByTestId('value-proposition')).toBeInTheDocument();
         expect(getByTestId('feature-showcase')).toBeInTheDocument();
         expect(getByTestId('success-stories')).toBeInTheDocument();
         expect(getByTestId('expert-team')).toBeInTheDocument();
       });
     });
     ```

2. 版本控制
   - Git提交规范
     ```bash
     # 提交信息格式
     type(scope): subject
     
     # 例如
     feat(home): add expert team section
     fix(nav): correct responsive layout
     ```
   
   - 分支管理
     * main: 主分支
     * develop: 开发分支
     * feature/*: 功能分支
     * hotfix/*: 紧急修复

3. 文档维护
   - 组件文档
     ```typescript
     /**
      * 专家卡片组件
      * @param {ExpertCardProps} props - 组件属性
      * @param {string} props.name - 专家姓名
      * @param {string} props.title - 专家职称
      * @param {string} props.avatar - 头像地址
      * @param {string} props.description - 专家描述
      */
     ```
   
   - API文档
     * 接口说明
     * 参数类型
     * 返回值说明
     * 错误处理

4. 团队协作
   - 代码评审流程
     1. 提交Pull Request
     2. 自动化检查
     3. 人工代码审查
     4. 处理反馈意见
   
   - 开发流程
     1. 任务分配
     2. 开发实现
     3. 代码审查
     4. 测试验证
     5. 合并发布
