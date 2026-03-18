import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadingModal from "../../../component/Modal/LoadingModal";
import { useDispatch } from 'react-redux';
import { AdminDepositsComponent } from '../../../component/adminscreencomp/Home/Deposits';
import { Error } from '../../../component/common/Error';




const AdminDepositsScreen = ({ status }) => {
    //tradeModal and transfer modal
    let [isOpenTradeModal, setIsOpenTradeModal] = useState(false)
    let [isOpenTransferModal, setIsOpenTransferModal] = useState(false)
    let { color } = useSelector(state => state.userAuth)
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)


    let dispatch = useDispatch()
    let navigate = useNavigate()

    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }




    let closeModal = () => {
        setIsOpenTransferModal(false)
        setIsOpenTradeModal(false)
    }

    if (isError) {
        return <Error />
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
                <AdminDepositsComponent status={status}/>
            </div>
           
        </div>

    </>
    )
}

export default AdminDepositsScreen