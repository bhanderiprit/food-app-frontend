import React, { useState } from 'react';
import '../../../css/auth.css';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FoodPartnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { loading, handelFoodPartnerLogin } = useAuth();

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await handelFoodPartnerLogin({
        email,
        password,
      });

      const foodPartnerId = data.foodPartner.id;

      navigate(`/food-partner-profile/${foodPartnerId}`);
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message || 'Login Failed'
      );
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Food Partner Login</h2>

        <form onSubmit={handelSubmit}>
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
              className="password-eye"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>

          <button
            className="btn"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Don't have a Food Partner account?{' '}
            <Link to="/food-partner/register">
              Register Here
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

export default FoodPartnerLogin;