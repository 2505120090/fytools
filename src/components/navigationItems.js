// src/navigationItems.js
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

// 工具选择器组件：定义工具切换逻辑
export const ToolSelector = () => {
  const navigate = useNavigate(); // 使用 React Router 的导航功能

  // 处理工具切换逻辑
  const handleToolChange = (value) => {
    if (value === 'markdown') {
      navigate('/markdown-editor');
    } else if (value === 'mindmap') {
      navigate('/mindmap-editor');
    } else if (value === 'drawing') {
      navigate('/drawing-tool');
    } else if (value === 'json') {
      navigate('/json-formatter'); // JSON 格式化页面
    } else if (value === 'encryption') {
      navigate('/encryption-tool'); // 加密解密页面
    }
  };

  return (
    <Select defaultValue="markdown" style={{ width: 200 }} onChange={handleToolChange}>
      <Option value="markdown">Markdown 编辑器</Option>
      <Option value="mindmap">脑图编辑器</Option>
      <Option value="drawing">在线画图</Option>
      <Option value="json">JSON 格式化工具</Option>
      <Option value="encryption">加密/解密工具</Option>
    </Select>
  );
};
