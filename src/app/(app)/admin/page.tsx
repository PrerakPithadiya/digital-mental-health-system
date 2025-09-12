import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div>
      <PageHeader 
        title="Admin Dashboard"
        description="View anonymized data analytics and trends to help plan institutional interventions."
      />
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">The admin dashboard is under development. Analytics and reporting tools will be available here to provide insights into student mental health trends.</p>
        </CardContent>
      </Card>
    </div>
  );
}
