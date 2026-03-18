import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import LoadingModal from "../../../component/Modal/LoadingModal";
import { AdminTradesComponent } from '../../../component/adminscreencomp/Home/Trades';
import { Error } from '../../../component/common/Error';
import { useNavigate } from 'react-router-dom';


const AdminTradesScreen = ({status}) => {
    //tradeModal and transfer modal
    let [isLoading, setIsLoading] = useState(false)
    let [isError,setIsError] = useState(false)
    let navigate = useNavigate()
    
    let handleNavigation = ()=>{
        navigate('/admindashboard/trade')
    }

   

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
                <DashboardHeader showmenuHandler={showmenuHandler}  title='Trades' />
                <AdminTradesComponent status={status}/>
            </div>
           
        </div>
    </>
    )
}

export default AdminTradesScreen