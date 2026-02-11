import React from 'react'
import styles from './Drawer.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from './../../store/action/userAppStorage';
import { useSelector } from "react-redux";


let topMenu = [
  {
    icon: 'list',
    title: 'users',
    link: '/admindashboard/users'
  },
  {
    icon: 'settings',
    title: 'settings',
    link: '/admindashboard/admin'
  },
  {
    icon: 'money',
    title: 'deposits',
    link: '/admindashboard/deposits'
  },
  { icon: 'explore', title: 'withdraws', link: '/admindashboard/withdraws' },

  {
    icon: 'explore',
    title: 'trades',
    link: '/admindashboard/trades'
  },
  {
    icon: 'explore',
    title: 'packages',
    link: '/admindashboard/packages'
  },
  {
    icon: 'explore',
    title: 'investments',
    link: '/admindashboard/investments'
  },
  {
    icon: 'explore',
    title: 'send-email',
    link: '/admindashboard/send-email'
  }
]



const DashboardDrawer = ({ showmenuHandler }) => {

  let navigate = useNavigate()
  const dispatch = useDispatch()
  let { color } = useSelector(state => state.userAuth)

  let navigateHandler = async (data) => {
    if (data.title === 'signout') {
      navigate('/')
      await dispatch(logout())

    } else {
      if (data.title == 'bank') {
        window.location.href = "https://bank-admin-8ahj.onrender.com";  // 
        return
      }
      navigate(data.link)
    }
  }






  return (<div className='drawerCon' style={{ backgroundColor: color.background }}>

    <div className={styles.drawer} style={{ backgroundColor: color.background }}>
      <div className={styles.cancel} onClick={showmenuHandler}>

        <span className='material-icons' style={{ color: '#fff' }}>
          close
        </span>
      </div>


      <ul className={styles.drawerMenuCon}>
        {topMenu.map(data => <li className={styles.drawerMenu} onClick={() => navigateHandler(data)} key={data.link} ><span className='material-icons' key={data.title}  >{data.icon}</span>{data.title}</li>)}

      </ul>

      <div className={styles.boxunderline}>
      </div>



      <div className={styles.boxunderline}>
      </div>




    </div>
  </div>)
}

export default DashboardDrawer