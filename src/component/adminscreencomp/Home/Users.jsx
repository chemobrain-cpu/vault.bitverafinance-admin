import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsers } from '../../../store/action/userAppStorage';
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from '../../common/Error';

export const AdminUsersComponent = () => {
    const [isAuthError, setIsAuthError] = useState(false);
    const [authInfo, setAuthInfo] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { color } = useSelector((state) => state.userAuth);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        setIsError(false);
        const res = await dispatch(fetchUsers());
        if (!res.bool) {
            setIsError(true);
            setIsLoading(false);
            return;
        }
        setUserList(res.message);
        setFilteredUsers(res.message);
        setIsLoading(false);
    };

    const editHandler = (id) => navigate(`/admindashboard/users/${id}`);

    const deleteHandler = async (id) => {
        setIsError(false);
        const res = await dispatch(deleteUser(id));
        if (!res.bool) {
            setIsError(true);
            setIsLoading(false);
            return;
        }
        const filteredArray = userList.filter((data) => data._id !== id);
        setUserList(filteredArray);
        setFilteredUsers(filteredArray);
        setIsLoading(false);
    };

    const searchHandler = (e) => {
        setIsLoading(true);
        const value = e.target.value.toLowerCase();
        if (value) {
            const newData = filteredUsers.filter((item) =>
                (item.email || '').toLowerCase().includes(value)
            );
            setUserList(newData);
        } else {
            setUserList(filteredUsers);
        }
        setIsLoading(false);
    };

    if (isLoading) return <Loader />;

    const updateAuthError = () => {
        setIsAuthError((prev) => !prev);
        setAuthInfo('');
    };

    return (
        <>
            {isAuthError && <Error modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

            <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
                <div className={styles.timeline}>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '1rem 0',
                            backgroundColor: '#fff',
                            borderBottom: '1px solid #e0e6ed',
                            marginBottom: '1.5rem',
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                                display: 'flex',
                                alignItems: 'start',
                                background: '#f9fafb',
                                borderRadius: '10px',
                                padding: '0.6rem 1rem',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Search by email"
                                onChange={searchHandler}
                                style={{
                                    flex: 1,
                                    fontSize: '16px',
                                    padding: '0.4rem 0.6rem',
                                    border: 'none',
                                    outline: 'none',
                                    background: 'transparent',
                                    color: '#333',
                                }}
                            />
                            <span
                                className="material-icons"
                                style={{
                                    color: '#888',
                                    fontSize: '22px',
                                    marginLeft: '0.6rem',
                                    cursor: 'pointer',
                                    transition: 'color 0.2s ease',
                                }}
                                onMouseEnter={(e) => (e.target.style.color = '#333')}
                                onMouseLeave={(e) => (e.target.style.color = '#888')}
                            >
                                search
                            </span>
                        </div>
                    </div>


                    <div className={styles.tableContainer}>
                        {userList.length === 0 ? (
                            <div className={styles.emptyContainer}>
                                <p>No registered users</p>
                            </div>
                        ) : (
                            <table className={styles.table}>
                                <thead>
                                    <tr className={styles.tableHeaderRow}>
                                        {['Email', 'First Name', 'Country', '', ''].map((header, idx) => (
                                            <th key={idx} className={styles.tableHeaderCell}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList.map((data) => (
                                        <tr
                                            key={data._id}
                                            className={styles.tableRow}
                                            onMouseEnter={(e) => e.currentTarget.classList.add(styles.rowHover)}
                                            onMouseLeave={(e) => e.currentTarget.classList.remove(styles.rowHover)}
                                        >
                                            <td className={styles.tableCell}>
                                                {data.email?.length > 15 ? `${data.email.slice(0, 15)}...` : data.email}
                                            </td>
                                            <td className={styles.tableCell}>{data.firstName}</td>
                                            <td className={styles.tableCell}>{data.country}</td>
                                            <td className={`${styles.tableCell} ${styles.actionCell}`} onClick={() => deleteHandler(data._id)}>
                                                <span className="material-icons">delete</span>
                                            </td>
                                            <td className={`${styles.tableCell} ${styles.actionCell}`} onClick={() => editHandler(data._id)}>
                                                <span className="material-icons">edit</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div >
        </>
    );
};

