import React, { useState } from 'react';
import '../../../css/auth.css';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const UserRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, handelUserRegister } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handelUserRegister({
        username,
        email,
        password,
      });

      navigate('/user/verifyEmail');
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || 'Registration Failed');
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="page">
      <div className="card">
        <h2>User Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

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

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <button type="submit" className="btn">
            Register
          </button>
        </form>

        <div className="auth-links">
          <p>
            Already have an account?{' '}
            <Link to="/user/login">Login Here</Link>
          </p>

          <p>
            Food Partner?{' '}
            <Link to="/foodpartner/register">Register</Link>
          </p>

          <p>
            Already a Food Partner?{' '}
            <Link to="/foodpartner/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;