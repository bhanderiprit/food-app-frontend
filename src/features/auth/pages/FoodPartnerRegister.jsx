import React, { useState } from 'react';
import '../../../css/auth.css';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FoodPartnerRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const { handleFoodPartnerRegister, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }

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

          {/* Password */}
          <div
            className="form-group"
            style={{ position: 'relative' }}
          >
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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

          {/* Confirm Password */}
          <div
            className="form-group"
            style={{ position: 'relative' }}
          >
            <input
              type={
                showConfirmPassword
                  ? 'text'
                  : 'password'
              }
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              autoComplete="new-password"
              required
            />

            <span
              className="password-eye"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>

          {confirmPassword &&
            password !== confirmPassword && (
              <p
                style={{
                  color: 'red',
                  fontSize: '14px',
                  marginBottom: '12px',
                }}
              >
                Passwords do not match
              </p>
            )}

          <button
            type="submit"
            className="btn"
            disabled={loading}
          >
            {loading
              ? 'Registering...'
              : 'Register'}
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