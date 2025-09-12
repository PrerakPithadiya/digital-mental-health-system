import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function BookingPage() {
  return (
    <div>
      <PageHeader 
        title="Counselor Booking"
        description="Browse counselor profiles and schedule your confidential appointment."
      />
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">The confidential booking system is currently under development. You will soon be able to schedule appointments with college counselors here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
