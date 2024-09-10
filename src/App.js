import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import MarkdownEditor from './pages/markDownEditor/MarkDownEditor';
import MindMapEditor from './pages/mindMapEditor/MindMapEditor';
import DrawingTool from './pages/drawingTool/drawingTool';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/markdown-editor" element={<MarkdownEditor />} />
        <Route path="/mindmap-editor" element={<MindMapEditor />} />
        <Route path="/drawing-tool" element={<DrawingTool />} />
      </Routes>
    </Router>
  );
}

export default App;

