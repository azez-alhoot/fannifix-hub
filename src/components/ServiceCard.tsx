"use client";

import Link from "next/link";
import { 
  Refrigerator, 
  WashingMachine, 
  Zap, 
  Droplets, 
  Wind, 
  Hammer,
  Shield,
  Satellite,
  Wrench,
  Camera,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Service } from "@/data";

const iconMap: Record<string, LucideIcon> = {
  Refrigerator,
  WashingMachine,
  Zap,
  Droplets,
  Wind,
  Hammer,
  Shield,
  Satellite,
  Wrench,
  Camera,
};

interface ServiceCardProps {
  service: Service;
  technicianCount?: number;
}

export const ServiceCard = ({ service, technicianCount }: ServiceCardProps) => {
  const Icon = iconMap[service.icon] || Zap;

  return (
    <div className="service-card group cursor-pointer">
      {/* Icon */}
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-foreground mb-2">
        {service.name}
      </h3>
      <p className="text-muted-foreground text-sm mb-4">
        {service.description}
      </p>

      {technicianCount !== undefined && (
        <p className="text-sm text-primary mb-4">
          {technicianCount} فني متاح
        </p>
      )}

      {/* CTA */}
      <Link href={`/services/${service.slug}`}>
        <Button 
          variant="ghost" 
          className="p-0 h-auto text-primary font-semibold group-hover:gap-3 transition-all"
        >
          اعثر على فني
          <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
        </Button>
      </Link>

      {/* Decorative corner */}
      <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden rounded-br-[4rem] opacity-0 group-hover:opacity-100 transition-opacity">
        <div className={`absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br ${service.color} opacity-10 rounded-full`} />
      </div>
    </div>
  );
};
