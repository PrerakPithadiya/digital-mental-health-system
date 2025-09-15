'use client';

import { useState } from 'react';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Heart, Bookmark, Send, User, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Post = {
  id: number;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  isOwn?: boolean;
  saved?: boolean;
  liked?: boolean;
};

const initialPosts: Post[] = [
  {
    id: 1,
    author: 'Anonymous Student',
    avatar: 'https://picsum.photos/seed/forum-user-1/40/40',
    timestamp: '2 hours ago',
    content: "Feeling really overwhelmed with exam pressure. It feels like I can't catch a break and I'm falling behind no matter how hard I study. Does anyone else feel this way or have tips for managing the stress?",
    likes: 12,
    comments: 4,
  },
  {
    id: 2,
    author: 'Another Student',
    avatar: 'https://picsum.photos/seed/forum-user-2/40/40',
    timestamp: '1 day ago',
    content: "I've been struggling to make new friends since starting college. It feels like everyone already has their groups. Any advice on how to meet people or feel less lonely on campus?",
    likes: 25,
    comments: 8,
  },
    {
    id: 3,
    author: 'Concerned Classmate',
    avatar: 'https://picsum.photos/seed/forum-user-3/40/40',
    timestamp: '3 days ago',
    content: "I'm worried about a friend who seems really down lately. They're not talking as much and seem to be skipping classes. How can I support them without being intrusive?",
    likes: 18,
    comments: 6,
  },
];

export default function ForumsPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const newPost: Post = {
        id: Date.now(), // Use a more unique ID
        author: 'You (Anonymous)',
        avatar: `https://picsum.photos/seed/user-avatar/40/40`,
        timestamp: 'Just now',
        content: newPostContent,
        likes: 0,
        comments: 0,
        isOwn: true,
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setIsSubmitting(false);
    }, 500);
  };
  
  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(p => p.id !== postId));
  }

  const toggleLike = (postId: number) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const liked = !p.liked;
        const likes = liked ? p.likes + 1 : p.likes - 1;
        return { ...p, liked, likes };
      }
      return p;
    }));
  }

  const toggleSave = (postId: number) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, saved: !p.saved };
      }
      return p;
    }));
  }


  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Peer Support Forums"
        description="Connect with other students in a safe, anonymous, and moderated environment."
      />

      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-lg font-semibold">Create a New Post</h2>
        </CardHeader>
        <form onSubmit={handlePostSubmit}>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/user-avatar/40/40" alt="Your avatar" data-ai-hint="person face" />
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
              <Textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share what's on your mind... (Your post will be anonymous)"
                className="flex-1"
                rows={3}
                disabled={isSubmitting}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={!newPostContent.trim() || isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              Post Anonymously
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.avatar} alt={post.author} data-ai-hint="person face" />
                  <AvatarFallback><User/></AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90">{post.content}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between text-muted-foreground">
              <div className="flex items-center gap-6">
                <Link href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span>{post.comments} Comments</span>
                </Link>
                <button 
                  onClick={() => toggleLike(post.id)}
                  className={cn("flex items-center gap-2 transition-colors", 
                    post.liked ? 'text-pink-500' : 'hover:text-pink-500'
                  )}>
                  <Heart className={cn("h-5 w-5", post.liked && "fill-current")} />
                  <span>{post.likes} Likes</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                 <button 
                  onClick={() => toggleSave(post.id)}
                  className={cn("flex items-center gap-2 transition-colors",
                    post.saved ? 'text-primary' : 'hover:text-primary'
                  )}>
                      <Bookmark className={cn("h-5 w-5", post.saved && "fill-current")} />
                      <span>{post.saved ? 'Saved' : 'Save'}</span>
                </button>
                {post.isOwn && (
                   <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="flex items-center gap-2 hover:text-destructive transition-colors">
                        <Trash2 className="h-5 w-5" />
                        <span>Delete</span>
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your post.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeletePost(post.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
