import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="py-32 flex items-center justify-center bg-[#0F1117]">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-2 border-slate-800 rounded-full"></div>
        <div className="absolute inset-0 border-2 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;