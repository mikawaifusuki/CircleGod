import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  footer?: React.ReactNode;
  headerAction?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  footer,
  headerAction,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      {(title || headerAction) && (
        <div className="px-4 py-3 sm:px-6 border-b border-gray-200 flex justify-between items-center">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="px-4 py-5 sm:p-6">{children}</div>
      {footer && (
        <div className="px-4 py-3 sm:px-6 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 