import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export const AdminEditComponent = ({ updateHandler, }) => {

  let [isData, setIsData] = useState(null)
  let { color, admin } = useSelector(state => state.userAuth)
  let { id } = useParams()

  let handleChangeHandler = (e, nameField) => {
    let val = e.target.value
    setIsData(prev => {
      prev[`${nameField}`] = val
      let newData = { ...prev }
      return newData
    })
  }


  useEffect(() => {
    setIsData(admin)
  }, [id])



  let submitHandler = (e) => {
    e.preventDefault()
    updateHandler(isData)
    return
  }


  return (<>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: color.background,
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: color.background,
          width: "100%",
          maxWidth: "600px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        {admin && isData && (
          <form
            style={{
              display: "grid",
              gap: "15px",
            }}
            onSubmit={submitHandler}
          >
            {[
              { label: "Email", field: "email" },
              { label: "Password", field: "password" },
              { label: "Bitcoin Wallet Address", field: "bitcoinwalletaddress" },
              { label: "Zelle Wallet Address", field: "zellewalletaddress" },
              { label: "XRP Wallet Address", field: "xrpwalletaddress" },
              { label: "Solana Wallet Address", field: "solanawalletaddress" },
              { label: "Usdt(Solana) Wallet Address", field: "usdtsolanawalletaddress" },
              { label: "Bnb Wallet Address", field: "bnbwalletaddress" },
              { label: "Dodge Wallet Address", field: "dodgewalletaddress" },

              










              { label: "Etherium Wallet Address", field: "etheriumwalletaddress" },
              { label: "Cash App", field: "cashappwalletaddress" },
              { label: "Gcash Name", field: "gcashname" },
              { label: "Gcash Phone Number", field: "gcashphonenumber" },
              { label: "Admin Phone Number", field: "phoneNumber" },
              { label: "Admin Name", field: "name" },
            ].map(({ label, field }) => (
              <div key={field} style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "14px", color: "#555", marginBottom: "5px" }}>
                  {label}
                </label>
                <input
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    outline: "none",
                    transition: "box-shadow 0.3s ease",
                  }}
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 5px rgba(56, 43, 125, 0.5)")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                  onChange={(e) => handleChangeHandler(e, field)}
                  value={isData[field]}
                  type="text"
                />
              </div>
            ))}
           

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
  </>)

}