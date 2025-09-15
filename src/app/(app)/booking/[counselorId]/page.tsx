'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import PageHeader from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { User, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Mock data - in a real app, this would come from an API
const mockCounselors = [
  {
    id: "1",
    name: "Dr. Evelyn Reed",
    title: "Licensed Professional Counselor",
    imageId: "counselor-1",
  },
  {
    id: "2",
    name: "Mr. David Chen",
    title: "Clinical Social Worker",
    imageId: "counselor-2",
  },
  {
    id: "3",
    name: "Dr. Maria Garcia",
    title: "Psychologist",
imageId: "counselor-3",
  }
];

const availableTimes = [
  '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'
];

export default function ScheduleAppointmentPage() {
  const params = useParams();
  const { toast } = useToast();
  const counselorId = params.counselorId as string;
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const counselor = mockCounselors.find(c => c.id === counselorId);
  const counselorImage = PlaceHolderImages.find(img => img.id === counselor?.imageId);

  if (!counselor) {
    return <div>Counselor not found.</div>;
  }

  const handleConfirmAppointment = () => {
    if (selectedDate && selectedTime) {
      toast({
        title: "Appointment Confirmed!",
        description: `Your appointment with ${counselor.name} is set for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
      });
      // Here you would typically redirect or update UI state
      setSelectedTime(null);
    } else {
      toast({
        title: "Incomplete Selection",
        description: "Please select both a date and a time.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <PageHeader 
        title="Schedule Your Appointment"
        description={`Booking a session with ${counselor.name}.`}
      />
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
        </div>
      </div>
    </div>
  );
}
