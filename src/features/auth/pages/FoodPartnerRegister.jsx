import React, { useState } from 'react';
import '../../../css/auth.css';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const FoodPartnerRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleFoodPartnerRegister, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleFoodPartnerRegister({
        name,
        email,
        password,
      });

      navigate('/food-partner/create-food');
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          'Registration failed'
      );
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Food Partner Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Restaurant Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="organization"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Business Email"
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

          <button
            type="submit"
            className="btn"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Already a Food Partner?{' '}
            <Link to="/food-partner/login">
              Login Here
            </Link>
          </p>

          <p>
            User Login?{' '}
            <Link to="/user/login">
              Login Here
            </Link>
          </p>

          <p>
            New User?{' '}
            <Link to="/user/register">
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;