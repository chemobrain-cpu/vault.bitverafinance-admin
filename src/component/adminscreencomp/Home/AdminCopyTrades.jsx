import React, { useState, useEffect } from "react";
import styles from "../../common/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteCopyTrade, fetchCopyTrade } from "../../../store/action/userAppStorage";
import { Loader } from "../../common/HomeLoader";
import { useNavigate } from "react-router-dom";
import { Error } from "../../common/Error";

export const AdminCopyTrades = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [copyTradeList, setCopyTradeList] = useState([]);
  const [filteredCopyTradeList, setFilteredCopyTradeList] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { color } = useSelector((state) => state.userAuth);

  useEffect(() => {
    fetchAllCopyTrades();
  }, []);

  const fetchAllCopyTrades = async () => {
    setIsError(false);

    const res = await dispatch(fetchCopyTrade());

    if (!res.bool) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    setCopyTradeList(res.message);
    setFilteredCopyTradeList(res.message);
    setIsLoading(false);
  };

  const editHandler = (id) => {
    navigate(`/admindashboard/edit-copy-trade/${id}`);
  };

  const deleteHandler = async (id) => {
    setIsError(false);

    const res = await dispatch(deleteCopyTrade(id));

    if (!res.bool) {
      setIsError(true);
      return;
    }

    const filteredArray = copyTradeList.filter((data) => data._id !== id);

    setCopyTradeList(filteredArray);
    setFilteredCopyTradeList(filteredArray);
  };

  const searchHandler = (e) => {
    const text = e.target.value.toLowerCase();

    const newData = filteredCopyTradeList.filter((item) => {
      const traderName = item.traderName
        ? item.traderName.toLowerCase()
        : "";

      return traderName.indexOf(text) > -1;
    });

    setCopyTradeList(newData);
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <>

      {/* SEARCH */}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
          padding: "0 15px"
        }}
      >
        <input
          placeholder="Search trader name"
          onChange={searchHandler}
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "14px 18px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            outline: "none",
            fontSize: "15px"
          }}
        />
      </div>

      <div
        className={styles.homeScreen}
        style={{
          backgroundColor: color.background,
          padding: "20px",
          width: "100%",
          boxSizing: "border-box"
        }}
      >

        {copyTradeList.length === 0 ? (

          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#9ca3af",
              fontSize: "16px"
            }}
          >
            No Copy Traders Available
          </div>

        ) : (

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "22px",
              width: "100%"
            }}
          >

            {copyTradeList.map((data) => (

              <div
                key={data._id}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "20px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                  transition: "0.3s",
                  width: "100%",
                  boxSizing: "border-box"
                }}
              >

                {/* TRADER HEADER */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    flexWrap: "wrap"
                  }}
                >

                  <img
                    src={data.traderPhotoUrl}
                    alt="trader"
                    style={{
                      width: "55px",
                      height: "55px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "12px"
                    }}
                  />

                  <div style={{ flex: 1, minWidth: "120px" }}>

                    <div
                      style={{
                        fontWeight: "700",
                        fontSize: "16px",
                        color: "#111827",
                        wordBreak: "break-word"
                      }}
                    >
                      {data.traderName}
                    </div>

                    <div
                      style={{
                        fontSize: "13px",
                        color: "#6b7280"
                      }}
                    >
                      Tag: {data.traderTag}
                    </div>

                  </div>

                </div>

                {/* STATS */}

                <div
                  style={{
                    fontSize: "14px",
                    lineHeight: "24px",
                    color: "#374151"
                  }}
                >

                  <div><b>Followers:</b> {data.followers}</div>
                  <div><b>Total Profit:</b> ${data.totalProfit}</div>
                  <div><b>Winning Rate:</b> {data.winningRate}%</div>
                  <div><b>Active Days:</b> {data.activeDays}</div>
                  <div><b>Startup Amount:</b> ${data.startupAmount}</div>
                  <div><b>Type:</b> {data.copyTradeType}</div>

                  {/* ⭐ REAL STAR ICON */}

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <b>Rating:</b>
                    <span
                      className="material-icons"
                      style={{ color: "#f59e0b", fontSize: "18px" }}
                    >
                      star
                    </span>
                    {data.rating}
                  </div>

                </div>

                {/* ACTIONS */}

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "18px",
                    flexWrap: "wrap"
                  }}
                >

                  <button
                    onClick={() => editHandler(data._id)}
                    style={{
                      flex: 1,
                      minWidth: "100px",
                      background: "#4f46e5",
                      border: "none",
                      color: "#fff",
                      padding: "10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteHandler(data._id)}
                    style={{
                      flex: 1,
                      minWidth: "100px",
                      background: "#ef4444",
                      border: "none",
                      color: "#fff",
                      padding: "10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </>
  );
};