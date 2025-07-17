import React, { type ReactNode } from 'react';

const Callout = ({
  type,
  children,
}: {
  type: 'tip' | 'warning' | 'danger';
  children: ReactNode;
}) => {
  const base = {
    tip: 'bg-blue-50 text-blue-900 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
    danger: 'bg-red-50 text-red-900 border-red-200',
  }[type];

  return (
    <div className={`callout mt-4 flex items-start gap-2 rounded-md border-l-4 p-4 ${base}`}>
      <span className="text-lg font-medium">
        {type === 'tip' ? '💡' : type === 'warning' ? '⚠️' : '🚨'}
      </span>
      <div>{children}</div>
    </div>
  );
};

export default Callout;
