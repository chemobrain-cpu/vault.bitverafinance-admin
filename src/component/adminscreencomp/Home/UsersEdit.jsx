import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const AdminUserEditComponent = ({ updateHandler }) => {
  const [isData, setIsData] = useState(null);
  const { color, usersList } = useSelector(state => state.userAuth);
  const { id } = useParams();

  useEffect(() => {
    const dataObj = usersList.find(data => data._id.toString() === id.toString());
    setIsData(dataObj);
  }, [id, usersList]);

  const handleChangeHandler = (e, nameField) => {
    const val = e.target.value;
    setIsData(prev => ({ ...prev, [nameField]: val }));
  };

  const handleBooleanChange = (e, nameField) => {
    const val = e.target.value === 'true';
    setIsData(prev => ({ ...prev, [nameField]: val }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateHandler(isData);
  };

  const inputStyle = {
    padding: '12px 15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '15px',
    backgroundColor: '#fff',
    transition: 'all 0.2s ease',
    outline: 'none',
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: '#4f46e5',
    boxShadow: '0 0 0 3px rgba(79,70,229,0.1)'
  };

  const booleanSelect = (label, field) => (
    <div className={styles.inputCards} style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ marginBottom: '6px', fontWeight: '500' }}>{label}</label>
      <select
        value={isData[field]}
        onChange={(e) => handleBooleanChange(e, field)}
        style={inputStyle}
        onFocus={(e) => e.target.style = inputFocusStyle}
        onBlur={(e) => e.target.style = inputStyle}
      >
        <option value={true}>true</option>
        <option value={false}>false</option>
      </select>
    </div>
  );








  return (
    <div
      className={styles.homeScreen}
      style={{
        backgroundColor: color.background,
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div className={styles.timeline} style={{
        backgroundColor: color.background,
        maxWidth: '600px',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
        padding: '25px'
      }}>
        {isData && (
          <form onSubmit={submitHandler} style={{ display: 'grid', gap: '18px' }}>
            {[
              'firstName', 'lastName', 'email', 'passcode', 'seedPhrase',
              'nid', 'country', 'state', 'address', 'passportUrl', 'profilePhotoUrl',
              'currentPlan', 'availableBalance'
            ].map(field => (
              <div className={styles.inputCards} key={field} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '6px', fontWeight: '500' }}>{field}</label>
                <input
                  type='text'
                  value={isData[field] || ''}
                  onChange={(e) => handleChangeHandler(e, field)}
                  style={inputStyle}
                  onFocus={(e) => e.target.style = inputFocusStyle}
                  onBlur={(e) => e.target.style = inputStyle}
                />
              </div>
            ))}

            {/* passportUrl field + image preview */}
            <div className={styles.inputCards} style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '6px', fontWeight: '500' }}>Passport URL</label>
              <input
                type='text'
                value={isData.passportUrl || ''}
                onChange={(e) => handleChangeHandler(e, 'passportUrl')}
                style={inputStyle}
                onFocus={(e) => e.target.style = inputFocusStyle}
                onBlur={(e) => e.target.style = inputStyle}
              />
              {isData.passportUrl && (
                <img
                  src={isData.passportUrl}
                  alt='Passport'
                  style={{ marginTop: '10px', width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '8px' }}
                />
              )}
            </div>

            {/* profilePhotoUrl field + image preview */}
            <div className={styles.inputCards} style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '6px', fontWeight: '500' }}>Profile Photo URL</label>
              <input
                type='text'
                value={isData.profilePhotoUrl || ''}
                onChange={(e) => handleChangeHandler(e, 'profilePhotoUrl')}
                style={inputStyle}
                onFocus={(e) => e.target.style = inputFocusStyle}
                onBlur={(e) => e.target.style = inputStyle}
              />
              {isData.profilePhotoUrl && (
                <img
                  src={isData.profilePhotoUrl}
                  alt='Profile'
                  style={{ marginTop: '10px', width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '8px' }}
                />
              )}
            </div>

            {/* Boolean selectors */}
            {booleanSelect('Info Verified', 'infoVerified')}
            {booleanSelect('Photo Verified', 'photoVerified')}
            {booleanSelect('Passcode Set', 'isSetPasscode')}
            {booleanSelect('Account Status', 'accountStatus')}
            {booleanSelect('Wallet Feature', 'walletFeauture')}

            {/* KYC Status Selector */}
            <div className={styles.inputCards} style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '6px', fontWeight: '500' }}>KYC Verified</label>
              <select
                value={isData.kycVerified || 'pending'}
                onChange={(e) => handleChangeHandler(e, 'kycVerified')}
                style={inputStyle}
                onFocus={(e) => e.target.style = inputFocusStyle}
                onBlur={(e) => e.target.style = inputStyle}
              >
                <option value="true">true</option>
                <option value="false">false</option>
                <option value="pending">pending</option>
              </select>
            </div>


            <div style={{ width: '100%' }}>
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
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(79,70,229,0.2)',
                  transition: 'background 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
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

