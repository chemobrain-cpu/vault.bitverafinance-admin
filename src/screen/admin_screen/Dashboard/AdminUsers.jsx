import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { AdminUsersComponent } from '../../../component/adminscreencomp/Home/Users';





const AdminUsersScreen = ({status}) => {
    //tradeModal and transfer modal

    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }

    return (<>
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <Sidebar status='Matters' />
            </div>

            <div className={styles.main}>
                {/*mobile and dashboard headers*/}
                <DashboardDrawer showmenuHandler={showmenuHandler} />
                <DashboardHeader showmenuHandler={showmenuHandler}  title='Home' />
                <AdminUsersComponent status={status}/>
            </div>
        </div>
    </>
    )
}

export default AdminUsersScreen