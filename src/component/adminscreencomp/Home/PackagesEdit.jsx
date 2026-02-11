import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const AdminPackageEditComponent = ({ updateHandler }) => {
  const [form, setForm] = useState(null);
  const { color, packagesList } = useSelector(state => state.userAuth);
  const { id } = useParams();

  const inputStyle = {
    padding: '12px 15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '15px',
    backgroundColor: '#fff',
    transition: 'all 0.2s ease',
    outline: 'none',
  };

  const handleChange = (e, field) => {
    const value = field === 'requiresTwoDeposits' || field === 'dailyReturnsEnabled'
      ? e.target.checked
      : e.target.value;

    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: parseFloat(form.price),
      durationInDays: parseInt(form.durationInDays),
      bonus: parseFloat(form.bonus),
      features: form.features.split(',').map(f => f.trim()),
    };
    updateHandler(payload);
  };

  useEffect(() => {
    const packageData = packagesList.find(p => p._id.toString() === id.toString());
    if (packageData) {
      setForm({
        ...packageData,
        features: packageData.features?.join(', ') || '',
      });
    }
  }, [id, packagesList]);

  if (!form) return null;

  return (
    <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
      <div className={styles.timeline} style={{
        maxWidth: '600px',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
        padding: '25px',
        marginLeft: '10px',
        backgroundColor: color.background
      }}>
        <form className={styles.editForm} onSubmit={handleSubmit} style={{ display: 'grid', gap: '18px' }}>
          <LabeledInput label="Package Name" value={form.name} onChange={e => handleChange(e, 'name')} />
          <LabeledInput label="Price ($)" type="number" value={form.price} onChange={e => handleChange(e, 'price')} />
          <LabeledInput label="Duration (days)" type="number" value={form.durationInDays} onChange={e => handleChange(e, 'durationInDays')} />
          <LabeledInput label="Daily Return ($)" type="number" value={form.dailyReturn} onChange={e => handleChange(e, 'dailyReturn')} />
          <LabeledInput label="Bonus ($)" type="number" value={form.bonus} onChange={e => handleChange(e, 'bonus')} />
          <LabeledInput label="Features (comma-separated)" value={form.features} onChange={e => handleChange(e, 'features')} />

         

          <button type="submit" style={{
            width: '100%',
            backgroundColor: '#4f46e5',
            color: '#fff',
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(79,70,229,0.2)',
            transition: 'background 0.3s ease'
          }}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

const LabeledInput = ({ label, value, onChange, type = 'text' }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label style={{ marginBottom: '6px', fontWeight: '500' }}>{label}</label>
    <input
      value={value}
      onChange={onChange}
      type={type}
      style={{
        padding: '12px 15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '15px',
        backgroundColor: '#fff',
        outline: 'none'
      }}
    />
  </div>
);

const CheckboxField = ({ label, checked, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <input type="checkbox" checked={checked} onChange={onChange} />
    <label>{label}</label>
  </div>
);
