import React, { useState } from 'react';
import '../../../css/auth.css';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handelUserLogin, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_API_URL);
    

    try {
      await handelUserLogin({ email, password });
      navigate('/feed');
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>User Login</h2>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

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