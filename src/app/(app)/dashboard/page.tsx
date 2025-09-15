import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, CalendarCheck, Library, MessageSquare, ShieldAlert, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import UpcomingAppointments from "@/components/dashboard/upcoming-appointments";
import MoodCheckin from "@/components/dashboard/mood-checkin";

const bookingImage = PlaceHolderImages.find(img => img.id === 'booking-card');
const resourcesImage = PlaceHolderImages.find(img => img.id === 'resources-card');
const forumsImage = PlaceHolderImages.find(img => img.id === 'forums-card');
const profileImage = PlaceHolderImages.find(img => img.id === 'profile-card');

export default async function DashboardPage() {

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold">
            Welcome, Student
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Your confidential space for mental wellness and support.
          </p>
        </div>
        <Button variant="destructive" size="lg" asChild>
          <Link href="/urgent-support">
            <ShieldAlert className="mr-2 h-5 w-5" />
            Urgent Support
          </Link>
        </Button>
      </div>

      <MoodCheckin />
      <UpcomingAppointments />

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2"><Bot className="text-primary"/>AI-Guided First-Aid</CardTitle>
          <CardDescription>
            Feeling overwhelmed, anxious, or just not like yourself? Start a conversation with our friendly AI assistant. It can help you understand what you're feeling and provide you with actionable steps to start feeling better. It's completely confidential and available 24/7.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/ai-support">
              Start a Session <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          {bookingImage && 
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <Image 
                src={bookingImage.imageUrl} 
                alt={bookingImage.description} 
                width={400} 
                height={250} 
                className="w-full h-full object-cover"
                data-ai-hint={bookingImage.imageHint}
              />
            </div>
          }
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><CalendarCheck className="text-primary"/>Confidential Booking</CardTitle>
            <CardDescription>Schedule a private session with a professional college counselor.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" asChild>
              <Link href="/booking">Browse Counselors</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          {resourcesImage && 
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <Image 
                src={resourcesImage.imageUrl} 
                alt={resourcesImage.description} 
                width={400} 
                height={250} 
                className="w-full h-full object-cover"
                data-ai-hint={resourcesImage.imageHint}
              />
            </div>
          }
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Library className="text-primary"/>Resource Hub</CardTitle>
            <CardDescription>Explore articles, videos, and guides on mental wellness topics.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" asChild>
              <Link href="/resources">Explore Resources</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          {forumsImage && 
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <Image 
                src={forumsImage.imageUrl} 
                alt={forumsImage.description} 
                width={400} 
                height={250} 
                className="w-full h-full object-cover"
                data-ai-hint={forumsImage.imageHint}
              />
            </div>
          }
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><MessageSquare className="text-primary"/>Peer Support Forums</CardTitle>
            <CardDescription>Connect with others in a safe, anonymous discussion space.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" asChild>
              <Link href="/forums">Join the Discussion</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          {profileImage && 
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <Image 
                src={profileImage.imageUrl} 
                alt={profileImage.description} 
                width={400} 
                height={250} 
                className="w-full h-full object-cover"
                data-ai-hint={profileImage.imageHint}
              />
            </div>
          }
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><User className="text-primary"/>Your Profile</CardTitle>
            <CardDescription>Manage your public profile, settings, and preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" asChild>
              <Link href="/profile">View Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
