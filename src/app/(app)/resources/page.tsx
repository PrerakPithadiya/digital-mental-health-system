import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function ResourcesPage() {
  return (
    <div>
      <PageHeader 
        title="Resource Hub"
        description="Explore articles, videos, relaxation audios, and tools for your mental wellness journey."
      />
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">The resource hub is currently under construction. Please check back soon for helpful psychoeducational content, including materials in regional languages.</p>
        </CardContent>
      </Card>
    </div>
  );
}
