"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SearchBar } from "@/components/SearchBar";
import { TechnicianCard } from "@/components/TechnicianCard";
import { searchTechnicians, getServiceById, getCountryByCode, getAreaById } from "@/data";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TechniciansPage() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'newest' | 'experience'>('rating');
  
  const countryCode = searchParams.get("country") || undefined;
  const serviceId = searchParams.get("service") || undefined;
  const areaId = searchParams.get("area") || undefined;

  const technicians = searchTechnicians({ countryCode, serviceId, areaId, sortBy });
  
  const service = serviceId ? getServiceById(serviceId) : null;
  const country = countryCode ? getCountryByCode(countryCode) : null;
  const area = areaId ? getAreaById(areaId) : null;

  const title = service?.name || country?.name || "جميع الفنيين";

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto">
          <Breadcrumb items={[
            { label: "الفنيين" }
          ]} />

          <h1 className="text-3xl font-bold mb-6">{title}</h1>

          {/* Search */}
          <div className="mb-8">
            <SearchBar variant="compact" initialService={serviceId} initialArea={areaId} />
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">{technicians.length} نتيجة</p>
            <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">التقييم</SelectItem>
                <SelectItem value="reviews">الأكثر تقييماً</SelectItem>
                <SelectItem value="experience">الخبرة</SelectItem>
                <SelectItem value="newest">الأحدث</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {technicians.map((tech) => (
              <TechnicianCard key={tech.id} technician={tech} showFullDetails />
            ))}
          </div>

          {technicians.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">لا توجد نتائج مطابقة</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

