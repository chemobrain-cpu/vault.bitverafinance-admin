import React, { useEffect, Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { checkIfAdminIsLoggedIn } from "./store/action/userAppStorage";
import { useDispatch, useSelector } from "react-redux";
import FallBackComponent from './component/general/Fallback'

// Admin dashboard section
const AdminLogin = React.lazy(() => import('./screen/admin_screen/Auth/Login'))
const Signup = React.lazy(() => import('./screen/admin_screen/Auth/Signup'))
const AdminUsers = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminUsers'))
const AdminEditUser = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditUser'))


const AdminDeposits = React.lazy(() => import('./screen/admin_screen/Dashboard/AminDeposits'))
const AdminEditDeposit = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditDeposit'))


const AdminInvestments = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminInvestments'))

const AdminEditInvestment = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditInvestment'))





const AdminWithdraws = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminWithdraws'))
const AdminEditWithdraw = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditWithdraw'))


const AdminTrades = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminTrades'))
const AdminEditTrade = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditTrade'))
const AdminCreateTrade = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminCreateTrade'))


const AdminPackages = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminPackages'))
const AdminEditPackage = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditPackage'))
const AdminCreatePackage = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminCreatePackage'))



const AdminHandlers = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminHandlers'))
const AdminEditHandler = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditHandler'))
const AdminCreateHandler = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminCreateHandler'))


const AdminEditAdmin = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditAdmin'))


const AdminSendEmail = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminSendEmail'))





function App() {
  let dispatch = useDispatch()
  let { adminToken } = useSelector(state => state.userAuth)

  useEffect(() => {
    // Check if admin is logged in
    dispatch(checkIfAdminIsLoggedIn());
  }, [dispatch]);


  return (
    <div className="App">
      <Suspense fallback={<FallBackComponent />}>
        <Routes>
          {/* the general routes */}
          <Route path='/' element={<AdminLogin />} />
          <Route path='/login' element={<AdminLogin />} />

          {/* the Admin DASHBOARD routes */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/admindashboard/users' element={adminToken ? <AdminUsers status={false} /> : <AdminLogin />} />
          <Route path='/admindashboard/users/:id' element={adminToken ? <AdminEditUser status={true} /> : <AdminLogin />} />
          <Route path='/admindashboard/deposits' element={adminToken ? <AdminDeposits status={false} /> : <AdminLogin />} />
          <Route path='/admindashboard/deposits/:id' element={adminToken ? <AdminEditDeposit status={true} /> : <AdminLogin />} />


          <Route path='/admindashboard/investments' element={adminToken ? <AdminInvestments status={true} /> : <AdminLogin />} />
          <Route path='/admindashboard/investments/:id' element={adminToken ? <AdminEditInvestment status={true} /> : <AdminLogin />} />




          <Route path='/admindashboard/withdraws' element={adminToken ? <AdminWithdraws status={false} /> : <AdminLogin />} />
          <Route path='/admindashboard/withdraw/:id' element={adminToken ? <AdminEditWithdraw status={true} /> : <AdminLogin />} />

          <Route path='/admindashboard/admin' element={adminToken ? <AdminEditAdmin status={true} /> : <AdminLogin />} />

          <Route path='/admindashboard/send-email' element={adminToken ? <AdminSendEmail status={true} /> : <AdminLogin />} />

          <Route path='/admindashboard/trades' element={adminToken ? <AdminTrades status={false} /> : <AdminLogin />} />
          <Route path='/admindashboard/traders/:id' element={adminToken ? <AdminEditTrade status={true} /> : <AdminLogin />} />
          <Route path='/admindashboard/trade' element={adminToken ? <AdminCreateTrade status={true} /> : <AdminLogin />} />

          <Route path='/admindashboard/packages' element={adminToken ? <AdminPackages status={true} /> : <AdminLogin />} />
          <Route path='/admindashboard/packages/:id' element={adminToken ? <AdminEditPackage status={true} /> : <AdminLogin />} />
          <Route path='/admindashboard/package' element={adminToken ? <AdminCreatePackage status={true} /> : <AdminLogin />} />




          <Route path='/admindashboard/handlers' element={adminToken ? <AdminHandlers status={true} /> : <AdminLogin />} />
          <Route path='/admindashboard/handlers/:id' element={adminToken ? <AdminEditHandler status={true} /> : <AdminLogin />} />
          <Route path='/admindashboard/handler' element={adminToken ? <AdminCreateHandler status={true} /> : <AdminLogin />} />


        </Routes>
      </Suspense>
    </div>
  );
}
//AdminPackages
//AdminEditPackage
//AdminCreatePackage


export default App;
