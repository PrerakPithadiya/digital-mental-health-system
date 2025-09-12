import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function ForumsPage() {
  return (
    <div>
      <PageHeader 
        title="Peer Support Forums"
        description="Connect with other students in a safe, anonymous, and moderated environment."
      />
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">The peer support forums are being developed. We look forward to launching this feature with trained student volunteers soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
