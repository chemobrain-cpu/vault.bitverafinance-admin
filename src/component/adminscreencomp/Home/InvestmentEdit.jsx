import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const AdminInvestEditComponent = ({ updateHandler }) => {
    const [isData, setIsData] = useState(null);
    const { color, investmentsList } = useSelector(state => state.userAuth); // assume investmentsList is in Redux
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
        const dataObj = investmentsList.find(data => data._id.toString() === id.toString());
        setIsData(dataObj);
    }, [id, investmentsList]);

    return (
        <div className={styles.homeScreen} style={{ backgroundColor: color.background, padding: '20px' }}>
            <div className={`${styles.timeline}`} style={{ backgroundColor: color.background, maxWidth: '900px', margin: '0 auto', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', padding: '40px' }}>
                {investmentsList && isData && (
                    <form className={styles.editForm} onSubmit={submitHandler}>
                        {[
                            { label: 'User Email', value: isData.user?.email || '', readOnly: true },
                            { label: 'Investment Plan', value: isData.investmentPlan, field: 'investmentPlan' },
                            { label: 'Amount Invested', value: isData.amount, field: 'amount', type: 'number' },
                            { label: 'Profit', value: isData.profit, field: 'profit', type: 'number' },
                            { label: 'Total Profit', value: isData.totalProfit, field: 'totalProfit', type: 'number' },
                            { label: 'Total Deposit', value: isData.totalDeposit, field: 'totalDeposit', type: 'number' },
                            { label: 'Referral Bonus', value: isData.referralBonus, field: 'referralBonus', type: 'number' },
                            { label: 'Start Date', value: isData.date?.substring(0, 10), field: 'date', type: 'date' },
                        ].map(({ label, value, field, readOnly, type = 'text' }, index) => (
                            <div className={styles.inputCards} key={index} style={{ marginBottom: '20px' }}>
                                <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>{label}</label>
                                <input
                                    type={type}
                                    value={value}
                                    readOnly={readOnly}
                                    onChange={field ? (e) => handleChangeHandler(e, field) : undefined}
                                    className={`${styles.inputField} ${readOnly ? styles.readOnly : ''}`}
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

                        <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
                            <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Active Status</label>
                            <select
                                onChange={(e) => handleChangeHandler(e, 'isActive')}
                                value={isData.isActive ? 'true' : 'false'}
                                className={styles.inputField}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    width: '100%',
                                    fontSize: '14px',
                                }}
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>

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
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

