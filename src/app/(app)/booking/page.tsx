import PageHeader from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { User } from "lucide-react";
import Link from "next/link";

const mockCounselors = [
  {
    id: "1",
    name: "Dr. Evelyn Reed",
    title: "Licensed Professional Counselor",
    specialties: ["Anxiety", "Stress Management", "Academic Pressure"],
    description: "Dr. Reed specializes in cognitive-behavioral therapy (CBT) and helps students develop practical coping skills to manage academic stress and anxiety. She has over 10 years of experience in university counseling centers.",
    imageId: "counselor-1",
  },
  {
    id: "2",
    name: "Mr. David Chen",
    title: "Clinical Social Worker",
    specialties: ["Depression", "Relationships", "Family Issues"],
    description: "Mr. Chen provides a compassionate and supportive environment for students navigating depression and relationship challenges. He uses a strengths-based approach to empower students.",
    imageId: "counselor-2",
  },
  {
    id: "3",
    name: "Dr. Maria Garcia",
    title: "Psychologist",
    specialties: ["Trauma", "Grief & Loss", "Mindfulness"],
    description: "Dr. Garcia has expertise in trauma-informed care and mindfulness-based stress reduction (MBSR). She is dedicated to helping students find resilience and healing in the face of adversity.",
    imageId: "counselor-3",
  }
];

export default function BookingPage() {
  return (
    <div>
      <PageHeader 
        title="Counselor Booking"
        description="Browse counselor profiles and schedule your confidential appointment."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCounselors.map((counselor) => {
          const counselorImage = PlaceHolderImages.find(img => img.id === counselor.imageId);
          return (
            <Card key={counselor.id} className="flex flex-col">
              <CardHeader className="items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  {counselorImage && (
                    <AvatarImage src={counselorImage.imageUrl} alt={counselorImage.description} data-ai-hint={counselorImage.imageHint} />
                  )}
                  <AvatarFallback><User className="h-12 w-12" /></AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-xl">{counselor.name}</CardTitle>
                <CardDescription>{counselor.title}</CardDescription>
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  {counselor.specialties.map(specialty => (
                    <Badge key={specialty} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between text-center">
                <p className="text-muted-foreground mb-6">{counselor.description}</p>
                <Button className="w-full" asChild>
                  <Link href={`/booking/${counselor.id}`}>
                    Book an Appointment
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
