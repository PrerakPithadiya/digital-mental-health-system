import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div>
      <PageHeader 
        title="Admin Analytics"
        description="View anonymized data and trends on student mental health."
      />
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">The admin dashboard is under development. Analytics and reporting tools will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
