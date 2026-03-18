import React from 'react';
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import styles from './Loader.module.css';
import { useDispatch,useSelector } from "react-redux";



export const Loader = () => {
  let { color} = useSelector(state => state.userAuth)

  return (
    <div className={styles.loader} style={{backgroundColor:color.background}}>

      <Spinner size={30} color={' #4f46e5'} speed={.5} />

    </div >


  )
}
