import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactS3 from "react-s3";
import { Buffer } from "buffer";
import styles from "./CopyTradeForm.module.css";
import { type } from "os";

window.Buffer = window.Buffer || Buffer;

const imageMimeType = /image\/(png|jpg|jpeg)/i;


export const CopyTradeFormComponent = ({ updateHandler }) => {

  let [isData, setIsData] = useState({});
  let { color, copyTrader } = useSelector((state) => state.userAuth);
  let { id } = useParams();

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  /* INPUT CHANGE */
  const handleChangeHandler = (e, nameField) => {
    const val = e.target.value;

    setIsData((prev) => ({
      ...prev,
      [nameField]: val,
    }));
  };

  /* IMAGE CHANGE */
  const changePhotoHandler = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.match(imageMimeType)) {
      alert("Only PNG/JPG images allowed");
      return;
    }

    setPhoto(file);
  };

  /* IMAGE PREVIEW */
  useEffect(() => {

    if (!photo) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };

    reader.readAsDataURL(photo);

  }, [photo]);

  /* LOAD EXISTING DATA */
  useEffect(() => {

    if (copyTrader) {

      setIsData(copyTrader);

      if (copyTrader.traderPhotoUrl) {
        setPhotoPreview(copyTrader.traderPhotoUrl);
      }

    }

  }, [copyTrader, id]);

/* SUBMIT HANDLER */
  const submitHandler = async (e) => {
   
    if(uploading){
      return
    }
    setUploading(true)

    e.preventDefault();

    let imgUrl = isData.traderPhotoUrl;

    /* S3 CONFIG */

    const config = {
      //REACT_APP_
      dirName: process.env.REACT_APP_S3_DIR_NAME,
      bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
      region: process.env.REACT_APP_S3_REGION,
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY

    };

    /* UPLOAD IMAGE IF CHANGED */
    const upload = async () => {

      if (!photo) {
        return alert('no valid photo')
      }

      try {

        const response = await ReactS3.uploadFile(photo, config);

        if (response.result.status !== 204) {
          throw new Error("Failed to upload image to S3");
        }

        imgUrl = response.location;

      } catch (error) {

        console.log(error);
        alert("Image upload failed");

      }

    };
    await upload();

    const updatedTrader = {

      ...isData,
      traderPhotoUrl: imgUrl

    };
    updateHandler(updatedTrader);
  };
  const formFields = [
    {
      label: "Expert Trader Tag (MID / PRO)",
      field: "traderTag",
      placeholder: "Enter Expert Trader Tag",
      info: "",
      type:'text'
    },
    {
      label: "Trader Name",
      field: "traderName",
      placeholder: "Enter Expert Trader Name",
      info: "",
       type:'text'
    },
    {
      label: "Expert Trader Number of Followers",
      field: "followers",
      placeholder: "Enter Followers",
      info: "",
      type: 'number'
    },
    {
      label: "Expert Total Profit ($)",
      field: "totalProfit",
      placeholder: "Enter Profit",
      info: "",
      type: 'number'
    },
    {
      label: "Copy Trade Type",
      field: "copyTradeType",
      placeholder: "Copy",
      info: "",
       type:'text'
    },
    {
      label: "Active Days",
      field: "activeDays",
      placeholder: "Days",
      info: "",
      type: 'number'
    },
    {
      label: "Winning Rate (%)",
      field: "winningRate",
      placeholder: "0",
      info: "",
      type: 'number'
    },
    {
      label: "Startup Amount ($)",
      field: "startupAmount",
      placeholder: "Amount",
      info: "",
      type: 'number'
    },
    {
      label: "Rating",
      field: "rating",
      placeholder: "Rating",
      info: "",
      type: 'number'
    },
  ];

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
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <form onSubmit={submitHandler} style={{ display: "grid", gap: "15px" }}>

          {formFields.map(({ label, field, placeholder, info,type }) => (

            <div key={field} style={{ display: "flex", flexDirection: "column" }}>

              <label style={{ fontSize: "14px", marginBottom: "5px" }}>
                {label}
              </label>

              <input
                value={isData[field] || ""}
                onChange={(e) => handleChangeHandler(e, field)}
                placeholder={placeholder}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                }}
                
              />

              {info && <p className={styles.info}>{info}</p>}

            </div>

          ))}

          {/* IMAGE */}

          <div style={{ display: "flex", flexDirection: "column" }}>

            <label style={{ marginBottom: "5px" }}>
              Expert Trader Photo
            </label>

            {photoPreview && (
              <img
                src={photoPreview}
                alt="preview"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
            )}

            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              onChange={changePhotoHandler}
            />

          </div>

          <button
            type="submit"
            disabled={uploading}
            style={{
              backgroundColor: "#4f46e5",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {uploading ? "Uploading..." : "Submit"}
          </button>

        </form>
      </div>
    </div>
  );
};