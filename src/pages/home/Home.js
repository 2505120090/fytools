import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // 可选：添加样式

const Home = () => {
  return (
    <div className="home-container">
      <h1>在线工具集</h1>
      <div className="tools-list">
        <Link to="/markdown-editor" className="tool-link">
          <button className="tool-button">Markdown 编辑器</button>
        </Link>
        <Link to="/mindmap-editor" className="tool-link">
          <button className="tool-button">脑图编辑器</button>
        </Link>
        <Link to="/drawing-tool" className="tool-link">
          <button className="tool-button">在线画图工具</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
