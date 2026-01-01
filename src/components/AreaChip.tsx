"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { Area } from "@/data";
import { cn } from "@/lib/utils";

interface AreaChipProps {
  area: Area;
  active?: boolean;
  href?: string;
  className?: string;
}

export const AreaChip = ({ area, active = false, href, className }: AreaChipProps) => {
  const defaultHref = `/kw/area/${area.slug}`;
  const finalHref = href || defaultHref;

  return (
    <Link
      href={finalHref}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-full",
        "shadow-sm hover:shadow-md transition-all duration-200",
        "text-sm font-medium text-gray-700",
        "border border-gray-100",
        "hover:bg-primary hover:text-white hover:border-primary",
        active && "bg-primary text-white border-primary shadow-md",
        className
      )}
    >
      <MapPin className={cn(
        "w-4 h-4 flex-shrink-0",
        active && "text-white"
      )} />
      <span>{area.name}</span>
    </Link>
  );
};

