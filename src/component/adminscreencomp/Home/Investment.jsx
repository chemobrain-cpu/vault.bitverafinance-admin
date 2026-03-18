import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvestments, deleteInvestment } from '../../../store/action/userAppStorage';
import { Loader } from '../../common/HomeLoader';
import { Error } from '../../common/Error';
import { useNavigate } from 'react-router-dom';

export const AdminInvestComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [investments, setInvestments] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { color } = useSelector(state => state.userAuth);

  useEffect(() => {
    loadInvestments();
  }, []);

  const loadInvestments = async () => {
    setIsError(false);
    const res = await dispatch(fetchInvestments());
    if (!res.bool) {
      setIsError(true);
      setIsLoading(false);
      return;
    }
    setInvestments(res.message);
    setFilteredInvestments(res.message);
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    setIsError(false);
    const res = await dispatch(deleteInvestment(id));
    if (!res.bool) {
      setIsError(true);
      setIsLoading(false);
      return;
    }
    const updated = investments.filter(item => item._id !== id);
    setInvestments(updated);
    setFilteredInvestments(updated);
  };

  const handleEdit = (id) => {
    navigate(`/admindashboard/investments/${id}`);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = filteredInvestments.filter(item =>
      item.user?.email?.toLowerCase().includes(query)
    );
    setInvestments(filtered);
  };

  const handleCreate = () => {
    navigate('/admindashboard/investment');
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
      <div className={styles.timeline}>
        {/* Search and Create */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#f5f7fa',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
          }}>
            <input
              type="text"
              placeholder="Search by email"
              onChange={handleSearch}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                background: 'transparent',
                color: '#333',
              }}
            />
            <span className="material-icons" style={{ color: '#888' }}>search</span>
          </div>

        </div>

        {/* Table */}
        {investments.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '32px',
              backgroundColor: '#f9fafb',
              borderRadius: '10px',
              color: '#6b7280',
            }}
          >
            No investments found.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                minWidth: '1000px',
                borderCollapse: 'collapse',
                backgroundColor: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 18px rgba(0, 0, 0, 0.08)',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6', fontWeight: 600, textTransform: 'uppercase' }}>
                  {[
                    'User Email',
                    'Plan',
                    'Amount',
                    'Profit',
                    'Total Profit',
                    'Total Deposit',
                    'Referral Bonus',
                    'Date',
                    'Active',
                    'Delete',
                    'Edit',
                  ].map((header, idx) => (
                    <th key={idx} style={{ padding: '16px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {investments.map(item => (
                  <tr key={item._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '16px', textAlign: 'center' }}>{item.user?.email}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>{item.investmentPlan}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>${item.amount}</td>
                    <td style={{ padding: '16px', textAlign: 'center', color: '#10b981' }}>${item.profit}</td>
                    <td style={{ padding: '16px', textAlign: 'center', color: '#10b981' }}>${item.totalProfit}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>${item.totalDeposit}</td>
                    <td style={{ padding: '16px', textAlign: 'center', color: '#f59e0b' }}>${item.referralBonus}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>{new Date(item.date).toLocaleDateString()}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      {item.isActive ? '✅' : '❌'}
                    </td>
                    <td
                      onClick={() => handleDelete(item._id)}
                      style={{ cursor: 'pointer', textAlign: 'center' }}
                    >
                      <span className="material-icons" style={{ color: '#ef4444' }}>delete</span>
                    </td>
                    <td
                      onClick={() => handleEdit(item._id)}
                      style={{ cursor: 'pointer', textAlign: 'center' }}
                    >
                      <span className="material-icons" style={{ color: '#3b82f6' }}>edit</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

