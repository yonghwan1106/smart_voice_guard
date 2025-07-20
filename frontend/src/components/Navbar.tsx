import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Chip,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

interface NavbarProps {
  onMenuClick?: () => void;
}

interface Notification {
  id: number;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [notificationAnchor, setNotificationAnchor] = useState<HTMLButtonElement | null>(null);
  
  // 샘플 알림 데이터
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'warning',
      title: '의심스러운 통화 탐지',
      message: '금융기관 사칭 패턴이 감지되었습니다.',
      time: '2분 전',
      read: false
    },
    {
      id: 2,
      type: 'error',
      title: '고위험 통화 차단',
      message: '위험도 9.2점 - 자동 차단되었습니다.',
      time: '15분 전',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: '시스템 업데이트',
      message: '새로운 사기 패턴 DB가 업데이트되었습니다.',
      time: '1시간 전',
      read: false
    },
    {
      id: 4,
      type: 'success',
      title: '일일 분석 완료',
      message: '오늘 총 47건의 통화가 분석되었습니다.',
      time: '3시간 전',
      read: true
    },
    {
      id: 5,
      type: 'info',
      title: '키워드 DB 동기화',
      message: '새로운 키워드 12개가 추가되었습니다.',
      time: '5시간 전',
      read: true
    }
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleNotificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNotificationAnchor(event.currentTarget);
  };
  
  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <WarningIcon sx={{ color: '#ff9800' }} />;
      case 'error': return <ErrorIcon sx={{ color: '#f44336' }} />;
      case 'success': return <CheckIcon sx={{ color: '#4caf50' }} />;
      case 'info': default: return <InfoIcon sx={{ color: '#2196f3' }} />;
    }
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#1976d2',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <SecurityIcon sx={{ mr: 2 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            Smart Voice Guard
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            제11회 과학치안 아이디어 공모전
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label="시스템 정상"
            color="success"
            size="small"
            sx={{ color: 'white', backgroundColor: '#4caf50' }}
          />
          
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>
      
      {/* 알림 Popover */}
      <Popover
        open={Boolean(notificationAnchor)}
        anchorEl={notificationAnchor}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper sx={{ width: 360, maxHeight: 400, overflow: 'auto' }}>
          <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
            <Typography variant="h6">
              알림 ({unreadCount}개의 새 알림)
            </Typography>
          </Box>
          <List sx={{ p: 0 }}>
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem 
                  sx={{ 
                    backgroundColor: notification.read ? 'transparent' : '#f3f4f6',
                    '&:hover': { backgroundColor: '#f5f5f5' }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {getNotificationIcon(notification.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: notification.read ? 'normal' : 'bold',
                          color: notification.read ? 'text.secondary' : 'text.primary'
                        }}
                      >
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                          {notification.time}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ color: 'primary.main', cursor: 'pointer' }}
              onClick={handleNotificationClose}
            >
              모든 알림 보기
            </Typography>
          </Box>
        </Paper>
      </Popover>
    </AppBar>
  );
};

export default Navbar;