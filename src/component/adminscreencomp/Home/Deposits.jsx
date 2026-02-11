import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { deleteDeposit, fetchDeposits } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";

export const AdminDepositsComponent = ({ status }) => {

    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [depositList, setDepositList] = useState([])
    let [filteredDeposits, setfilteredDeposits] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color, user } = useSelector(state => state.userAuth)

    let interval
    useEffect(() => {
        fetchAllDeposits()
    }, [])




    let fetchAllDeposits = async () => {
        setIsError(false)
        let res = await dispatch(fetchDeposits())

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setDepositList(res.message)
        setfilteredDeposits(res.message)
        setIsLoading(false)
    }



    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/admindashboard/deposits/${id}`)
    }


    let deleteHandler = async (id) => {
        //delete this specific case from server
        setIsError(false)
        let res = await dispatch(deleteDeposit(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        //filtering the already list

        let filteredArray = depositList.filter(data => data._id !== id)

        setDepositList(filteredArray)
        setfilteredDeposits(filteredArray)
        setIsLoading(false)

    }





    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredDeposits.filter((item) => {
                const itemData = item.user.email ? item.user.email : '';
                const textData = e.target.value.toLowerCase();

                console.log(itemData)
                console.log(textData)
                return itemData.indexOf(textData) > -1;
            })

            setDepositList(newData)
            setIsLoading(false)
        } else {
            setDepositList(filteredDeposits)
            setIsLoading(false)

        }
    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<div
        className={styles.homeScreen}
        style={{
          backgroundColor: color.background,
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          className={styles.timeline}
          style={{
            backgroundColor: color.background,
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
  style={{
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0',
  }}
>
  <div
    style={{
      width: '100%',
      maxWidth: '600px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.04)',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      transition: 'box-shadow 0.2s ease',
    }}
  >
    <input
      placeholder="Search by email"
      onChange={searchHandler}
      style={{
        flex: 1,
        padding: '12px 16px',
        fontSize: '16px',
        border: 'none',
        outline: 'none',
        borderRadius: '8px',
        backgroundColor: '#f9fafb',
        color: '#374151',
      }}
    />
    <span
      className="material-icons"
      style={{
        marginLeft: '12px',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#6366f1',
        transition: 'color 0.3s ease',
      }}
      onMouseOver={(e) => (e.currentTarget.style.color = '#4338ca')}
      onMouseOut={(e) => (e.currentTarget.style.color = '#6366f1')}
    >
      search
    </span>
  </div>
</div>

      
<div style={{ overflowX: 'auto', width: '100%' }}>
  {depositList.length === 0 ? (
    <div
      style={{
        textAlign: 'center',
        padding: '32px',
        color: '#9ca3af',
        fontSize: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '10px',
        marginTop: '16px',
        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.05)',
      }}
    >
      <p>No deposits yet</p>
    </div>
  ) : (
    <table
      style={{
        width: '100%',
        minWidth: '800px',
        borderCollapse: 'collapse',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
        marginTop: '20px',
      }}
    >
      <thead>
        <tr
          style={{
            backgroundColor: '#f3f4f6',
            color: '#1f2937',
            fontWeight: 600,
            fontSize: '15px',
            textTransform: 'uppercase',
          }}
        >
          {[
            'Depositor Name',
            'Deposit ID',
            'Amount',
            'Type',
            'Date',
            'Status',
            '',
            '',
          ].map((header, idx) => (
            <th
              key={idx}
              style={{
                padding: '16px',
                whiteSpace: 'nowrap',
                textAlign: idx > 4 ? 'center' : 'left',
              }}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {depositList.map((data) => (
          <tr
            key={data._id}
            style={{
              borderBottom: '1px solid #e5e7eb',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <td style={{ padding: '16px', color: '#374151' }}>
              {data?.user?.email}
            </td>
            <td style={{ padding: '16px', color: '#374151' }}>
              {data.depositId}
            </td>
            <td style={{ padding: '16px', color: '#10b981', fontWeight: 500 }}>
              ${data.amount}
            </td>
            <td style={{ padding: '16px', color: '#6b7280' }}>{data.type}</td>
            <td style={{ padding: '16px', color: '#6b7280' }}>{data.date}</td>
            <td
              style={{
                padding: '16px',
                color:
                  data.status === 'completed'
                    ? '#16a34a'
                    : data.status === 'pending'
                    ? '#f59e0b'
                    : '#ef4444',
                fontWeight: 500,
              }}
            >
              {data.status}
            </td>
            <td
              onClick={() => deleteHandler(data._id)}
              style={{
                cursor: 'pointer',
                textAlign: 'center',
                padding: '16px',
              }}
            >
              <span
                className="material-icons"
                style={{
                  color: '#ef4444',
                  transition: 'transform 0.2s ease',
                }}
              >
                delete
              </span>
            </td>
            <td
              onClick={() => editHandler(data._id)}
              style={{
                cursor: 'pointer',
                textAlign: 'center',
                padding: '16px',
              }}
            >
              <span
                className="material-icons"
                style={{
                  color: '#3b82f6',
                  transition: 'transform 0.2s ease',
                }}
              >
                edit
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

        </div>
      </div>
      )




}
