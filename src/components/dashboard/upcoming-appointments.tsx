import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

const mockAppointment = {
    counselor: "Dr. Evelyn Reed",
    date: "2024-08-15",
    time: "10:00 AM",
    counselorImageId: "counselor-1",
};

export default function UpcomingAppointments() {
    const counselorImage = PlaceHolderImages.find(img => img.id === mockAppointment.counselorImageId);

    const appointmentDate = new Date(mockAppointment.date);
    const formattedDate = appointmentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Upcoming Appointment</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex items-center gap-4">
                    {counselorImage && (
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={counselorImage.imageUrl} alt={counselorImage.description} data-ai-hint={counselorImage.imageHint} />
                            <AvatarFallback>
                                <User />
                            </AvatarFallback>
                        </Avatar>
                    )}
                    <div>
                        <p className="font-semibold text-lg">{mockAppointment.counselor}</p>
                        <p className="text-muted-foreground">Counselor</p>
                    </div>
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-5 w-5" />
                        <span className="font-medium text-foreground">{formattedDate}</span>
                    </div>
                     <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-5 w-5" />
                        <span className="font-medium text-foreground">{mockAppointment.time}</span>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 self-start sm:self-center">
                    <Button asChild variant="secondary">
                        <Link href="/booking">View Details</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/booking">Reschedule</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
