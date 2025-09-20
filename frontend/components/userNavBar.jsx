import React, { useState,useContext } from 'react';
import { BarChart3,  Users } from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import IsSession from '../context.js';

const SimpleSidebar = () => {
  const {isSession}=useContext(IsSession)
  const [activeItem, setActiveItem] = useState('dashboard');
  const navigateTo = useNavigate();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
    },
    {
      id: isSession?'sessions':"sessions/improve",
      label: 'Sessions',
      icon: Users,
    }
  ];

  const sidebarStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    width: '280px',
    background: 'linear-gradient(135deg, rgba(255, 20, 147, 0.95) 0%, rgba(138, 43, 226, 0.95) 50%, rgba(72, 61, 139, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.2)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
  };

  const logoSectionStyle = {
    padding: '2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const logoIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: 'linear-gradient(45deg, #00f5ff, #ff00ff, #ffaa00)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
  };

  const logoTextStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: 'white',
  };

  const navSectionStyle = {
    flex: 1,
    padding: '2rem 1.5rem',
  };

  const getNavItemStyle = (isActive) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 16px',
    marginBottom: '12px',
    borderRadius: '16px',
    border: 'none',
    background: isActive 
      ? 'rgba(255, 255, 255, 0.3)'
      : 'transparent',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '16px',
    fontWeight: '500',
  });

  const getIconContainerStyle = (isActive) => ({
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: isActive 
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  });

  const userSectionStyle = {
    padding: '1.5rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  };

  return (
    <div style={sidebarStyle}>
      {/* Logo Section */}
      <div style={logoSectionStyle}>
        <div style={logoStyle}>
          <div style={logoIconStyle}>T</div>
          <div>
            <div style={logoTextStyle}>Table Improver</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>Professional Suite</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={navSectionStyle}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <div
              key={item.id}
              style={getNavItemStyle(isActive)}
              onClick={() => {
                setActiveItem(item.id);
              navigateTo( `/app/${item.id}`);
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              <div style={getIconContainerStyle(isActive)}>
                <Icon size={20} color="white" />
              </div>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* User Profile */}
      <div style={userSectionStyle}>
        <UserButton />
      </div>
    </div>
  );
};

export default SimpleSidebar;