import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  showFooterLinks?: boolean;
  headerRightContent?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  title, 
  showFooterLinks = true,
  headerRightContent 
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={title} rightContent={headerRightContent} />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer showAll={showFooterLinks} />
    </div>
  );
};

export default AppLayout; 