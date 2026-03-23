import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const AdminEditComponent = ({ updateHandler }) => {

  let [isData, setIsData] = useState(null)
  let { color, admin } = useSelector(state => state.userAuth)
  let { id } = useParams()

  // ✅ FIXED: no mutation + supports boolean
  let handleChangeHandler = (e, nameField, isBoolean = false) => {
    let val = e.target.value

    if (isBoolean) {
      val = val === "true" // convert string → boolean
    }

    setIsData(prev => ({
      ...prev,
      [nameField]: val
    }))
  }

  useEffect(() => {
    setIsData(admin)
  }, [id, admin])

  let submitHandler = (e) => {
    e.preventDefault()
    updateHandler(isData)
  }

  return (
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
            style={{ display: "grid", gap: "15px" }}
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
                  }}
                  onChange={(e) => handleChangeHandler(e, field)}
                  value={isData[field] || ""}
                  type="text"
                />
              </div>
            ))}

            {/* ✅ NEW: OFF KYC SELECT */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "14px", color: "#555", marginBottom: "5px" }}>
                Disable All KYC (offKyc)
              </label>
              <select
                value={String(isData.offKyc ?? false)}
                onChange={(e) => handleChangeHandler(e, "offKyc", true)}
                style={{ padding: "10px", borderRadius: "4px" }}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            {/* ✅ NEW: OFF VERIFICATION SELECT */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "14px", color: "#555", marginBottom: "5px" }}>
                Disable All Account Verification (offVerification)
              </label>
              <select
                value={String(isData.offVerification ?? false)}
                onChange={(e) => handleChangeHandler(e, "offVerification", true)}
                style={{ padding: "10px", borderRadius: "4px" }}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
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
                }}
              >
                Save
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  )
}