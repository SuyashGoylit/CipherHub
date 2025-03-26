'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from '@mui/material';
import {
  Home as HomeIcon,
  History as HistoryIcon,
  Security as SecurityIcon,
  Lock as LockIcon,
  Functions as FunctionsIcon,
  ExpandLess,
  ExpandMore,
  Key as KeyIcon,
  LockOpen as LockOpenIcon,
  Numbers as NumbersIcon
} from '@mui/icons-material';

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    {
      name: 'Classical Ciphers',
      path: '/classicalCiphers',
      icon: <HistoryIcon />,
      children: [
        { name: 'Caesar Cipher', path: '/classicalCiphers/caesar', icon: <KeyIcon /> },
        { name: 'Vigenère Cipher', path: '/classicalCiphers/vigenere', icon: <KeyIcon /> },
        { name: 'Playfair Cipher', path: '/classicalCiphers/playfair', icon: <KeyIcon /> },
        { name: 'Rail Fence Cipher', path: '/classicalCiphers/railfence', icon: <KeyIcon /> },
        { name: 'Columnar Cipher', path: '/classicalCiphers/columnar', icon: <KeyIcon /> },
      ]
    },
    {
      name: 'AES',
      path: '/aes',
      icon: <SecurityIcon />,
      children: [
        { name: 'Encrypt', path: '/aes/encrypt', icon: <LockIcon /> },
        { name: 'Decrypt', path: '/aes/decrypt', icon: <LockOpenIcon /> },
      ]
    },
    {
      name: 'RSA',
      path: '/rsa',
      icon: <SecurityIcon />,
      children: [
        { name: 'Encrypt', path: '/rsa/encrypt', icon: <LockIcon /> },
        { name: 'Decrypt', path: '/rsa/decrypt', icon: <LockOpenIcon /> },
      ]
    },
    {
      name: 'SHA',
      path: '/sha',
      icon: <FunctionsIcon />,
      children: [
        { name: 'SHA-1', path: '/sha/sha1', icon: <NumbersIcon /> },
        { name: 'SHA-2', path: '/sha/sha2', icon: <NumbersIcon /> },
        { name: 'SHA-3', path: '/sha/sha3', icon: <NumbersIcon /> },
      ]
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          backgroundColor: '#111827',
          borderRight: '1px solid #1f2937',
          color: '#fff',
          marginTop: '64px',
          height: 'calc(100vh - 64px - 64px)',
          position: 'fixed',
          overflowY: 'hidden',
          '& .MuiListItemIcon-root': {
            color: '#9ca3af',
          },
          '& .MuiListItemText-primary': {
            color: '#f3f4f6',
          },
          '& .MuiListItemButton-root:hover': {
            backgroundColor: '#1f2937',
          },
          '& .MuiListItemButton-root.Mui-selected': {
            backgroundColor: '#374151',
            '&:hover': {
              backgroundColor: '#374151',
            },
          },
        },
      }}
    >
      <Box 
        sx={{ 
          overflow: 'auto',
          height: '100%',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#111827',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#374151',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#4B5563',
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <Box key={item.path}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (item.children) {
                      toggleSection(item.name);
                    }
                  }}
                  component={Link}
                  href={item.path}
                  selected={pathname === item.path}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  {item.children && (
                    expandedSections.includes(item.name) ? <ExpandLess /> : <ExpandMore />
                  )}
                </ListItemButton>
              </ListItem>
              {item.children && (
                <Collapse in={expandedSections.includes(item.name)} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.path}
                        component={Link}
                        href={child.path}
                        selected={pathname === child.path}
                        sx={{
                          pl: 4,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                          {child.icon}
                        </ListItemIcon>
                        <ListItemText primary={child.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Box>
    </Drawer>
  );
} 