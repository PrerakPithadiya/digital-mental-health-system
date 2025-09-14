
import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function LikedPostsPage() {
  return (
    <div>
      <PageHeader 
        title="Liked Posts"
        description="Here are the forum posts you've liked."
      />
      <Card>
        <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Heart className="h-12 w-12" />
                <p>You haven't liked any posts yet.</p>
                <p className="text-sm">Click the heart icon on a post to like it.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
