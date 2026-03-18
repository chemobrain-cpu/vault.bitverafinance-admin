import React from 'react';
import styles from './dashboardNav.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardHeader = ({ showmenuHandler, title, openTransferModal, openTradeModal, headerTitle }) => {
    const navigate = useNavigate();
    const { user, color } = useSelector(state => state.userAuth);

    const navigateHandler = (path) => {
        navigate(path);
    };

    return (
        <div
            className={styles.dashboardHeader}
            style={{
                backgroundColor: color.background,
                boxShadow: color.background ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.05)',
                borderBottom: `1px solid ${color.normalText || '#fff'}`,
            }}
        >
            {/* Left Section */}
            <div className={styles.headerLeft}>
                <h1 className={styles.title} style={{ color: color.importantText }}>
                    {headerTitle || 'SWN'}
                </h1>
            </div>

            {/* Right Section */}
            <div className={styles.headerRight}>
                <div className={styles.headerRightInner}>

                    {/* Menu Button */}
                    <div className={styles.menu}>
                        <span
                            className="material-icons"
                            onClick={showmenuHandler}
                            style={{
                                color: color.importantText || 'rgb(0,0,0)',
                                backgroundColor: color.fadeColor || 'transparent',
                                fontSize: '1.8rem',
                                padding: '8px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease',
                            }}
                        >
                            menu
                        </span>
                    </div>

                   
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
