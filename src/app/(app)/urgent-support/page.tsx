import { Phone, MessageSquareText, Globe } from 'lucide-react';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';

const emergencyResources = [
  {
    name: 'National Suicide Prevention Lifeline',
    contact: '988',
    description: '24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.',
    type: 'phone',
    icon: Phone,
    href: 'tel:988'
  },
  {
    name: 'Crisis Text Line',
    contact: 'Text HOME to 741741',
    description: 'Connect with a crisis counselor for free, 24/7 support. Text from anywhere in the US.',
    type: 'text',
    icon: MessageSquareText,
    href: 'sms:741741'
  },
  {
    name: 'The Trevor Project',
    contact: '1-866-488-7386',
    description: 'A national 24-hour, toll-free confidential suicide hotline for LGBTQ youth.',
    type: 'phone',
    icon: Phone,
    href: 'tel:1-866-488-7386'
  },
  {
    name: 'Befrienders Worldwide',
    contact: 'Visit Website',
    description: 'A global network of emotional support centers for people in distress. Find a helpline in your country.',
    type: 'web',
    icon: Globe,
    href: 'https://www.befrienders.org/'
  }
];

export default function UrgentSupportPage() {
  return (
    <div>
      <PageHeader
        title="Urgent Support"
        description="Your safety is the top priority. If you are in immediate danger or crisis, please use the resources below."
      />

      <Alert variant="destructive" className="mb-8">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>If this is an emergency, please act now.</AlertTitle>
        <AlertDescription>
          If you or someone you know is in immediate danger of harming themselves or others, please call 911 or your local emergency number right away.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {emergencyResources.map((resource) => {
          const { icon: Icon } = resource;
          return (
            <Card key={resource.name} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-headline text-xl mb-1">{resource.name}</CardTitle>
                    <p className="text-lg font-semibold text-primary">{resource.contact}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <p className="text-muted-foreground mb-4">{resource.description}</p>
                <Button asChild className="w-full">
                  <Link href={resource.href} target="_blank" rel="noopener noreferrer">
                    {resource.type === 'phone' && 'Call Now'}
                    {resource.type === 'text' && 'Text Now'}
                    {resource.type === 'web' && 'Visit Website'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
       <div className="mt-8 text-center text-muted-foreground text-sm">
          <p>The resources listed here are for immediate support. For ongoing concerns, please consider scheduling an appointment with a college counselor through the <Link href="/booking" className="underline text-primary">booking page</Link>.</p>
      </div>
    </div>
  );
}
