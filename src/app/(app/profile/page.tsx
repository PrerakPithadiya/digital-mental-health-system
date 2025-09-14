
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  bio: z.string().max(160).min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can be fetched from a user database
const defaultValues: Partial<ProfileFormValues> = {
  name: 'Student',
  email: 'student@wellspring.edu',
  bio: 'I am a student at WellSpring University, passionate about learning and growing.',
};

export default function ProfilePage() {
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been successfully updated.',
    });
  }

  return (
    <div>
      <PageHeader
        title="Your Profile"
        description="Manage your personal information and preferences."
      />
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardHeader className="p-6">
                <div className="flex items-center gap-4">
                     <Avatar className="h-20 w-20">
                        <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" alt={"Student"} data-ai-hint="person face" />
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                     <div>
                        <CardTitle>Public Profile</CardTitle>
                        <CardDescription>
                            This information may be displayed anonymously in forums.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your display name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name that will be displayed on your profile and
                      in forums.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                     <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your email is kept private and used for notifications and account management.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can share a bit about your interests or what you are studying.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Update profile</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
