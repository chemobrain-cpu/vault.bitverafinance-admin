import React, { useState } from 'react';
import styles from '../../common/Home.module.css';
import { useSelector } from "react-redux";

export const AdminPackageCreateComponent = ({ updateHandler }) => {
    const [form, setForm] = useState({
        name: '',
        price: '',
        durationInDays: '',
        requiresTwoDeposits: true,
        dailyReturnsEnabled: true,
        bonus: '',
        features: '',
        dailyReturn:''
    });

    const { color } = useSelector(state => state.userAuth);

    const handleChange = (e, name) => {
        const val = name === 'requiresTwoDeposits' || name === 'dailyReturnsEnabled'
            ? e.target.checked
            : e.target.value;

        setForm(prev => ({ ...prev, [name]: val }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            price: parseFloat(form.price),
            durationInDays: parseInt(form.durationInDays),
            bonus: parseFloat(form.bonus),
            features: form.features.split(',').map(f => f.trim())
        };
        updateHandler(payload);
    };

    return (
        <div className={styles.homeScreen} style={{ backgroundColor: color.background, padding: '20px' }}>
            <div className={styles.timeline} style={{ maxWidth: '900px', margin: '0 auto', padding: '40px' }}>
                <form onSubmit={handleSubmit}>
                    <InputField label="Package Name" value={form.name} onChange={(e) => handleChange(e, 'name')} />
                    <InputField label="Cost of plan" type="number" value={form.price} onChange={(e) => handleChange(e, 'price')} />
                    <InputField label="Duration (days)" type="number" value={form.durationInDays} onChange={(e) => handleChange(e, 'durationInDays')} />

                    <InputField label="Amount($) to return daily" type="number" value={form.dailyReturn} onChange={(e) => handleChange(e, 'dailyReturn')} />

                    <InputField label="($)Bonus" type="number" value={form.bonus} onChange={(e) => handleChange(e, 'bonus')} />
                    <InputField label="Features (comma-separated)" value={form.features} onChange={(e) => handleChange(e, 'features')} />

                    

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
                        Create Package
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


