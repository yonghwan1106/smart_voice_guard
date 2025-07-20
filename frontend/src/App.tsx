import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import VoiceAnalysis from './pages/VoiceAnalysis';
import KeywordManagement from './pages/KeywordManagement';
import Statistics from './pages/Statistics';
import About from './pages/About';

const DRAWER_WIDTH = 240;

const App: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box sx={{ 
      display: 'flex',
      overflow: 'hidden', // 전체 앱 오버플로우 방지
      maxWidth: '100vw', // 뷰포트 너비 초과 방지
    }}>
      <Navbar onMenuClick={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerClose} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 2 }, // 모바일 패딩 증가
          pr: { xs: 2, sm: 2 }, // 우측 패딩 명시적 설정
          mt: 8, // 상단 네비게이션 바 높이만큼 여백
          ml: { xs: 0, sm: `${DRAWER_WIDTH}px` }, // 작은 화면에서는 사이드바 숨김
          width: { 
            xs: 'calc(100% - 16px)', // 모바일에서 패딩 고려한 너비
            sm: `calc(100% - ${DRAWER_WIDTH}px)` 
          }, // 반응형 너비
          maxWidth: '100vw', // 뷰포트 너비 초과 방지
          overflow: 'hidden', // 오버플로우 방지
          minHeight: 'calc(100vh - 64px)', // 전체 높이에서 네비게이션 바 높이 제외
          backgroundColor: '#f5f5f5', // 배경색 추가
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/voice-analysis" element={<VoiceAnalysis />} />
          <Route path="/keywords" element={<KeywordManagement />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;