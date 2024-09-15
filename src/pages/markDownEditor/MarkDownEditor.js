import React, { useState, useRef, useEffect } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { Link } from 'react-router-dom'; // 引入 Link 用于页面跳转
import { items } from '../../components/navigationItems'; // 导入公用的 items
import { Menu } from 'antd'; // 确保导入了 Menu 组件

import ReactMarkdown from 'react-markdown';
import './MarkDownEditor.css';
import remarkGfm from 'remark-gfm'; // 引入插件，支持表格、代码块语法
import rehypeHighlight from 'rehype-highlight'; // 引入 rehype-highlight
import 'highlight.js/styles/github.css'; // 引入 highlight.js 样式

const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState("# Hello Markdown");
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

  // useEffect(() => {
  //   if (editorRef.current) {
  //     const view = setContainer(editorRef.current);
  //     // 将光标移动到开头
  //     if (view) {
  //       view.dispatch({
  //         selection: { anchor: 0 }
  //       });
  //     }
  //   }
  // }, [editorRef.current, setContainer]);

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
       {/* 添加头部导航栏 */}
       <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />

      {/* 编辑器和预览区 */}
      <div style={{ display: 'flex', flex: 1 }}> {/* 确保内容下移 */}
        <div style={{ width: '50%'}}>
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
