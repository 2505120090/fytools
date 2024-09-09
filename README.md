# 暂定项目目录结构如下

fyTools/
│
├── public/                  # 静态资源文件，如 favicon.ico, index.html 等
│
├── src/
│   ├── assets/              # 静态资源：图片、图标等
│   ├── components/          # 可复用的组件库
│   │   ├── Header/          # 顶部导航栏组件
│   │   ├── Footer/          # 页脚组件
│   │   ├── Sidebar/         # 侧边导航组件
│   │   └── Button/          # 自定义按钮组件
│   │
│   ├── pages/               # 各功能页面模块
│   │   ├── MindMapEditor/   # 在线脑图编辑模块
│   │   │   ├── MindMap.js
│   │   │   └── MindMap.css
│   │   ├── MarkdownEditor/  # Markdown 编辑模块
│   │   │   ├── MarkdownEditor.js
│   │   │   └── MarkdownEditor.css
│   │   ├── BaseConverter/   # 进制转换模块
│   │   │   ├── BaseConverter.js
│   │   │   └── BaseConverter.css
│   │   ├── Encryption/      # 加解密工具模块
│   │   │   ├── Encryption.js
│   │   │   └── Encryption.css
│   │   └── Home/            # 项目首页
│   │       ├── Home.js
│   │       └── Home.css
│   │
│   ├── services/            # API 请求服务
│   │   └── encryptionService.js # 加解密相关的 API 请求
│   │
│   ├── utils/               # 工具函数库
│   │   ├── baseConversion.js   # 进制转换工具函数
│   │   ├── encryption.js       # 加解密算法函数
│   │   └── markdownParser.js   # Markdown 解析工具
│   │
│   ├── App.js               # 主应用入口
│   ├── index.js             # React 应用启动文件
│   └── App.css              # 全局样式
│
├── package.json             # 项目依赖和配置信息
├── .env                     # 环境变量
└── README.md                # 项目说明
