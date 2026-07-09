import React, { useState } from 'react';
import '../../../css/auth.css';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const FoodPartnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { loading, handelFoodPartnerLogin } = useAuth();

  async function handelSubmit(e) {
    e.preventDefault();

    try {
      const data = await handelFoodPartnerLogin({
        email,
        password,
      });
      const FoodPartnerId = data.data.foodPartner.id

      console.log(data);
      navigate(`/food-partner-profile/${FoodPartnerId}`);
    } catch (error) {
      console.log(error, 'failed to login');

      alert(
        error?.response?.data?.message || 'Login Failed'
      );
    }
  }

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
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn" type="submit">
            Login
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