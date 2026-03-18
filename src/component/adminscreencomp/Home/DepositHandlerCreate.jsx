import React, { useState } from 'react';
import styles from '../../common/Home.module.css';
import { useSelector } from "react-redux";

export const AdminDepositHandlerCreateComponent = ({ updateHandler }) => {
    const [form, setForm] = useState({
        user: null,
        totalDepositsRequired: '',
        depositAmount: '',
        durationDays: '',
        paused: false,
        status: 'active'
    });

    const { color, usersList = [] } = useSelector(state => state.userAuth); // Assuming all users are here

    const handleChange = (e, name) => {
        const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm(prev => ({ ...prev, [name]: val }));
    };

    const handleUserChange = (e) => {
        const selectedEmail = e.target.value;
        const selectedUser = usersList.find(u => u.email === selectedEmail);
        setForm(prev => ({ ...prev, user: selectedUser }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.user) return alert("Please select a user");

        const payload = {
            userId: form.user._id,
            totalDepositsRequired: parseInt(form.totalDepositsRequired),
            depositAmount: parseFloat(form.depositAmount),
            durationDays: parseInt(form.durationDays),
            paused: form.paused,
            status: form.status,
        };
        
        updateHandler(payload);
    };

    return (
        <div className={styles.homeScreen} style={{ backgroundColor: color.background, padding: '20px' }}>
            <div className={styles.timeline} style={{ maxWidth: '900px', margin: '0 auto', padding: '40px' }}>
                <form onSubmit={handleSubmit}>

                    {/* User Email Dropdown */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '16px', color: '#333' }}>Select User</label>
                        <select
                            onChange={handleUserChange}
                            value={form.user?.email || ''}
                            style={{
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                width: '100%',
                                fontSize: '14px'
                            }}
                        >
                            <option value="">-- Select user by email --</option>
                            {usersList.map(user => (
                                <option key={user._id} value={user.email}>
                                    {user.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    <InputField label="Total Deposits Required" type="number" value={form.totalDepositsRequired} onChange={(e) => handleChange(e, 'totalDepositsRequired')} />
                    <InputField label="Deposit Amount" type="number" value={form.depositAmount} onChange={(e) => handleChange(e, 'depositAmount')} />
                    <InputField label="Duration (Days)" type="number" value={form.durationDays} onChange={(e) => handleChange(e, 'durationDays')} />

                    <InputField label="Daily Profit" type="number" value={form.dailyProfit} onChange={(e) => handleChange(e, 'dailyProfit')} />

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '16px', color: '#333' }}>Paused</label>
                        <input
                            type="checkbox"
                            checked={form.paused}
                            onChange={(e) => handleChange(e, 'paused')}
                            style={{ marginLeft: '10px', transform: 'scale(1.3)' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '16px', color: '#333' }}>Status</label>
                        <select
                            value={form.status}
                            onChange={(e) => handleChange(e, 'status')}
                            style={{
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                width: '100%',
                                fontSize: '14px'
                            }}
                        >
                            <option value="active">Active</option>
                            <option value="paused">Paused</option>
                            <option value="completed">Completed</option>
                            <option value="expired">Expired</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            backgroundColor: '#4f46e5',
                            color: '#fff',
                            padding: '12px',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        Create Deposit Handler
                    </button>
                </form>
            </div>
        </div>
    );
};

const InputField = ({ label, type = "text", value, onChange }) => (
    <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '16px', color: '#333' }}>{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                width: '100%',
                fontSize: '14px'
            }}
        />
    </div>
);


