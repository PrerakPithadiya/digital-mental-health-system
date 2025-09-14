
import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";

export default function SavedPostsPage() {
  return (
    <div>
      <PageHeader 
        title="Saved Posts"
        description="Here are the forum posts you've bookmarked for later."
      />
      <Card>
        <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Bookmark className="h-12 w-12" />
                <p>You haven't saved any posts yet.</p>
                <p className="text-sm">Click the bookmark icon on a post to save it here.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
