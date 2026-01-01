"use client";

import Link from "next/link";
import { Clock, MapPin, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLatestListings, getTechnicianById, getServiceById, getAreaById } from "@/data";

const formatTimeAgo = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "اليوم";
  if (diffDays === 1) return "منذ يوم";
  if (diffDays < 7) return `منذ ${diffDays} أيام`;
  return `منذ أسبوع`;
};

export const LatestListings = () => {
  const listings = getLatestListings(6);

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block text-primary font-semibold mb-3">
              أحدث الإعلانات
            </span>
            <h2 className="section-title mb-0">
              إعلانات مضافة مؤخراً
            </h2>
          </div>
          <Link href="/technicians">
            <Button variant="outline" className="mt-4 md:mt-0">
              تصفح الكل
            </Button>
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((listing, index) => {
            const technician = getTechnicianById(listing.technicianId);
            const service = getServiceById(listing.serviceId);
            const area = getAreaById(listing.areaId);
            
            return (
              <Link
                key={listing.id}
                href={`/technician/${listing.technicianId}`}
                className="group bg-white rounded-xl p-5 border border-border hover:shadow-card hover:-translate-y-1 transition-all duration-300 cursor-pointer opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    {service?.name}
                  </Badge>
                  {technician?.featured && (
                    <Badge className="bg-accent text-accent-foreground">
                      مميز
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {listing.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {area?.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatTimeAgo(listing.createdAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {listing.viewsCount} مشاهدة
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
