import React, { useEffect } from 'react';
import { FaShip } from 'react-icons/fa';

const SplashPage = () => {
  // Disable scroll when splash is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-slate-900 flex flex-col items-center justify-center text-white p-4 touch-none overscroll-none">
      <style>
        {`
          @keyframes heartbeat {
            0% { transform: scale(1); }
            14% { transform: scale(1.15); }
            28% { transform: scale(1); }
            42% { transform: scale(1.15); }
            70% { transform: scale(1); }
          }
          .animate-heartbeat {
            animation: heartbeat 1.5s infinite ease-in-out;
          }
        `}
      </style>
      
      <div className="relative mb-12">
        {/* Ripple Effects */}
        <div className="absolute inset-0 w-32 h-32 bg-primary-500 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-0 w-32 h-32 bg-primary-500 rounded-full animate-ping opacity-10" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute inset-0 w-32 h-32 bg-primary-500 rounded-full animate-ping opacity-5" style={{ animationDelay: '1s' }}></div>
        
        {/* Icon Container */}
        <div className="w-32 h-32 rounded-full border-4 border-primary-500/20 flex items-center justify-center relative z-10 bg-slate-800/30 backdrop-blur-sm shadow-2xl shadow-primary-500/20">
          <FaShip className="w-14 h-14 text-primary-500 animate-heartbeat" />
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-3xl font-heading font-bold mb-4 tracking-tight">Locating Your Shipment</h2>
        <p className="text-slate-400 text-lg">
          Syncing with global tracking satellites
          <span className="inline-flex w-8 ml-1">
            <span className="animate-bounce delay-0">.</span>
            <span className="animate-bounce delay-150">.</span>
            <span className="animate-bounce delay-300">.</span>
          </span>
        </p>
      </div>
      
      {/* Ocean waves effect at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-12 text-primary-500/10" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.11,101.48,121,102.23,177.75,94.65c56.76-7.58,110.14-25.93,163.64-41.21Z" fill="currentColor"></path>
        </svg>
      </div>
    </div>
  );
};

export default SplashPage;
