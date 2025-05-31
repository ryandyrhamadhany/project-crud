import React from 'react';

export const ChartCard = ({ title, children, fullWidth, subtitle }) => (
  <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 ${fullWidth ? 'md:col-span-2' : ''} transition-all duration-300 hover:shadow-md`}>
    <div className="mb-5">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
    <div className="mt-2">
      {children}
    </div>
  </div>
);