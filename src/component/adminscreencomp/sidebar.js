import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './sidebar.module.css';
import { useSelector } from 'react-redux';

const Sidebar = ({ status }) => {
  const navigate = useNavigate();
  const { color } = useSelector(state => state.userAuth);

  const menuBackgroundColor = color.fadeColor ? 'rgba(0,0,255,0.1)' : '#4f46e5';
  const menuTextColor = color.fadeColor ? 'blue' : '#fff';

  const linkData = [
    { icon: 'list', title: 'users', link: '/admindashboard/users' },
    { icon: 'settings', title: 'setting', link: '/admindashboard/admin' },
    { icon: 'money', title: 'deposits', link: '/admindashboard/deposits' },
    { icon: 'explore', title: 'trades', link: '/admindashboard/trades' },
    { icon: 'explore', title: 'withdraws', link: '/admindashboard/withdraws' },

    { icon: 'storage', title: 'packages', link: '/admindashboard/packages' },

    { icon: 'explore', title: 'investments', link: '/admindashboard/investments' },
    { icon: 'explore', title: 'send-email', link: '/admindashboard/send-email'},
  ];



  const navigateHandler = (item) => {
    navigate(item.link);
  };

  return (
    <div
      className={styles.sidebar}
      style={{
        backgroundColor: color.background,
        width: '220px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px 14px',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Top section */}
      <div>
        <div className={styles.topSection}>
        <h2 style={{color:'#fff'}}>
            SWN
          </h2>
        </div>

        <ul className={styles.menuList}>
          {linkData.map((item) => (
            <li
              key={item.title}
              className={styles.menuItem}
              onClick={() => navigateHandler(item)}
              style={{
                backgroundColor: status === item.title ? menuBackgroundColor : 'transparent',
                color: status === item.title ? menuTextColor : color.normalText,
              }}
            >
              <span className="material-icons" style={{ fontSize: '20px' }}>
                {item.icon}
              </span>
              <span className={styles.menuText}>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <div className={styles.endSection}>
        <div
          onClick={() => navigate('/login')}
          className={styles.logout}
        >
          <span className="material-icons">logout</span>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

