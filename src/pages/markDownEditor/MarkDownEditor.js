import React, { useState, useRef, useEffect } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { ToolSelector } from '../../components/navigationItems'; // 引入工具切换组件

import ReactMarkdown from 'react-markdown';
import './MarkDownEditor.css';
import remarkGfm from 'remark-gfm'; // 引入插件，支持表格、代码块语法
import rehypeHighlight from 'rehype-highlight'; // 引入 rehype-highlight
import 'highlight.js/styles/github.css'; // 引入 highlight.js 样式
import CryptoJS from 'crypto-js'; // 引入 CryptoJS 计算 MD5
import { Button, Dropdown, Space, Menu, Tooltip } from 'antd';
import { DownOutlined, BoldOutlined, ItalicOutlined, LinkOutlined, TableOutlined, AlignLeftOutlined, CodeOutlined, ExportOutlined } from '@ant-design/icons';


// 全局变量用于存储光标位置
let globalStartPos = 0;
let globalEndPos = 0;

const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState("");
  const editorRef = useRef(null);

  // 定义 current 状态，保存当前选中的菜单项
  const [current, setCurrent] = useState('markdown');

  const { setContainer } = useCodeMirror({
    container: editorRef.current,
    value: markdownValue,
    extensions: [markdown(), oneDark],
    onChange: (value) => {
      setMarkdownValue(value);
    },
    height: 'auto', // 避免布局被撑开
    lineWrapping: true, // 确保长行内容自动换行
  });


  useEffect(() => {
    const editorElement = editorRef.current;

    if (editorElement) {
      // 监听粘贴事件
      editorElement.addEventListener('paste', handlePaste);
    }

    return () => {
      if (editorElement) {
        editorElement.removeEventListener('paste', handlePaste);
      }
    };
  }, []);

  const handlePaste = (event) => {
    const items = (event.clipboardData || window.clipboardData).items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        calculateMd5AndUpload(file); // 计算MD5并上传图片
      }
    }
  };
  // 计算图片的 MD5 值并上传图片
  const calculateMd5AndUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const wordArray = CryptoJS.lib.WordArray.create(reader.result);
      const md5 = CryptoJS.MD5(wordArray).toString();
      console.log(md5)
      uploadImage(file, md5); // 上传图片并附加MD5值
    };
    reader.readAsArrayBuffer(file);
  };

  const uploadImage = async (file, md5) => {
    // 模拟上传图片的函数
    const formData = new FormData();
    formData.append('file', file);
    formData.append('md5', md5); // 将计算的 MD5 值添加到表单中

    try {
      // 上传图片到服务器，获取图片URL
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const imageUrl = await response.text();

      // 将图片 URL 插入到 Markdown 内容中
      insertImageUrl(imageUrl);
    } catch (error) {
      console.error('图片上传失败', error);
    }
  };

  const insertImageUrl = (url) => {
    setMarkdownValue((prevMarkdownValue) => {
      // 使用回调函数获取最新的 markdownValue，保证不会覆盖之前的内容
      return `${prevMarkdownValue}\n\n![粘贴的图片](${url})`;
    });
  };
  // 在光标处插入内容
  const handleInsert = (content) => {
    setMarkdownValue((prevMarkdownValue) => {
      // 使用回调函数获取最新的 markdownValue，保证不会覆盖之前的内容
      return `${prevMarkdownValue}${content}`;
    });
  };


  // 导出功能
  const handleExport = (format) => {
    if (format === 'md') {
      const blob = new Blob([markdownValue], { type: 'text/markdown;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'document.md';
      link.click();
    }
    // TODO: 添加导出为 PDF 和 DOC 的功能
  };

  // 导出按钮的下拉选项
  const exportMenu = (
    <Menu onClick={({ key }) => handleExport(key)}>
      <Menu.Item key="md">导出为 Markdown</Menu.Item>
      <Menu.Item key="pdf">导出为 PDF</Menu.Item>
      <Menu.Item key="doc">导出为 Word (DOC)</Menu.Item>
    </Menu>
  );



  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div className="toolbar" style={{ display: 'flex', padding: '10px', borderBottom: '1px solid #ddd', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, backgroundColor: '#fff' }}>
        {/* 下拉框选择工具 */}
        <ToolSelector /> {/* 使用 ToolSelector 进行工具切换 */}

         {/* 工具栏，位于下拉框的右侧 */}
         <div style={{ marginLeft: '20px' }}> {/* 工具栏与下拉框之间留一些间距 */}
          <Space>
            {/* 使用 Tooltip 和 Ant Design 图标 */}

            <Tooltip title="斜体">
              <Button type="text" icon={<ItalicOutlined />} onClick={() => handleInsert('*斜体*')} />
            </Tooltip>
            <Tooltip title="加粗">
              <Button type="text" icon={<BoldOutlined />} onClick={() => handleInsert('**加粗**')} />
            </Tooltip>
            <Tooltip title="表格">
              <Button type="text" icon={<TableOutlined />} onClick={() => handleInsert('| 表头1 | 表头2 |\n| --- | --- |\n| 内容1 | 内容2 |')} />
            </Tooltip>
            <Tooltip title="引用">
              <Button type="text" icon={<AlignLeftOutlined />} onClick={() => handleInsert('> 引用')} />
            </Tooltip>
            <Tooltip title="代码块">
              <Button type="text" icon={<CodeOutlined />} onClick={() => handleInsert('```\n代码块\n```')} />
            </Tooltip>
            <Tooltip title="链接">
              <Button type="text" icon={<LinkOutlined />} onClick={() => handleInsert('[链接描述](https://example.com)')} />
            </Tooltip>
            <Tooltip title="导出">
              <Dropdown overlay={exportMenu}>
                <Button type="text" icon={<ExportOutlined />} />
              </Dropdown>
            </Tooltip>
          </Space>
        </div>
      </div>

      {/* 主内容区 */}
      <div style={{ display: 'flex', flex: 1, marginTop: '50px' }}> {/* 导航栏高度为64px */}
        <div style={{ width: '50%' }}>
          <div ref={editorRef} style={{ height: '100%', overflow: 'auto' }}></div>
        </div>
        <div style={{ width: '50%', padding: '10px', borderLeft: '1px solid #ddd' }}>
          <div className="markdown-preview">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]} // 启用 rehype-highlight
            >
              {markdownValue}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};



export default MarkdownEditor;
