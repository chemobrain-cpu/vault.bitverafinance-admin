import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { deletePackage, fetchPackages } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";



export const AdminPackagesComponent = () => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [packageList, setPackageList] = useState([])
    let [filteredPackages, setfilteredPackages] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color } = useSelector(state => state.userAuth)

    useEffect(() => {
        fetchAllPackages()
    }, [])

    let fetchAllPackages = async () => {
        setIsError(false)
        let res = await dispatch(fetchPackages())

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setPackageList(res.message)
        setfilteredPackages(res.message)
        setIsLoading(false)
    }

    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/admindashboard/packages/${id}`)
    }


    let deleteHandler = async (id) => {
        //delete this specific case from server
        setIsError(false)
        let res = await dispatch(deletePackage(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        //filtering the already list

        let filteredArray = packageList.filter(data => data._id !== id)

        setPackageList(filteredArray)
        setfilteredPackages(filteredArray)
        setIsLoading(false)
    }

    let navigateHandler = () => {
        navigate('/admindashboard/package')
    }



    let searchHandler = (e) => {
        setIsLoading(true);
        if (e) {
            const newData = filteredPackages.filter((item) => {
                const itemData = item.name ? item.name : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            });
            setPackageList(newData);
            setIsLoading(false);
        } else {
            setPackageList(filteredPackages);
            setIsLoading(false);
        }
    };
    

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
        <div className={styles.timeline} style={{ backgroundColor: color.background }}>

            {packageList.length !== 0 && (
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
                            placeholder="Search by name"
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
                        Create Package
                    </button>
                </div>

                {packageList.length === 0 ? (
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
                        <p>No packages yet</p>
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
                                {['Name of Package', ' ($)Price'].map(
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
                            {packageList.map((data) => (
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
                                    <td style={{ padding: '16px', color: '#374151' }}>{data.name}</td>
                                    <td style={{ padding: '16px', color: '#374151' }}>{data.price}</td>
                                    
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