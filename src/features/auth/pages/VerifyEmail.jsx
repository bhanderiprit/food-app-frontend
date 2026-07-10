import React, { useState } from 'react';
import '../../../css/auth.css';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const { loading, handelVerifyEmail } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handelVerifyEmail({ otp, id });
      navigate('/');
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message || 'Verification failed'
      );
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Verify Email</h2>

        <form onSubmit={handleSubmit}>
          <div
            className="form-group"
            style={{ position: 'relative' }}
          >
            <input
              type={showOtp ? 'text' : 'password'}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />

            <span
              onClick={() => setShowOtp(!showOtp)}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#888',
                fontSize: '18px'
              }}
            >
              {showOtp ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="btn">
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;