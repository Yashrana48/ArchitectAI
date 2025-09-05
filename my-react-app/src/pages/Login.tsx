import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { authApi } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    
    try {
      const res = await authApi.login(form.email, form.password);
      if (res.success) {
        setMessage('Login successful! Redirecting to Dashboard...');
        setForm({ email: '', password: '' });
        
        // Store user info in context (includes user ID for API calls)
        login(res.user);
        
        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Login</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>
      {message && <div className="mt-4 text-green-600 text-center">{message}</div>}
      {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      <div className="mt-4 text-center text-sm">
        Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
      </div>
    </div>
  );
};

  export default Login;                 