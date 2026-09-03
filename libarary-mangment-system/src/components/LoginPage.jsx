import { useState } from 'react';

const VALID_STUDENT_ID = '23BCS10289';
const VALID_PASSWORD = '10289';

function LoginPage({ onLogin, onBack }) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!studentId.trim() || !password.trim()) {
      return;
    }

    const normalizedStudentId = studentId.trim().toUpperCase();
    const normalizedPassword = password.trim();

    if (normalizedStudentId !== VALID_STUDENT_ID || normalizedPassword !== VALID_PASSWORD) {
      setError('Invalid Student ID or Password');
      return;
    }

    setError('');
    onLogin({ studentId: normalizedStudentId });
  };

  return (
    <main className="login-page">
      <button 
        className="btn-back-login"
        onClick={onBack}
        title="Go back to landing page"
      >
        ← Back
      </button>
      <div className="login-card">
        <h1 className="login-title">Student Login</h1>
        <p className="login-subtitle">
          Sign in to access your library dashboard
          <br />
          Manage books and track your activity
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="studentId">👤 Student ID / Username</label>
          <input
            id="studentId"
            name="studentId"
            type="text"
            placeholder="Enter your student ID"
            value={studentId}
            onChange={(event) => {
              setStudentId(event.target.value);
              if (error) {
                setError('');
              }
            }}
            required
          />

          <label htmlFor="password">🔒 Password</label>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) {
                setError('');
              }
            }}
            required
          />

          <label className="toggle-row" htmlFor="showPassword">
            <input
              id="showPassword"
              type="checkbox"
              checked={showPassword}
              onChange={(event) => setShowPassword(event.target.checked)}
            />
            <span>Show password</span>
          </label>

          <div className="login-options">
            <label className="toggle-row" htmlFor="rememberMe">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span>Remember Me</span>
            </label>
            <a href="#" className="login-link">
              Forgot Password?
            </a>
          </div>

          <button className="btn btn-primary login-submit" type="submit">
            Sign In
          </button>
          {error ? <p className="login-error">{error}</p> : null}

          <div className="login-extra-links">
            <p>
              Don&apos;t have an account? <a href="#" className="login-link">Register</a>
            </p>
            <p>
              Need help? <a href="#" className="login-link">Contact Library</a>
            </p>
          </div>

          <div className="login-security" aria-live="polite">
            <p>🔐 Your information is secure and protected.</p>
            <p>✔ Secure login</p>
            <p>✔ Privacy protected</p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;