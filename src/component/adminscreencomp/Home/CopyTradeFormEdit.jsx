import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactS3 from "react-s3";
import { Buffer } from "buffer";
import styles from "./CopyTradeForm.module.css";

window.Buffer = window.Buffer || Buffer;

const imageMimeType = /image\/(png|jpg|jpeg)/i;

export const CopyTradeFormEditComponent = ({ updateHandler }) => {

  const { color, copyTradesList } = useSelector((state) => state.userAuth);
  const { id } = useParams();

  const [isData, setIsData] = useState({});
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /* HANDLE INPUT CHANGE */

  const handleChangeHandler = (e, field) => {

    const value = e.target.value;

    setIsData((prev) => ({
      ...prev,
      [field]: value
    }));

  };



  /* IMAGE CHANGE HANDLER */

  const changePhotoHandler = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }

    setPhoto(file);

  };



  /* IMAGE PREVIEW */

  useEffect(() => {

    let fileReader;
    let isCancel = false;

    if (photo) {

      fileReader = new FileReader();

      fileReader.onload = (e) => {

        const { result } = e.target;

        if (result && !isCancel) {
          setPhotoPreview(result);
        }

      };

      fileReader.readAsDataURL(photo);

    }

    return () => {

      isCancel = true;

      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }

    };

  }, [photo]);



  /* FETCH TRADER FROM REDUX */

  useEffect(() => {

    if (copyTradesList && copyTradesList.length > 0) {

      const trader = copyTradesList.find((item) => item._id === id);

      if (trader) {

        setIsData(trader);

        if (trader.traderPhotoUrl) {
          setPhotoPreview(trader.traderPhotoUrl);
        }

      }

    }

  }, [copyTradesList, id]);



  /* SUBMIT HANDLER */
  const submitHandler = async (e) => {

    e.preventDefault();

    setIsLoading(true);

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

    setIsLoading(false);
    updateHandler(updatedTrader);
  };


  


  const formFields = [

    {
      label: "Expert Trader Tag (MID / PRO)",
      field: "traderTag",
      placeholder: "Enter Expert Trader Tag",
      info: "",
    },
    {
      label: "Trader Name",
      field: "traderName",
      placeholder: "Enter Expert Trader Name",
      info: "",
    },
    {
      label: "Expert Trader Number of Followers",
      field: "followers",
      placeholder: "Enter Expert Trader Number of Followers",
      info: "This is the number of followers who currently trading with the Expert",
    },
    {
      label: "Expert Total Profit ($)",
      field: "totalProfit",
      placeholder: "Enter Expert Total Profit",
      info: "This is the Total Profit made by this Expert trader",
    },
    {
      label: "Copy Trade Type (Copy / Buy)",
      field: "copyTradeType",
      placeholder: "Copy",
      info: "",
    },
    {
      label: "Expert Trade Active Days",
      field: "activeDays",
      placeholder: "Enter active days",
      info: "This is the expected days trader is available",
    },
    {
      label: "Equity (Winning Rate %)",
      field: "winningRate",
      placeholder: "0",
      info: "This is Expert Winning Rate",
    },
    {
      label: "Startup Amount ($)",
      field: "startupAmount",
      placeholder: "Startup Amount",
      info: "This is the price of this Copytrading",
    },
    {
      label: "Expert Trader Rating",
      field: "rating",
      placeholder: "Expert Trader rating",
      info: "",
    },

  ];



  if (!isData || !isData._id) return null;



  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: color.background,
        padding: "20px"
      }}
    >

      <div
        style={{
          backgroundColor: color.background,
          width: "100%",
          maxWidth: "600px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          padding: "20px"
        }}
      >

        <form
          style={{
            display: "grid",
            gap: "15px"
          }}
          onSubmit={submitHandler}
        >

          {formFields.map(({ label, field, placeholder, info }) => (

            <div
              key={field}
              style={{
                display: "flex",
                flexDirection: "column"
              }}
            >

              <label
                style={{
                  fontSize: "14px",
                  color: "#555",
                  marginBottom: "5px"
                }}
              >
                {label}
              </label>

              <input
                type="text"
                placeholder={placeholder}
                value={isData[field] || ""}
                onChange={(e) => handleChangeHandler(e, field)}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  outline: "none"
                }}
              />

              {info && <p className={styles.info}>{info}</p>}

            </div>

          ))}



          {/* PHOTO */}

          <div style={{ display: "flex", flexDirection: "column" }}>

            <label
              style={{
                fontSize: "14px",
                color: "#555",
                marginBottom: "5px"
              }}
            >
              Expert Trader Photo
            </label>

            {photoPreview && (
              <img
                src={photoPreview}
                alt="Trader Preview"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  marginBottom: "10px"
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
            disabled={isLoading}
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
              marginTop: "10px"
            }}
          >
            {isLoading ? "Uploading..." : "Update Trader"}
          </button>

        </form>

      </div>

    </div>

  );

};