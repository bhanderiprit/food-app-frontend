import React, { useState } from 'react';
import '../../../css/auth.css';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const UserRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, handelUserRegister } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      const user = await handelUserRegister({
        username,
        email,
        password,
      });

      const id = user.user.id;

      navigate(`/user/verifyEmail/${id}`);
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
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#888'
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div
            className="form-group"
            style={{ position: 'relative' }}
          >
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              autoComplete="new-password"
              required
            />

            <span
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#888'
              }}
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
                  marginBottom: '10px',
                  fontSize: '14px'
                }}
              >
                Passwords do not match
              </p>
            )}

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
            <Link to="/food-partner/register">
              Register
            </Link>
          </p>

          <p>
            Already a Food Partner?{' '}
            <Link to="/food-partner/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;