import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const AdminDepositEditComponent = ({ updateHandler }) => {
    const [isData, setIsData] = useState(null);
    const { color, depositsList } = useSelector(state => state.userAuth);
    const { id } = useParams();

    console.log(isData)

    const handleChangeHandler = (e, nameField) => {
        const val = e.target.value;
        setIsData(prev => ({ ...prev, [nameField]: val }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        updateHandler(isData);
    };

    useEffect(() => {
        const dataObj = depositsList.find(data => data._id.toString() === id.toString());
        setIsData(dataObj);
        console.log(dataObj);
    }, [id, depositsList]);

    return (
        <div
            className={styles.homeScreen}
            style={{
                backgroundColor: color.background,
                padding: '20px',
                fontFamily: 'Arial, sans-serif'
            }}
        >
            <div
                className={`${styles.timeline} ${styles.responsiveTimeline}`}
                style={{
                    backgroundColor: color.background,
                    maxWidth: '900px',
                    margin: '0 auto',
                    borderRadius: '12px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                    padding: '40px'
                }}
            >
                {depositsList && isData && (
                    <form
                        className={`${styles.editForm} ${styles.responsiveForm}`}
                        onSubmit={submitHandler}
                    >
                        {[
                            { label: 'Depositor Email', value: isData.user.email, readOnly: true },
                            { label: 'DepositID', value: isData.depositId, readOnly: true },
                            { label: 'Amount', value: isData.amount, field: 'amount' },
                            { label: 'Type', value: isData.type, field: 'type' },
                            { label: 'Date', value: isData.date, field: 'date', type: 'date' }
                        ].map(({ label, value, field, readOnly, type = 'text' }, index) => (
                            <div
                                className={styles.inputCards}
                                key={index}
                                style={{ marginBottom: '20px' }}
                            >
                                <label
                                    style={{
                                        fontSize: '16px',
                                        color: '#333',
                                        marginBottom: '8px'
                                    }}
                                >
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    value={value}
                                    readOnly={readOnly}
                                    onChange={
                                        field ? (e) => handleChangeHandler(e, field) : undefined
                                    }
                                    className={`${styles.inputField} ${readOnly ? styles.readOnly : ''}`}
                                    style={{
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #ddd',
                                        width: '100%',
                                        fontSize: '14px',
                                        outline: 'none',
                                        transition:
                                            'box-shadow 0.3s ease, border-color 0.3s ease',
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.boxShadow =
                                            '0 0 8px rgba(0, 123, 255, 0.5)';
                                        e.target.style.borderColor = '#4f46e5';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.borderColor = '#ddd';
                                    }}
                                />
                            </div>
                        ))}

                        {/* Track Payment */}
                        <div
                            className={styles.inputCards}
                            style={{ marginBottom: '20px' }}
                        >
                            <label
                                style={{
                                    fontSize: '16px',
                                    color: '#333',
                                    marginBottom: '8px'
                                }}
                            >
                                Track Payment
                            </label>

                            <select
                                onChange={(e) => handleChangeHandler(e, 'paid')}
                                value={isData.paid || ''} // controlled value
                                className={styles.inputField}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    width: '100%',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition:
                                        'box-shadow 0.3s ease, border-color 0.3s ease',
                                }}
                            >
                                <option value="Paid">Paid</option>
                                <option value="unPaid">unPaid</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div
                            className={styles.inputCards}
                            style={{ marginBottom: '20px' }}
                        >
                            <label
                                style={{
                                    fontSize: '16px',
                                    color: '#333',
                                    marginBottom: '8px'
                                }}
                            >
                                Status
                            </label>

                            <select
    onChange={(e) => handleChangeHandler(e, 'status')}
    value={isData.status== 'pending'? 'Pending':isData.status} // default to Pending if no status
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
