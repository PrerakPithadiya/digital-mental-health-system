import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { UserNav } from "../user-nav";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex w-full items-center justify-end gap-4">
        <Button variant="destructive" size="sm" asChild>
          <Link href="/urgent-support">
            <ShieldAlert className="mr-2 h-4 w-4" />
            Urgent Support
          </Link>
        </Button>
        <UserNav />
      </div>
    </header>
  );
}
