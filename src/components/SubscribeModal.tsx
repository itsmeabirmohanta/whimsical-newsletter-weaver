
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface SubscribeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubscribeModal = ({ open, onOpenChange }: SubscribeModalProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Successfully subscribed!');
      
      // Reset after 2 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
        onOpenChange(false);
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-medium">
            Join our newsletter
          </DialogTitle>
          <DialogDescription className="text-center">
            Get the latest updates delivered directly to your inbox.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Subscription confirmed</h3>
              <p className="mt-2 text-sm text-gray-500">
                Thank you for subscribing to our newsletter!
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeModal;
