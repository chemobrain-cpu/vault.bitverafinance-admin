import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchDepositHandlers, deleteDepositHandler } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";

export const AdminDepositsComponent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [depositHandlerList, setDepositHandlerList] = useState([]);
    const [filteredDepositHandlersList, setFilteredDepositHandlersList] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const color = useSelector(state => state.userAuth?.color || { background: '#f9fafb' });

    useEffect(() => {
        fetchAllDepositHandlers();
    }, []);

    const fetchAllDepositHandlers = async () => {
        setIsError(false);
        try {
            const res = await dispatch(fetchDepositHandlers());
            if (!res.bool) {
                alert('err')
                setIsError(true);
                setIsLoading(false);
                return;
            }
            setDepositHandlerList(res.message);
            setFilteredDepositHandlersList(res.message);
        } catch (err) {
            console.error(err);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        setIsError(false);
        try {
            const res = await dispatch(deleteDepositHandler(id));
            if (!res.bool) {
                setIsError(true);
                return;
            }
            const updatedList = depositHandlerList.filter(item => item._id !== id);
            setDepositHandlerList(updatedList);
            setFilteredDepositHandlersList(updatedList);
        } catch (err) {
            console.error(err);
            setIsError(true);
        }
    };

    const searchHandler = (e) => {
        const text = e.target.value.toLowerCase();
        const filtered = filteredDepositHandlersList.filter(item =>
            (item.user?.name || '').toLowerCase().includes(text) ||
            (item.user?.email || '').toLowerCase().includes(text)
        );
        setDepositHandlerList(text ? filtered : filteredDepositHandlersList);
    };

    const navigateHandler = () => {
        navigate('/admindashboard/handler');
    };

    const editHandler = (id) => {
        navigate(`/admindashboard/handlers/${id}`);
    };

    if (isLoading) return <Loader />;
    if (isError) return <Error />;

    return (
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
            <div className={styles.timeline} style={{ backgroundColor: color.background }}>
                {/* Search Bar */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    padding: '1rem',
                    background: '#fff',
                    borderRadius: '12px',
                    marginBottom: '1.5rem'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: '#f5f7fa',
                        borderRadius: '10px',
                        padding: '0.75rem 1rem'
                    }}>
                        <input
                            type="text"
                            placeholder="Search by user name or email"
                            onChange={searchHandler}
                            style={{
                                flex: 1,
                                border: 'none',
                                outline: 'none',
                                fontSize: '16px',
                                background: 'transparent',
                                color: '#333'
                            }}
                        />
                        <span className="material-icons" style={{ fontSize: '22px', color: '#888', marginLeft: '0.5rem' }}>
                            search
                        </span>
                    </div>
                </div>

                {/* Create Button */}
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
                        Create Handler
                    </button>
                </div>

                {/* Table */}
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    {depositHandlerList.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '32px',
                            color: '#9ca3af',
                            fontSize: '16px',
                            backgroundColor: '#f9fafb',
                            borderRadius: '10px'
                        }}>
                            <p>No deposit handlers found</p>
                        </div>
                    ) : (
                        <table style={{
                            width: '100%',
                            minWidth: '1000px',
                            borderCollapse: 'collapse',
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            overflow: 'hidden'
                        }}>
                            <thead>
                                <tr style={{
                                    backgroundColor: '#f3f4f6',
                                    color: '#1f2937',
                                    fontWeight: 600,
                                    fontSize: '15px',
                                    textTransform: 'uppercase'
                                }}>
                                    <th style={{ padding: '16px' }}>User</th>
                                    <th style={{ padding: '16px' }}>Deposit Amount</th>
                                    <th style={{ padding: '16px' }}>Progress</th>
                                    <th style={{ padding: '16px' }}>Days Left</th>
                                    <th style={{ padding: '16px' }}>Status</th>
                                    <th style={{ padding: '16px' }}>Started On</th>
                                    <th style={{ padding: '16px', textAlign: 'center' }}>Edit</th>
                                    <th style={{ padding: '16px', textAlign: 'center' }}>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {depositHandlerList.map((data) => (
                                    <tr key={data._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        <td style={{ padding: '16px' }}>{data.user?.email || 'Unknown'}</td>
                                        <td style={{ padding: '16px' }}>{(data.depositAmount || 0).toLocaleString()}</td>
                                        <td style={{ padding: '16px' }}>
                                            {data.depositsMade} / {data.totalDepositsRequired}
                                        </td>
                                        <td style={{ padding: '16px' }}>{data.daysLeft}</td>
                                        <td style={{ padding: '16px', textTransform: 'capitalize' }}>{data.status}</td>
                                        <td style={{ padding: '16px' }}>
                                            {data.startDate ? new Date(data.startDate).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td
                                            style={{ textAlign: 'center', padding: '16px', cursor: 'pointer' }}
                                            onClick={() => editHandler(data._id)}
                                        >
                                            <span className="material-icons" style={{ color: '#3b82f6' }}>edit</span>
                                        </td>
                                        <td
                                            style={{ textAlign: 'center', padding: '16px', cursor: 'pointer' }}
                                            onClick={() => deleteHandler(data._id)}
                                        >
                                            <span className="material-icons" style={{ color: '#ef4444' }}>delete</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

