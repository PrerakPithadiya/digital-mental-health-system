'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smile, Meh, Frown, Lightbulb } from 'lucide-react';
import Link from 'next/link';

type Mood = 'happy' | 'neutral' | 'sad';

const moodOptions = [
  { mood: 'happy', icon: Smile, label: 'Happy' },
  { mood: 'neutral', icon: Meh, label: 'Neutral' },
  { mood: 'sad', icon: Frown, label: 'Sad' },
] as const;

const moodResponses = {
  happy: {
    message: "Great to hear! Let's keep the positive momentum going. Maybe you'd like to explore some resources on building resilience?",
    link: '/resources',
    linkText: 'Explore Resources'
  },
  neutral: {
    message: "It's okay to have an 'in-between' day. A quick mindfulness exercise might be helpful. Why not try our AI assistant for a short session?",
    link: '/ai-support',
    linkText: 'Talk to AI Assistant'
  },
  sad: {
    message: "We're sorry to hear you're feeling down. Remember, it's okay to seek support. Talking to our AI assistant or a peer can make a difference.",
    link: '/ai-support',
    linkText: 'Get Support'
  },
};

export default function MoodCheckin() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleReset = () => {
    setSelectedMood(null);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Daily Mood Check-in</CardTitle>
      </CardHeader>
      <CardContent>
        {!selectedMood ? (
          <div>
            <p className="text-muted-foreground mb-4">How are you feeling today?</p>
            <div className="flex gap-4">
              {moodOptions.map(({ mood, icon: Icon, label }) => (
                <Button
                  key={mood}
                  variant="outline"
                  size="lg"
                  className="flex flex-col h-auto p-4 gap-2 flex-1 items-center justify-center"
                  onClick={() => handleMoodSelect(mood)}
                >
                  <Icon className="h-8 w-8" />
                  <span>{label}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
             <div className="p-3 bg-primary/10 rounded-full mb-4">
                <Lightbulb className="h-8 w-8 text-primary" />
             </div>
            <p className="text-lg max-w-prose mx-auto mb-4">{moodResponses[selectedMood].message}</p>
            <div className='flex gap-4'>
                <Button asChild>
                    <Link href={moodResponses[selectedMood].link}>{moodResponses[selectedMood].linkText}</Link>
                </Button>
                <Button variant="ghost" onClick={handleReset}>Choose another mood</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
