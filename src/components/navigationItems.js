// src/navigationItems.js
import { AppstoreOutlined, FileTextOutlined, NodeIndexOutlined, KeyOutlined, CalculatorOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const items = [
  {
    label: <Link to="/markdown-editor">Markdown 编辑器</Link>,
    key: 'markdown',
    icon: <FileTextOutlined />,
  },
  {
    label: <Link to="/mindmap-editor">脑图编辑器</Link>,
    key: 'mindmap',
    icon: <NodeIndexOutlined />,
  },
  {
    label: <Link to="/base-conversion">进制转换工具</Link>,
    key: 'base-conversion',
    icon: <CalculatorOutlined />,
  },
  {
    label: <Link to="/encryption-tool">加密/解密工具</Link>,
    key: 'encryption',
    icon: <KeyOutlined />,
  },
];
