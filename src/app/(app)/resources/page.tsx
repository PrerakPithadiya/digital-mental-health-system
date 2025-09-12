import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function ResourcesPage() {
  return (
    <div>
      <PageHeader 
        title="Resource Library"
        description="Explore articles, videos, and tools for your mental wellness journey."
      />
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">The resource library is currently under construction. Please check back soon for helpful content.</p>
        </CardContent>
      </Card>
    </div>
  );
}
