import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { deleteTrade, fetchTrades } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";



export const AdminTradesComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [tradeList, setTradeList] = useState([])
    let [filteredTrades, setfilteredTrades] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color } = useSelector(state => state.userAuth)

    useEffect(() => {
        fetchAllTrades()
    }, [])

    let fetchAllTrades = async () => {
        setIsError(false)
        let res = await dispatch(fetchTrades())

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setTradeList(res.message)
        setfilteredTrades(res.message)
        setIsLoading(false)
    }

    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/admindashboard/traders/${id}`)
    }


    let deleteHandler = async (id) => {
        //delete this specific case from server
        setIsError(false)
        let res = await dispatch(deleteTrade(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        //filtering the already list

        let filteredArray = tradeList.filter(data => data._id !== id)

        setTradeList(filteredArray)
        setfilteredTrades(filteredArray)
        setIsLoading(false)

    }

    let navigateHandler = () => {
        navigate('/admindashboard/trade')


    }



    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredTrades.filter((item) => {
                const itemData = item.user.email ? item.user.email : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            })
            setTradeList(newData)
            setIsLoading(false)
        } else {
            setTradeList(filteredTrades)
            setIsLoading(false)

        }
    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
        <div className={styles.timeline} style={{ backgroundColor: color.background }}>

            {tradeList.length !== 0 && (
                <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
    marginBottom: '1.5rem',
    width: '100%',
  }}
>
  {/* Search Container */}
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      background: '#f5f7fa',
      borderRadius: '10px',
      padding: '0.75rem 1rem',
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
    }}
  >
    <input
      type="text"
      placeholder="Search by email"
      onChange={searchHandler}
      style={{
        flex: 1,
        border: 'none',
        outline: 'none',
        fontSize: '16px',
        background: 'transparent',
        color: '#333',
      }}
    />
    <span
      className="material-icons"
      style={{
        fontSize: '22px',
        color: '#888',
        marginLeft: '0.5rem',
        cursor: 'pointer',
      }}
    >
      search
    </span>
  </div>

  {/* Date Filter Placeholder (optional) */}
  <div
    style={{
      height: '40px',
      backgroundColor: '#eef1f5',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#777',
      fontSize: '14px',
    }}
  >
    {/* Replace with date picker or filter dropdown if needed */}
    <em>Date filter (coming soon)</em>
  </div>
</div>

            )}

<div style={{ width: '100%', overflowX: 'auto' }}>
  <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
    <button
      style={{
        backgroundColor: '#4f46e5',
        padding: '12px 20px',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '15px',
        fontWeight: 500,
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4338ca')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4f46e5')}
      onClick={navigateHandler}
    >
      Create Trade
    </button>
  </div>

  {tradeList.length === 0 ? (
    <div
      style={{
        textAlign: 'center',
        padding: '32px',
        color: '#9ca3af',
        fontSize: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '10px',
        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.05)',
      }}
    >
      <p>No trade yet</p>
    </div>
  ) : (
    <table
      style={{
        width: '100%',
        minWidth: '900px',
        borderCollapse: 'collapse',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 18px rgba(0, 0, 0, 0.08)',
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
          {['Email Of Trader', 'TradeID', 'Date', 'Pair', 'Profit', 'Loss', 'Delete', 'Edit'].map(
            (header, idx) => (
              <th
                key={idx}
                style={{
                  padding: '16px',
                  whiteSpace: 'nowrap',
                  textAlign: idx > 5 ? 'center' : 'left',
                }}
              >
                {header}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {tradeList.map((data) => (
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
            <td style={{ padding: '16px', color: '#374151' }}>{data?.user?.email}</td>
            <td style={{ padding: '16px', color: '#374151' }}>{data.tradeId}</td>
            <td style={{ padding: '16px', color: '#6b7280' }}>{data.date}</td>
            <td style={{ padding: '16px', color: '#6b7280' }}>{data.pair}</td>
            <td style={{ padding: '16px', color: '#10b981', fontWeight: 500 }}>{data.profit}</td>
            <td style={{ padding: '16px', color: '#ef4444', fontWeight: 500 }}>{data.loss}</td>
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
