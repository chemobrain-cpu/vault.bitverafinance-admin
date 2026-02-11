import React, { useState } from 'react';
import { useSelector } from "react-redux";

export const SendEmailComponent = ({ updateHandler }) => {
  let { color } = useSelector(state => state.userAuth);

  const [isData, setIsData] = useState({
    to: "",
    subject: "",
    html: ""
  });

  const handleChangeHandler = (e, field) => {
    const val = e.target.value;
    setIsData(prev => ({ ...prev, [field]: val }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateHandler(isData);
  };

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
        <form
          style={{ display: "grid", gap: "15px" }}
          onSubmit={submitHandler}
        >
          {[
            { label: "Recipient Email", field: "to", type: "email" },
            { label: "Subject", field: "subject", type: "text" },
            { label: "Message (HTML)", field: "html", type: "textarea" },
          ].map(({ label, field, type }) => (
            <div key={field} style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{ fontSize: "14px", color: "#555", marginBottom: "5px" }}
              >
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    minHeight: "150px",
                    outline: "none",
                  }}
                  onChange={(e) => handleChangeHandler(e, field)}
                  value={isData[field]}
                />
              ) : (
                <input
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    outline: "none",
                    transition: "box-shadow 0.3s ease",
                  }}
                  type={type}
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 5px rgba(56, 43, 125, 0.5)")
                  }
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                  onChange={(e) => handleChangeHandler(e, field)}
                  value={isData[field]}
                />
              )}
            </div>
          ))}

          <div style={{ width: "100%" }}>
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#4f46e5",
                color: "#fff",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(79,70,229,0.2)",
                transition: "background 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#4338ca")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4f46e5")}
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
