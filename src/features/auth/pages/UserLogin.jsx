import React, { useState } from 'react';
import '../../../css/auth.css';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ReelSkeleton from '../components/ReelSkeleton';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { handelUserLogin, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handelUserLogin({ email, password });
      navigate('/');
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || 'Login failed');
    }
  };

  

  return (
    <div className="page">
      <div className="card">
        <h2>User Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div
            className="form-group"
            style={{ position: 'relative' }}
          >
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
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
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Don't have a User account?{' '}
            <Link to="/user/register">Register Here</Link>
          </p>

          <p>
            Food Partner?{' '}
            <Link to="/food-partner/register">Register</Link>
          </p>

          <p>
            Already a Food Partner?{' '}
            <Link to="/food-partner/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;