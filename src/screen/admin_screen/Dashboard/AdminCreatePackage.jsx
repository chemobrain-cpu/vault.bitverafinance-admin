import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { useNavigate} from 'react-router-dom';
import LoadingModal from "../../../component/Modal/LoadingModal";
import { useDispatch } from 'react-redux';
import { createPackage } from '../../../store/action/userAppStorage';
import { Error } from '../../../component/common/Error';
import { AdminPackageCreateComponent } from '../../../component/adminscreencomp/Home/PackageCreate';



const AdminCreatePackage = () => {
    //tradeModal and transfer modal
    let [isLoading, setIsLoading] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const [isAuthError, setIsAuthError] = useState(false);
    const [authInfo, setAuthInfo] = useState("");

    const updateAuthError = () => {
        setIsAuthError(prev => !prev);
        setAuthInfo('')
      }



    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }



    let updateHandler = async (data) => {
        setIsLoading(true)
        let res = await dispatch(createPackage(data))
        console.log(res)

        if (!res.bool) {
            setIsAuthError(true)
            setAuthInfo(res.message)
            setIsLoading(false)
            return
        }

        navigate('/admindashboard/packages')
    }



   

    return (<>
        {isLoading && <LoadingModal />}
        {isAuthError && <Error modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo}  />}
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <Sidebar status='Packages' />
            </div>

            <div className={styles.main}>
                {/*mobile and dashboard headers*/}
                <DashboardDrawer showmenuHandler={showmenuHandler} />
                <DashboardHeader showmenuHandler={showmenuHandler} title='Home' />
                <AdminPackageCreateComponent updateHandler={updateHandler} />

            </div>
            
        </div>
    </>
    )
}

export default AdminCreatePackage