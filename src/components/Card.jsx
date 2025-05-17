import React from 'react';

const colorMap = {
  indigo: 'text-indigo-800 bg-indigo-50 border-indigo-200',
  emerald: 'text-emerald-800 bg-emerald-50 border-emerald-200',
  amber: 'text-amber-800 bg-amber-50 border-amber-200',
  rose: 'text-rose-800 bg-rose-50 border-rose-200',
  blue: 'text-blue-800 bg-blue-50 border-blue-200',
  green: 'text-green-800 bg-green-50 border-green-200',
  red: 'text-red-800 bg-red-50 border-red-200',
  purple: 'text-purple-800 bg-purple-50 border-purple-200',
};

export const Card = ({ title, value, color, icon, subtitle, percentage }) => (
  <div className={`${colorMap[color] || ''} p-5 rounded-lg shadow-sm border flex flex-col h-full transition-all duration-300 hover:shadow-md`}>
    <div className="flex justify-between items-start mb-3">
      <div className={`p-2 rounded-lg ${color === 'indigo' ? 'bg-indigo-100' : 
                                        color === 'emerald' ? 'bg-emerald-100' : 
                                        color === 'amber' ? 'bg-amber-100' : 
                                        color === 'rose' ? 'bg-rose-100' : 'bg-gray-100'}`}>
        {icon}
      </div>
      
      {percentage !== undefined && (
        <div className={`px-2 py-1 rounded-full text-xs font-medium
          ${percentage > 50 ? 'bg-green-100 text-green-800' : 
           percentage > 25 ? 'bg-amber-100 text-amber-800' : 
           'bg-red-100 text-red-800'}`}>
          {percentage}%
        </div>
      )}
    </div>
    
    <div className="mt-1">
      <p className="text-4xl font-bold">{value}</p>
      <h3 className="text-lg font-medium capitalize">{title}</h3>
      
      {subtitle && (
        <p className="text-sm mt-1 opacity-80">{subtitle}</p>
      )}
    </div>
  </div>
);