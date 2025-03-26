import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';
import { SendEmailDialog } from '@/components/SendEmailDialog';

const NewsletterPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [iframeKey, setIframeKey] = useState<number>(0);

  useEffect(() => {
    // Get the HTML content from location state
    if (location.state?.htmlContent) {
      setHtmlContent(location.state.htmlContent);
    } else {
      // If no HTML content is provided, redirect to the builder
      navigate('/');
    }
  }, [location.state, navigate]);

  // Function to reload iframe when content changes
  const reloadIframe = () => {
    setIframeKey(prevKey => prevKey + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex justify-between w-full">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Editor
            </Button>
            <div className="flex items-center gap-2">
              <SendEmailDialog htmlContent={htmlContent} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="p-2 bg-muted flex items-center justify-between">
            <h2 className="text-sm font-medium">Newsletter Preview</h2>
            <Button variant="outline" size="sm" onClick={reloadIframe}>
              Refresh Preview
            </Button>
          </div>
          
          <div className="p-4">
            <iframe
              key={iframeKey}
              srcDoc={htmlContent}
              title="Newsletter Preview"
              className="w-full min-h-[800px] border"
              sandbox="allow-same-origin"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsletterPreview; 