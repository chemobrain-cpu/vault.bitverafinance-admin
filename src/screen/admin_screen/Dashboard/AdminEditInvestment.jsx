import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { useNavigate } from 'react-router-dom';
import LoadingModal from "../../../component/Modal/LoadingModal";
import { useDispatch } from 'react-redux';
import { updateInvestment } from '../../../store/action/userAppStorage';
import { Error } from '../../../component/common/Error';
import { AdminInvestEditComponent } from '../../../component/adminscreencomp/Home/InvestmentEdit';



const AdminEditInvestment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthError, setIsAuthError] = useState(false);
    const [authInfo, setAuthInfo] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateAuthError = () => {
        setIsAuthError(prev => !prev);
        setAuthInfo('');
    };

    const showmenuHandler = () => {
        const drawer = document.querySelector('.drawerCon');
        drawer.classList.toggle('showdrawer');
    };

    const updateHandler = async (data) => {
        setIsLoading(true);
        const res = await dispatch(updateInvestment(data));

        if (!res.bool) {
            setIsAuthError(true);
            setAuthInfo(res.message);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
        navigate('/admindashboard/investments');
    };

    return (
        <>
            {isLoading && <LoadingModal />}
            {isAuthError && (
                <Error
                    modalVisible={isAuthError}
                    updateVisibility={updateAuthError}
                    message={authInfo}
                />
            )}
            <div className={styles.dashboard}>
                <div className={styles.sidebar}>
                    <Sidebar status='Cases' />
                </div>

                <div className={styles.main}>
                    <DashboardDrawer showmenuHandler={showmenuHandler} />
                    <DashboardHeader showmenuHandler={showmenuHandler} title='Home' />
                    <AdminInvestEditComponent updateHandler={updateHandler} />
                </div>
            </div>
        </>
    );
};

export default AdminEditInvestment;