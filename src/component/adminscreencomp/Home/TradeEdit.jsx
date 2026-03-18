import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const AdminTradeEditComponent = ({ updateHandler }) => {
  let [isData, setIsData] = useState(null);
  let { color, tradesList } = useSelector(state => state.userAuth);
  let { id } = useParams();

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
    boxShadow: '0 0 0 3px rgba(79,70,229,0.1)',
  };

  const handleChangeHandler = (e, nameField) => {
    let val = e.target.value;
    setIsData(prev => {
      prev[`${nameField}`] = val;
      let newData = { ...prev };
      return newData;
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateHandler(isData);
  };

  useEffect(() => {
    let dataObj = tradesList.find(data => data._id.toString() === id.toString());
    setIsData(dataObj);
  }, [id]);

  return (
    <>
      <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
        <div
          className={styles.timeline}
          style={{
            backgroundColor: color.background,
            maxWidth: '600px',
            borderRadius: '12px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
            padding: '25px',
            marginLeft:'10px',
          }}
        >
          {tradesList && isData && (
            <form className={styles.editForm} onSubmit={submitHandler} style={{ display: 'grid', gap: '18px' }}>
              {/* Trader Name */}
              <div className={styles.inputCards} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '6px', fontWeight: '500' }}>Trader Name</label>
                <input value={isData.user.email} type='text' readOnly style={inputStyle} />
              </div>

              {/* TradeID */}
              <div className={styles.inputCards} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '6px', fontWeight: '500' }}>TradeID</label>
                <input value={isData.tradeId} type='text' readOnly style={inputStyle} />
              </div>

              {/* Date */}
              <div className={styles.inputCards} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '6px', fontWeight: '500' }}>Date</label>
                <input value={isData.date} type='text' readOnly style={inputStyle} />
              </div>

              {/* Pair */}
              <div className={styles.inputCards} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '6px', fontWeight: '500' }}>Pair</label>
                <input
                  value={isData.pair}
                  onChange={(e) => handleChangeHandler(e, 'pair')}
                  type='text'
                  style={inputStyle}
                  onFocus={(e) => e.target.style = inputFocusStyle}
                  onBlur={(e) => e.target.style = inputStyle}
                />
              </div>

              {/* Profit */}
              <div className={styles.inputCards} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '6px', fontWeight: '500' }}>Profit</label>
                <input
                  value={isData.profit}
                  onChange={(e) => handleChangeHandler(e, 'profit')}
                  type='text'
                  style={inputStyle}
                  onFocus={(e) => e.target.style = inputFocusStyle}
                  onBlur={(e) => e.target.style = inputStyle}
                />
              </div>

              {/* Loss */}
              <div className={styles.inputCards} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '6px', fontWeight: '500' }}>Loss</label>
                <input
                  value={isData.loss}
                  onChange={(e) => handleChangeHandler(e, 'loss')}
                  type='text'
                  style={inputStyle}
                  onFocus={(e) => e.target.style = inputFocusStyle}
                  onBlur={(e) => e.target.style = inputStyle}
                />
              </div>

              {/* Save Button */}
              <div className={styles.buttonContainer} style={{ width: '100%' }}>
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
                    transition: 'background 0.3s ease',
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
    </>
  );
};
