"use client";

import { usePathname } from "next/navigation";
import AppShell from "@/app/components/AppShell";
import { User } from "@supabase/supabase-js";

export default function LayoutWrapper({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

  if (user && !isAuthPage) {
    return <AppShell user={user}>{children}</AppShell>;
  }

  return <>{children}</>;
}
