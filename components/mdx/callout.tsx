import React, { type ReactNode } from 'react';

const Callout = ({
  type,
  children,
}: {
  type: 'tip' | 'warning' | 'danger';
  children: ReactNode;
}) => {
  const base = {
    tip: 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-900',
    warning:
      'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-900',
    danger:
      'bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200 border-red-200 dark:border-red-900',
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
