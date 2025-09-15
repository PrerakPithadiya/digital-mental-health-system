

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter }from 'next/navigation';
import PageHeader from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { User, Calendar as CalendarIcon, Clock, CheckCircle, ArrowLeft, History } from "lucide-react";
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

// Mock data - in a real app, this would come from an API
const initialCounselors = [
  {
    id: "1",
    name: "Dr. Evelyn Reed",
    title: "Licensed Professional Counselor",
    imageId: "counselor-1",
    previouslyBooked: true,
    appointments: ["2024-06-20T14:00:00Z"]
  },
  {
    id: "2",
    name: "Mr. David Chen",
    title: "Clinical Social Worker",
    imageId: "counselor-2",
    previouslyBooked: false,
    appointments: []
  },
  {
    id: "3",
    name: "Dr. Maria Garcia",
    title: "Psychologist",
    imageId: "counselor-3",
    previouslyBooked: true,
    appointments: ["2024-05-10T11:00:00Z"]
  },
  {
    id: "4",
    name: "Dr. Samuel Jones",
    title: "Licensed Mental Health Counselor",
    imageId: "counselor-4",
    previouslyBooked: false,
    appointments: []
  },
  {
    id: "5",
    name: "Ms. Aisha Khan",
    title: "Marriage and Family Therapist",
    imageId: "counselor-5",
    previouslyBooked: false,
    appointments: []
  },
  {
    id: "6",
    name: "Dr. Ben Carter",
    title: "Clinical Psychologist",
    imageId: "counselor-6",
    previouslyBooked: false,
    appointments: []
  },
  {
    id: "7",
    name: "Dr. Chloe Williams",
    title: "Counseling Psychologist",
    imageId: "counselor-7",
    previouslyBooked: false,
    appointments: []
  },
  {
    id: "8",
    name: "Mr. Leo Martinez",
    title: "Licensed Professional Counselor",
    imageId: "counselor-8",
    previouslyBooked: false,
    appointments: []
  },
  {
    id: "9",
    name: "Ms. Sophia Brown",
    title: "Clinical Social Worker",
    imageId: "counselor-9",
    previouslyBooked: false,
    appointments: []
  },
  {
    id: "10",
    name: "Dr. Olivia Wilson",
    title: "Psychologist",
    imageId: "counselor-10",
    previouslyBooked: false,
    appointments: []
  }
];

const availableTimes = [
  '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'
];

// We use a global variable to persist state across navigation for this demo
if (typeof window !== 'undefined') {
  (window as any).counselors = (window as any).counselors || initialCounselors;
}


export default function ScheduleAppointmentPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const counselorId = params.counselorId as string;
  
  const [mockCounselors, setMockCounselors] = useState(() => (typeof window !== 'undefined' ? (window as any).counselors : initialCounselors));
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formattedHistory, setFormattedHistory] = useState<{date: string, time: string}[]>([]);

  const counselor = mockCounselors.find((c: any) => c.id === counselorId);
  const counselorImage = PlaceHolderImages.find(img => img.id === counselor?.imageId);

  useEffect(() => {
    if (counselor?.previouslyBooked && counselor.appointments.length > 0) {
      const history = counselor.appointments.map((appt: string) => {
          const apptDate = new Date(appt);
          return {
            date: apptDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
            time: apptDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          };
      }).sort((a: { date: string, time: string }, b: { date: string, time: string }) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setFormattedHistory(history);
    }
  }, [counselor]);


  if (!counselor) {
    return <div>Counselor not found.</div>;
  }

  const handleConfirmAppointment = () => {
    if (selectedDate && selectedTime) {
       const newAppointmentDateTime = new Date(selectedDate);
      const [time, modifier] = selectedTime.split(' ');
      let [hours, minutes] = time.split(':').map(Number);

      if (modifier === 'PM' && hours < 12) {
        hours += 12;
      }
      if (modifier === 'AM' && hours === 12) {
        hours = 0;
      }
      newAppointmentDateTime.setHours(hours, minutes, 0, 0);

      const updatedCounselors = mockCounselors.map((c: any) => {
        if (c.id === counselorId) {
          return {
            ...c,
            previouslyBooked: true,
            appointments: [...c.appointments, newAppointmentDateTime.toISOString()],
          };
        }
        return c;
      });
      
      setMockCounselors(updatedCounselors);
      if (typeof window !== 'undefined') {
        (window as any).counselors = updatedCounselors;
      }

      toast({
        title: "Appointment Confirmed!",
        description: `Your appointment with ${counselor.name} is set for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
      });
      setIsConfirmed(true);
    } else {
      toast({
        title: "Incomplete Selection",
        description: "Please select both a date and a time.",
        variant: "destructive",
      });
    }
  };

  if (isConfirmed) {
    return (
        <div className="flex flex-col items-center justify-center">
            <PageHeader 
                title="Appointment Confirmed!"
                description="Your session has been successfully booked."
            />
            <Card className="max-w-lg mx-auto text-center">
                <CardContent className="p-8 flex flex-col items-center gap-6">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                    <div className='text-center'>
                      <p className="text-lg mb-2">
                          Your appointment with <strong>{counselor.name}</strong> is confirmed.
                      </p>
                      <p className="text-muted-foreground">You will receive an email confirmation shortly.</p>
                    </div>

                    <div className="w-full p-4 bg-muted rounded-lg border text-left space-y-3">
                      <h3 className="font-semibold text-center">Appointment Details</h3>
                       <div className="flex items-center gap-3">
                          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p className="font-semibold">{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                          </div>
                       </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Time</p>
                            <p className="font-semibold">{selectedTime}</p>
                          </div>
                       </div>
                    </div>
                    
                    <Button asChild className="w-full mt-4">
                        <Link href="/booking">Book Another Appointment</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title="Schedule Your Appointment"
        description={`Booking a session with ${counselor.name}.`}
      />
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/booking">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Counselors
          </Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Select a Date & Time</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date(new Date().toDateString())} // Disable past dates
                />
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Available Times for {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : '...'}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {availableTimes.map(time => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      onClick={() => setSelectedTime(time)}
                      className="w-full"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="text-center">
               <Avatar className="h-24 w-24 mb-4 mx-auto">
                {counselorImage && (
                  <AvatarImage src={counselorImage.imageUrl} alt={counselorImage.description} data-ai-hint={counselorImage.imageHint} />
                )}
                <AvatarFallback><User className="h-12 w-12" /></AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline">{counselor.name}</CardTitle>
              <CardDescription>{counselor.title}</CardDescription>
            </CardHeader>
            <CardContent>
               <Button className="w-full" onClick={handleConfirmAppointment} disabled={!selectedDate || !selectedTime}>
                Confirm Appointment
              </Button>
            </CardContent>
          </Card>
          {selectedDate && selectedTime && (
            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle className="text-lg">Your Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  <p><span className="font-semibold">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span></p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                   <p><span className="font-semibold">{selectedTime}</span></p>
                </div>
              </CardContent>
            </Card>
          )}
          {counselor.previouslyBooked && formattedHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <History className="h-5 w-5 text-primary" />
                  Your History
                </CardTitle>
                <CardDescription>Your past appointments with {counselor.name}.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formattedHistory.map((appt, index) => (
                  <div key={index} className="space-y-2 border-b pb-2 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                        <p className="font-medium">
                            {appt.date}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                         <p className="font-medium">
                            {appt.time}
                        </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
