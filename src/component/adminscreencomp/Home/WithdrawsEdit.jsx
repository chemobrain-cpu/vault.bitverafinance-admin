import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export const AdminWithrawEditComponent = ({ updateHandler, }) => {
    let [isData, setIsData] = useState(null)
    let { color, withdrawsList } = useSelector(state => state.userAuth)

    let { id } = useParams()


    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value
        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })

    }



    let submitHandler = (e) => {
        e.preventDefault()
        //patch case on 
        console.log(isData)
        updateHandler(isData)

    }

    useEffect(() => {
        let dataObj = withdrawsList.find(data => data._id.toString() === id.toString())

        setIsData(dataObj)

    }, [id])




   
 




    return (<>
        <div
  className={styles.homeScreen}
  style={{
    backgroundColor: color.background,
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  }}
>
  <div
    className={styles.timeline}
    style={{
      backgroundColor: color.background,
      maxWidth: '900px',
      margin: '0 auto',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      padding: '40px',
    }}
  >
    {withdrawsList && isData && (
      <form
        className={styles.editForm}
        onSubmit={submitHandler}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {[
          { label: 'Withdrawer Name', value: isData.user.email },
          { label: 'WithdrawerID', value: isData.withdrawId },
          { label: 'Bitcoin Address', value: isData.bitcoin_address },
          { label: 'Binance Address', value: isData.binance_address },
          { label: 'Zelle', value: isData.zelle_address },
          { label: 'Ethereum Address', value: isData.etherium_address },
          { label: 'Cash App', value: isData.cashapp_address },
          { label: 'Amount', value: isData.amount, editable: true, field: 'amount' },
          { label: 'Method', value: isData.method },
          { label: 'Swift', value: isData.swift },
          { label: 'Bank Name', value: isData.bank_name },
          { label: 'Account Number', value: isData.account_number },
          { label: 'Account Name', value: isData.account_name },
          { label: 'Gcash Name', value: isData.name },
          { label: 'Gcash Phone', value: isData.phone },
          
        ].map(({ label, value, editable, field }, index) => (
          <div
            className={styles.inputCards}
            key={index}
            style={{ marginBottom: '20px' }}
          >
            <label
              style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}
            >
              {label}
            </label>
            <input
              type="text"
              value={value}
              onChange={editable ? (e) => handleChangeHandler(e, field) : undefined}
              className={`${styles.inputField} ${!editable ? styles.readOnly : ''}`}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                width: '100%',
                fontSize: '14px',
                outline: 'none',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 8px rgba(0, 123, 255, 0.5)';
                e.target.style.borderColor = '#4f46e5';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.borderColor = '#ddd';
              }}
            />
          </div>
        ))}

         <label
              style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}
            >
              Date
            </label>
            <input
              type="date"
              value={isData.date}
              onChange={ (e) => handleChangeHandler(e,'date')}
              className={`${styles.inputField}`}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                width: '100%',
                fontSize: '14px',
                outline: 'none',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',

              }}
             
            
            />

        {
          /* { label: 'Date', value: isData.date }, */
        }

        <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>
            Status
          </label>
          <select
            onChange={(e) => handleChangeHandler(e, 'status')}
            value={isData.status}
            className={styles.inputField}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              width: '100%',
              fontSize: '14px',
              outline: 'none',
              transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
            }}
          >
            <option value="active">Active</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div
          className={styles.buttonContainer}
          style={{ textAlign: 'right' }}
        >
          <button
            type="submit"
            className={styles.submitButton}
            style={{
              backgroundColor: '#4f46e5',
              color: '#fff',
              padding: '12px 30px',
              borderRadius: '5px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#2a2160';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4f46e5';
            }}
          >
            Save
          </button>
        </div>
      </form>
    )}
  </div>
</div>

        
        </>)




}