"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services, getKuwaitAreas } from "@/data";

interface SearchBarProps {
  variant?: "hero" | "compact";
  initialService?: string;
  initialArea?: string;
  onSearch?: (filters: { serviceId?: string; areaId?: string }) => void;
}

export const SearchBar = ({
  variant = "hero",
  initialService,
  initialArea,
  onSearch,
}: SearchBarProps) => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(initialService || "");
  const [selectedArea, setSelectedArea] = useState(initialArea || "");
  
  // Kuwait areas only for Phase 1
  const kuwaitAreas = getKuwaitAreas();

  const handleSearch = () => {
    // Find service slug for URL
    const service = services.find(s => s.id === selectedService);
    const area = kuwaitAreas.find(a => a.id === selectedArea);

    if (onSearch) {
      onSearch({
        serviceId: selectedService || undefined,
        areaId: selectedArea || undefined,
      });
    } else if (service) {
      // Navigate to Kuwait service page
      const url = area 
        ? `/kw/${service.slug}/${area.slug}`
        : `/kw/${service.slug}`;
      router.push(url);
    } else {
      router.push(`/kw`);
    }
  };

  const clearFilters = () => {
    setSelectedService("");
    setSelectedArea("");
  };

  const hasFilters = selectedService || selectedArea;

  if (variant === "compact") {
    return (
      <div className="flex flex-col md:flex-row gap-3 bg-white rounded-xl p-4 shadow-md">
        <Select value={selectedService} onValueChange={setSelectedService}>
          <SelectTrigger className="flex-1 h-12">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-primary" />
              <SelectValue placeholder="الخدمة" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.id} value={service.id}>
                {service.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedArea} onValueChange={setSelectedArea}>
          <SelectTrigger className="flex-1 h-12">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <SelectValue placeholder="المنطقة" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {kuwaitAreas.map((area) => (
              <SelectItem key={area.id} value={area.id}>
                {area.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          {hasFilters && (
            <Button variant="outline" size="icon" onClick={clearFilters} className="h-12 w-12">
              <X className="w-4 h-4" />
            </Button>
          )}
          <Button className="h-12 px-6 btn-primary gap-2" onClick={handleSearch}>
            <Search className="w-4 h-4" />
            بحث
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="h-14 text-lg border-0 bg-muted/50">
              <div className="flex items-center gap-3">
                <Wrench className="w-5 h-5 text-primary" />
                <SelectValue placeholder="اختر الخدمة" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger className="h-14 text-lg border-0 bg-muted/50">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <SelectValue placeholder="اختر المنطقة" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {kuwaitAreas.map((area) => (
                <SelectItem key={area.id} value={area.id}>
                  {area.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button className="h-14 px-8 text-lg btn-accent gap-2" onClick={handleSearch}>
          <Search className="w-5 h-5" />
          ابحث الآن
        </Button>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap justify-center gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground">الأكثر بحثاً:</span>
        {services.slice(0, 4).map((service) => (
          <button
            key={service.id}
            className="text-sm text-primary hover:text-primary/80 font-medium"
            onClick={() => {
              router.push(`/kw/${service.slug}`);
            }}
          >
            {service.name}
          </button>
        ))}
      </div>
    </div>
  );
};
