import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  showSidebar = true,
}) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {showSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {title && (
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 