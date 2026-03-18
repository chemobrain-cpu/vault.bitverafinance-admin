import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const AdminDepositHandlerEditComponent = ({ updateHandler }) => {
    const [isData, setIsData] = useState(null);
    const { color, depositHandlersList } = useSelector(state => state.userAuth);
    const { id } = useParams();

    const handleChangeHandler = (e, nameField) => {
        const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setIsData(prev => ({ ...prev, [nameField]: val }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        updateHandler(isData);
    };

    useEffect(() => {
        const dataObj = depositHandlersList.find(data => data._id.toString() === id.toString());
        setIsData(dataObj);
    }, [id, depositHandlersList]);

    return (
        <div className={styles.homeScreen} style={{ backgroundColor: color.background, padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div className={`${styles.timeline} ${styles.responsiveTimeline}`} style={{ backgroundColor: color.background, maxWidth: '900px', margin: '0 auto', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', padding: '40px' }}>
                {depositHandlersList && isData && (
                    <form className={`${styles.editForm} ${styles.responsiveForm}`} onSubmit={submitHandler}>
                        {/* Read-only Email */}
                        <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
                            <label>Email</label>
                            <input
                                type="text"
                                value={isData.user?.email || ''}
                                readOnly
                                className={`${styles.inputField} ${styles.readOnly}`}
                            />
                        </div>

                        {/* Editable Fields */}
                        {[
                            { label: 'Total Deposits Required', field: 'totalDepositsRequired' },
                            { label: 'Deposit Amount', field: 'depositAmount' },
                            { label: 'Duration (Days)', field: 'durationDays' },
                            { label: 'Daily Profit', field: 'dailyProfit' }
                        ].map(({ label, field }, index) => (
                            <div className={styles.inputCards} key={index} style={{ marginBottom: '20px' }}>
                                <label>{label}</label>
                                <input
                                    type="number"
                                    value={isData[field]}
                                    onChange={(e) => handleChangeHandler(e, field)}
                                    className={styles.inputField}
                                />
                            </div>
                        ))}

                     

                        {/* Status Dropdown */}
                        <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
                            <label>Status</label>
                            <select
                                value={isData.status}
                                onChange={(e) => handleChangeHandler(e, 'status')}
                                className={styles.inputField}
                            >
                                <option value="active">Active</option>
                                <option value="paused">Paused</option>
                                <option value="completed">Completed</option>
                                <option value="expired">Expired</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className={styles.buttonContainer} style={{ textAlign: 'right' }}>
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
                                    cursor: 'pointer'
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
