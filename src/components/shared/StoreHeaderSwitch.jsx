"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/shared/Header";

export default function StoreHeaderSwitch() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  if (isHome) return null;
  return <Header />;
}

