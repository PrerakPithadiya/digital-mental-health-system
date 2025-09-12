import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function BookingPage() {
  return (
    <div>
      <PageHeader 
        title="Confidential Booking"
        description="Browse counselor profiles and schedule your appointment."
      />
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">The booking system is currently under development. Please check back soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
