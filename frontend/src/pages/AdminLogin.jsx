import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiUser, FiAlertCircle } from 'react-icons/fi';

const API_BASE = `https://oceanicdeliverydumbbackend.vercel.app/api/admin-api`;

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE}/login/`, { username, password });
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', response.data.username);
      navigate('/kirikuadminman/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Admin Login</h1>
          <p className="text-slate-400">Secure access to Oceanic Delivery Management</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decoration */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl"></div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm animate-shake">
              <FiAlertCircle className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Username</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                  placeholder="Enter admin username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-xl shadow-slate-900/20 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : 'Login to Dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-slate-500 text-sm">
          Protected by enterprise-grade encryption
        </p>
      </div>
    </div>
  );
}
