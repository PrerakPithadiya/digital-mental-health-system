

'use client';

import { useState, useEffect } from 'react';
import PageHeader from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { User, CheckCheck } from "lucide-react";
import Link from "next/link";

const initialCounselors = [
  {
    id: "1",
    name: "Dr. Evelyn Reed",
    title: "Licensed Professional Counselor",
    specialties: ["Anxiety", "Stress Management", "Academic Pressure"],
    description: "Dr. Reed specializes in cognitive-behavioral therapy (CBT) and helps students develop practical coping skills to manage academic stress and anxiety. She has over 10 years of experience in university counseling centers.",
    imageId: "counselor-1",
    previouslyBooked: true,
    appointments: ["2024-06-20T14:00:00Z"]
  },
  {
    id: "2",
    name: "Mr. David Chen",
    title: "Clinical Social Worker",
    specialties: ["Depression", "Relationships", "Family Issues"],
    description: "Mr. Chen provides a compassionate and supportive environment for students navigating depression and relationship challenges. He uses a strengths-based approach to empower students.",
    imageId: "counselor-2",
    previouslyBooked: false,
    appointments: []
  },
  {
    id: "3",
    name: "Dr. Maria Garcia",
    title: "Psychologist",
    specialties: ["Trauma", "Grief & Loss", "Mindfulness"],
    description: "Dr. Garcia has expertise in trauma-informed care and mindfulness-based stress reduction (MBSR). She is dedicated to helping students find resilience and healing in the face of adversity.",
    imageId: "counselor-3",
    previouslyBooked: true,
    appointments: ["2024-05-10T11:00:00Z"]
  },
  {
    id: "4",
    name: "Dr. Samuel Jones",
    title: "Licensed Mental Health Counselor",
    specialties: ["ADHD", "Behavioral Issues", "Coping Skills"],
    description: "Dr. Jones works with students to develop strategies for managing ADHD and other behavioral challenges. He focuses on creating personalized plans that foster academic and personal success.",
    imageId: "counselor-4",
    previouslyBooked: false,
    appointments: []
  },
  {
    id: "5",
    name: "Ms. Aisha Khan",
    title: "Marriage and Family Therapist",
    specialties: ["Relationship Counseling", "Family Conflict", "Communication"],
    description: "Ms. Khan helps students navigate the complexities of interpersonal relationships, offering guidance on communication, conflict resolution, and building healthy connections.",
    imageId: "counselor-5",
    previouslyBooked: false,
    appointments: []
  },
  {
    id: "6",
    name: "Dr. Ben Carter",
    title: "Clinical Psychologist",
    specialties: ["Eating Disorders", "Body Image", "Self-Esteem"],
    description: "Dr. Carter provides specialized support for students dealing with eating disorders and body image concerns. He uses an evidence-based, compassionate approach to promote healing and self-acceptance.",
    imageId: "counselor-6",
    previouslyBooked: false,
    appointments: []
  },
  {
    id: "7",
    name: "Dr. Chloe Williams",
    title: "Counseling Psychologist",
    specialties: ["Career Counseling", "Life Transitions", "Identity"],
    description: "Dr. Williams assists students in exploring their career paths, navigating major life transitions, and understanding their personal identity. She empowers students to make choices that align with their values and goals.",
    imageId: "counselor-7",
    previouslyBooked: false,
    appointments: []
  },
  {
    id: "8",
    name: "Mr. Leo Martinez",
    title: "Licensed Professional Counselor",
    specialties: ["Substance Abuse", "Addiction", "Recovery"],
    description: "Mr. Martinez offers a supportive space for students struggling with substance use and addiction. He focuses on harm reduction, relapse prevention, and building a foundation for long-term recovery.",
    imageId: "counselor-8",
    previouslyBooked: false,
    appointments: []
  },
  {
    id: "9",
    name: "Ms. Sophia Brown",
    title: "Clinical Social Worker",
    specialties: ["Social Anxiety", "Peer Relationships", "Loneliness"],
    description: "Ms. Brown specializes in helping students overcome social anxiety and build meaningful connections. She provides practical tools for navigating social situations and reducing feelings of isolation.",
    imageId: "counselor-9",
    previouslyBooked: false,
    appointments: []
  },
  {
    id: "10",
    name: "Dr. Olivia Wilson",
    title: "Psychologist",
    specialties: ["Sleep Issues", "Insomnia", "Wellness Coaching"],
    description: "Dr. Wilson helps students address sleep-related problems and develop healthy sleep habits. She also provides wellness coaching to promote overall physical and mental well-being.",
    imageId: "counselor-10",
    previouslyBooked: false,
    appointments: []
  }
];

if (typeof window !== 'undefined') {
  (window as any).counselors = (window as any).counselors || initialCounselors;
}

export default function BookingPage() {
  const [mockCounselors, setMockCounselors] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMockCounselors((window as any).counselors);
    }
  }, []);

  return (
    <div>
      <PageHeader 
        title="Counselor Booking"
        description="Browse counselor profiles and schedule your confidential appointment."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCounselors.map((counselor: any) => {
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
                {counselor.previouslyBooked && (
                  <Badge variant="outline" className="mt-2 border-green-500 text-green-600">
                    <CheckCheck className="mr-1.5 h-4 w-4" />
                    Previously Booked
                  </Badge>
                )}
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  {counselor.specialties?.map((specialty: string) => (
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
