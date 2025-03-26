import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';

const NotFound: React.FC = () => {
  return (
    <AppLayout title="Page Not Found">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-8">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild size="lg">
          <Link to="/">
            Return to Homepage
          </Link>
        </Button>
      </div>
    </AppLayout>
  );
};

export default NotFound;
