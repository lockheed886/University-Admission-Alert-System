'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const SECRET_CODE = 'AbdullahCheemaGenAI';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (code === SECRET_CODE) {
      // Store auth status in sessionStorage
      sessionStorage.setItem('authenticated', 'true');
      router.push('/');
    } else {
      setError('Invalid secret code. Please try again.');
      setCode('');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Airplane Emoji - Large and Beautiful */}
        <div className="text-center mb-8 animate-bounce">
          <div className="text-9xl mb-4 drop-shadow-lg">✈️</div>
          <div className="absolute top-0 left-1/4 text-4xl opacity-50">✈️</div>
          <div className="absolute top-8 right-1/4 text-3xl opacity-40">✈️</div>
        </div>

        {/* Card Container */}
        <div className="bg-gradient-to-br from-emerald-800 to-teal-800 rounded-3xl shadow-2xl p-8 md:p-10 backdrop-blur-xl border border-emerald-600 border-opacity-50">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-emerald-100 text-lg font-light">
              University Admission Alert System
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto mt-4"></div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-400 border-opacity-50 rounded-xl text-red-100 text-sm font-medium animate-pulse">
              <span className="mr-2">⚠️</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Secret Code Input */}
            <div>
              <label className="block text-emerald-100 font-semibold mb-3 text-sm uppercase tracking-wider">
                🔐 Secret Code
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter your secret code..."
                  className="w-full px-6 py-4 bg-emerald-900 bg-opacity-50 border-2 border-emerald-500 border-opacity-50 rounded-2xl text-white placeholder-emerald-300 placeholder-opacity-70 focus:outline-none focus:border-emerald-300 focus:bg-opacity-75 transition-all duration-300 font-medium text-lg"
                  disabled={loading}
                />
                {/* Toggle Password Visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-300 hover:text-emerald-100 transition-colors"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !code}
              className="w-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 disabled:from-emerald-600 disabled:to-teal-600 text-emerald-950 font-bold py-4 px-6 rounded-2xl transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  🚀 Enter System
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-emerald-600 bg-opacity-50"></div>
            <span className="text-emerald-300 text-xs font-semibold uppercase">Secure Access</span>
            <div className="flex-1 h-px bg-emerald-600 bg-opacity-50"></div>
          </div>

          {/* Info Text */}
          <div className="bg-emerald-900 bg-opacity-30 border border-emerald-500 border-opacity-30 rounded-xl p-4">
            <p className="text-emerald-100 text-center text-sm">
              🔒 This is a secure access portal. Please enter the correct secret code to proceed.
            </p>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8 text-emerald-200 text-sm font-light">
          <p>✨ Powered by Abdullah Cheema GenAI</p>
        </div>
      </div>

      {/* Floating Airplane Decoration */}
      <div className="fixed top-10 right-10 text-6xl opacity-20 animate-float">✈️</div>
      <div className="fixed bottom-20 left-10 text-5xl opacity-15 animate-float animation-delay-3000">✈️</div>
    </div>
  );
}
