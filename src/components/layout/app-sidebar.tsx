'use client';

import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import {
  Bot,
  CalendarCheck,
  LayoutDashboard,
  Library,
  MessageSquare,
  Shield,
} from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/ai-support', icon: Bot, label: 'AI Support' },
  { href: '/booking', icon: CalendarCheck, label: 'Booking' },
  { href: '/resources', icon: Library, label: 'Resources' },
  { href: '/forums', icon: MessageSquare, label: 'Forums' },
  { href: '/admin', icon: Shield, label: 'Admin' },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
