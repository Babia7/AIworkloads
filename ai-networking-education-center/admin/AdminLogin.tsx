
import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0F1117] to-[#0F1117]">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div className="text-center mb-8">
          <div className="inline-block p-6 bg-slate-800/50 rounded-2xl mb-4 text-blue-400 ring-1 ring-white/10 shadow-xl">
            <Lock size={40} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Restricted Area</h3>
          <p className="text-slate-400">Authentication is required to edit application data.</p>
        </div>
        <div className="space-y-4">
          <input 
              type="password" 
              placeholder="Enter PIN" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#0d1117] border border-white/10 rounded-xl px-4 py-4 text-white text-center text-xl tracking-[0.5em] focus:border-blue-500 outline-none transition-all focus:ring-1 focus:ring-blue-500"
              autoFocus
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25">
              Authenticate
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
