

'use client';

import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import {
  Bot,
  CalendarCheck,
  LayoutDashboard,
  Library,
  MessageSquare,
  Settings,
  Shield,
  User,
  Bookmark,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/ai-support', icon: Bot, label: 'AI First-Aid' },
  { href: '/booking', icon: CalendarCheck, label: 'Counselor Booking' },
  { href: '/resources', icon: Library, label: 'Resource Hub' },
];

const accountItems = [
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/settings', icon: Settings, label: 'Settings' },
  { href: '/admin', icon: Shield, label: 'Admin Dashboard' },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const isForumsActive = pathname.startsWith('/forums');


  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className='flex-1'>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
            <Collapsible asChild>
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                        isActive={isForumsActive}
                        tooltip='Peer Forums'
                        >
                        <MessageSquare />
                        <span>Peer Forums</span>
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent asChild>
                        <SidebarMenuSub>
                        <SidebarMenuSubItem>
                            <Link href='/forums'>
                              <SidebarMenuSubButton asChild isActive={pathname === '/forums'}>
                                  <span>All Posts</span>
                              </SidebarMenuSubButton>
                            </Link>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                             <Link href='/forums/saved'>
                              <SidebarMenuSubButton asChild isActive={pathname === '/forums/saved'}>
                                <>
                                  <Bookmark />
                                  <span>Saved Posts</span>
                                </>
                              </SidebarMenuSubButton>
                            </Link>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                           <Link href='/forums/liked'>
                              <SidebarMenuSubButton asChild isActive={pathname === '/forums/liked'}>
                                <>
                                  <Heart />
                                  <span>Liked Posts</span>
                                </>
                              </SidebarMenuSubButton>
                            </Link>
                        </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        </SidebarMenu>
        <SidebarMenu>
          {accountItems.map((item) => (
             <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
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
