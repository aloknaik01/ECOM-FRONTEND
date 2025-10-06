import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, fetchUserProfile } from '../store/authSlice.js';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const DEMO_CREDENTIALS = {
  email: 'john@mail.com',
  password: 'changeme'
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isModalOpen]);

  // Close modal when clicking outside
  useEffect(() => {
    const onClickOutside = (e) => {
      if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        await dispatch(fetchUserProfile());
        navigate('/');
      } else {
        alert('Login failed! Check credentials.');
      }
    } catch (err) {
      alert('Login error! Try again.');
    }
  };

  const openDemoModal = () => {
    setCopied(false);
    setIsModalOpen(true);
  };

  const copyDemoToClipboard = async () => {
    const text = JSON.stringify(DEMO_CREDENTIALS, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      // fallback
      setCopied(false);
      alert('Unable to copy to clipboard.');
    }
  };

  const useDemoCredentials = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setIsModalOpen(false);
  };

  return (
    <div className="login-page">
      <div className="login-card" role="main" aria-labelledby="login-heading">
        <h2 id="login-heading" className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Log in to access your account</p>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={authStatus === 'loading'}
            className="login-btn"
            aria-busy={authStatus === 'loading'}
          >
            {authStatus === 'loading' ? 'Logging in...' : 'Login'}
          </button>

          {authError && <p className="error-text" role="alert">{authError}</p>}
        </form>

        <div className="login-actions">
          <button
            type="button"
            className="demo-btn"
            onClick={openDemoModal}
            aria-haspopup="dialog"
            aria-expanded={isModalOpen}
          >
            Show Demo Credentials
          </button>

          <p className="login-footer">
            Don’t have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" role="presentation" aria-hidden={!isModalOpen}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            ref={modalRef}
          >
            <div className="modal-header">
              <h3 id="demo-modal-title">Demo Credentials</h3>
              <button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close demo credentials"
              >
                ×
              </button>
            </div>

            <pre className="modal-body">
{`{
  "email": "john@mail.com",
  "password": "changeme"
}`}
            </pre>

            <div className="modal-footer">
              <button className="modal-copy" onClick={copyDemoToClipboard}>
                {copied ? 'Copied!' : 'Copy'}
              </button>

              <button className="modal-use" onClick={useDemoCredentials}>
                Use credentials
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
