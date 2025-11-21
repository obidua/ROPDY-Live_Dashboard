import React from 'react';

const StatCard = ({ label, value }) => (
  <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-lg border border-admin-new-green/30 hover:border-admin-new-green hover:shadow-xl hover:shadow-admin-new-green/20 transition-all duration-300">
    <div className="flex items-center justify-between gap-2">
      <h3 className="text-xs sm:text-sm text-admin-cyan dark:text-admin-cyan-dark whitespace-nowrap">{label}</h3>
      <p className="text-sm sm:text-lg font-bold text-gray-900 dark:text-gray-100 text-right">{value}</p>
    </div>
  </div>
);

export default StatCard;