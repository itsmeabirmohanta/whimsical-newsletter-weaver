import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { isValidEmail, checkEmailService } from '@/lib/email-service';
import { toast } from 'sonner';
import { NewsletterItem } from '@/pages/NewsletterBuilder';
import { AlertCircle } from 'lucide-react';

interface SendTestEmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSendEmail: (email: string) => Promise<void>;
  items?: NewsletterItem[]; // Optional items for showing info about the email
}

const SendTestEmailDialog: React.FC<SendTestEmailDialogProps> = ({
  isOpen,
  onClose,
  onSendEmail,
  items = []
}) => {
  const [email, setEmail] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<{
    available: boolean;
    configured: boolean;
    message: string;
  } | null>(null);
  const [isCheckingServer, setIsCheckingServer] = useState<boolean>(false);
  
  // Get email subject and sender info to display to user
  const firstHeading = items.find(item => item.type === 'heading');
  const header = items.find(item => item.type === 'header');
  const footer = items.find(item => item.type === 'footer');
  
  const emailSubject = firstHeading?.content?.text || 'Newsletter Preview';
  const senderName = header?.content?.companyName || footer?.content?.companyName || 'Whimsical Newsletter Weaver';
  
  // Reset state when dialog opens and check server status
  useEffect(() => {
    if (isOpen) {
      setError(null);
      
      // Check email server status
      const checkServer = async () => {
        setIsCheckingServer(true);
        try {
          const status = await checkEmailService();
          setServerStatus(status);
          
          if (!status.available) {
            setError('Email server is not available. Please make sure it is running.');
          } else if (!status.configured) {
            setError('Email server is running but not properly configured. Please check Gmail credentials.');
          }
        } catch (error) {
          console.error('Failed to check server status:', error);
          setError('Failed to connect to email server');
        } finally {
          setIsCheckingServer(false);
        }
      };
      
      checkServer();
    }
  }, [isOpen]);
  
  const handleDialogChange = (open: boolean) => {
    // Only call onClose when dialog is actually being closed
    if (!open && !isSending) {
      onClose();
    }
    // If sending is in progress, prevent dialog from closing
    return;
  };

  const handleSendClick = async () => {
    // Don't proceed if already sending
    if (isSending) return;
    
    // Clear previous errors
    setError(null);
    
    // Validate email
    if (!email) {
      setError('Please enter an email address');
      return;
    }
    
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Check if server is available
    if (serverStatus && !serverStatus.available) {
      setError('Email server is not available. Please make sure it is running.');
      return;
    }
    
    try {
      console.log('📧 Starting email send process...');
      setIsSending(true);
      await onSendEmail(email);
      console.log('✅ Email sent successfully, closing dialog');
      // Don't reset email here - keep it for next time
      // Close the dialog after sending
      onClose();
    } catch (error) {
      console.error('❌ Error sending test email:', error);
      setError(error instanceof Error ? error.message : 'Failed to send test email');
      toast.error('Failed to send test email');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Test Email</DialogTitle>
          <DialogDescription>
            Enter recipient email to preview this newsletter.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            {isCheckingServer ? (
              <div className="text-sm text-muted-foreground">Checking email server status...</div>
            ) : serverStatus && !serverStatus.available ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800">Email Server Not Available</p>
                  <p className="text-xs mt-1 text-yellow-700">
                    The email server is not running. Please start the server with <code className="bg-yellow-100 px-1 rounded">npm run server</code> in a separate terminal.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-2 h-7 text-xs"
                    onClick={async () => {
                      setIsCheckingServer(true);
                      setError(null);
                      try {
                        const status = await checkEmailService();
                        setServerStatus(status);
                        
                        if (!status.available) {
                          setError('Email server is still not available');
                        } else if (!status.configured) {
                          setError('Email server is running but not properly configured');
                        }
                      } catch (error) {
                        console.error('Failed to check server status:', error);
                        setError('Failed to connect to email server');
                      } finally {
                        setIsCheckingServer(false);
                      }
                    }}
                  >
                    Check Server Status
                  </Button>
                </div>
              </div>
            ) : serverStatus && !serverStatus.configured ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800">Email Server Not Configured</p>
                  <p className="text-xs mt-1 text-yellow-700">
                    The email server is running but Gmail credentials are missing. Please update the config.json file.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-2 h-7 text-xs"
                    onClick={async () => {
                      setIsCheckingServer(true);
                      setError(null);
                      try {
                        const status = await checkEmailService();
                        setServerStatus(status);
                        
                        if (!status.available) {
                          setError('Email server is not available');
                        } else if (!status.configured) {
                          setError('Email server is still not properly configured');
                        }
                      } catch (error) {
                        console.error('Failed to check server status:', error);
                        setError('Failed to connect to email server');
                      } finally {
                        setIsCheckingServer(false);
                      }
                    }}
                  >
                    Check Server Status
                  </Button>
                </div>
              </div>
            ) : null}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSending || (serverStatus && !serverStatus.available)}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            
            <div className="text-xs text-muted-foreground bg-muted p-3 rounded-md space-y-1">
              <p><span className="font-medium">From:</span> {senderName}</p>
              <p><span className="font-medium">Subject:</span> {emailSubject}</p>
              <p className="text-[11px] italic">The email will appear to be sent from {senderName}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={isSending}
            type="button"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSendClick} 
            disabled={isSending || (serverStatus && !serverStatus.available)}
            type="button"
          >
            {isSending ? 'Sending...' : 'Send Test Email'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendTestEmailDialog; 