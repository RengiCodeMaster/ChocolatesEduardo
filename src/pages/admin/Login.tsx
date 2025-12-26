import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Debug config
    console.log("Supabase Config Check:", !!import.meta.env.VITE_SUPABASE_URL);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("Login Error:", error);
      alert(`Error de autenticación: ${error.message}`);
      setLoading(false);
    } else {
      console.log("Login Success:", data);
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-cacao-900 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-serif font-bold text-center mb-6 text-cacao-900">Admin Access</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gold-500 text-cacao-900 py-3 font-bold hover:bg-gold-400 transition-colors">
            {loading ? 'Entrando...' : 'INGRESAR'}
          </button>
        </form>
      </div>
    </div>
  );
};
