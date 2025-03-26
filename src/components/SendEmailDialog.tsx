import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Loader2 } from "lucide-react";
import { sendEmail, SendEmailParams } from "@/lib/api-service";
import { toast } from "sonner";

interface SendEmailDialogProps {
  htmlContent: string;
}

export function SendEmailDialog({ htmlContent }: SendEmailDialogProps) {
  const [formData, setFormData] = useState<Omit<SendEmailParams, 'html'>>({
    to: '',
    subject: 'Newsletter',
    senderName: 'Newsletter Service',
  });
  const [isSending, setIsSending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSend = async () => {
    // Basic validation
    if (!formData.to) {
      toast.error('Please enter a recipient email address');
      return;
    }
    
    if (!formData.subject) {
      toast.error('Please enter an email subject');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.to)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSending(true);
    try {
      const result = await sendEmail({
        ...formData,
        html: htmlContent,
      });
      
      if (result.success) {
        toast.success('Email sent successfully');
        setIsOpen(false);
      } else {
        toast.error(result.message || 'Failed to send email');
      }
    } catch (error) {
      toast.error('An error occurred while sending the email');
      console.error('Send email error:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="gap-1">
          <Send className="h-4 w-4" />
          Send Email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Newsletter</DialogTitle>
          <DialogDescription>
            Send your newsletter to an email address.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="to" className="text-right">
              To
            </Label>
            <Input
              id="to"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="col-span-3"
              placeholder="recipient@example.com"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Newsletter Subject"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="senderName" className="text-right">
              From Name
            </Label>
            <Input
              id="senderName"
              name="senderName"
              value={formData.senderName}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Your Name or Company"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSend} disabled={isSending}>
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Newsletter"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 