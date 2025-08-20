"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  CodeXml,
  Download,
  File,
  FileText,
  Home,
  Layers,
  PanelLeft,
  Terminal,
} from "lucide-react";
import { LaravelLogo } from "./icons/laravel-logo";
import { Button } from "./ui/button";

const menuItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/installation", label: "Installation", icon: Download },
  { href: "/crud", label: "CRUD Scaffolding", icon: Layers },
  { href: "/forms", label: "Form Generation", icon: FileText },
  { href: "/explain", label: "Code Explanation", icon: CodeXml },
  { href: "/terminal", label: "Artisan Terminal", icon: Terminal },
  { href: "/files", label: "File Browser", icon: File },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <LaravelLogo className="w-8 h-8" />
            <h1 className="text-xl font-semibold text-sidebar-foreground font-headline">
              Artisan Toolkit
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
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
      <SidebarInset>
        <header className="p-4 flex items-center gap-4 md:hidden border-b">
          <SidebarTrigger>
            <PanelLeft />
          </SidebarTrigger>
          <div className="flex items-center gap-2">
            <LaravelLogo className="w-6 h-6" />
            <h1 className="text-lg font-semibold font-headline">Artisan Toolkit</h1>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
