import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import LoadingModal from "../../../component/Modal/LoadingModal";
import { AdminPackagesComponent } from '../../../component/adminscreencomp/Home/Packages';
import { Error } from '../../../component/common/Error';
import { useNavigate } from 'react-router-dom';


const AdminPackagesScreen = ({status}) => {
    //tradeModal and transfer modal
    let [isLoading, setIsLoading] = useState(false)
    let [isError,setIsError] = useState(false)
    let navigate = useNavigate()
    
   
   

    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }


    if(isError){
        return <Error/>
    }


    return (<>
        {isLoading && <LoadingModal />}
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <Sidebar status='Matters' />
            </div>

            <div className={styles.main}>
                {/*mobile and dashboard headers*/}
                <DashboardDrawer showmenuHandler={showmenuHandler} />
                <DashboardHeader showmenuHandler={showmenuHandler}  title='Packages' />
                <AdminPackagesComponent status={status}/>
            </div>
           
        </div>
    </>
    )
}

export default AdminPackagesScreen