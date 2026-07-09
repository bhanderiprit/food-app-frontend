import React, { useState } from 'react';
import '../../../css/auth.css';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const {loading,handelVerifyEmail} = useAuth()
  const navigate = useNavigate() 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log({
        email,
        otp,
      });

      const data = await handelVerifyEmail({email,otp})
      
      navigate('/')


    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message || 'Verification failed'
      );
    }
  };

  if(loading){
    return <h1>loading....</h1>
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Verify Email</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />
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