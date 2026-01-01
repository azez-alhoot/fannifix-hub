import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TechnicianCard } from "@/components/TechnicianCard";
import { SearchBar } from "@/components/SearchBar";
import {
  getCountryByCode,
  getAreasByCountry,
  getTechniciansByCountry,
  services,
  getCountryStats,
} from "@/data";
import { MapPin, Users, Star, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{
    code: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { code } = await params;
  const country = getCountryByCode(code);

  if (!country) {
    return {
      title: "الدولة غير موجودة",
    };
  }

  const technicians = getTechniciansByCountry(country.code);

  return {
    title: `فنيين في ${country.name} | فني تصليح`,
    description: `ابحث عن أفضل الفنيين في ${country.name}. ${technicians.length} فني متاح.`,
  };
}

export default async function CountryPage({ params }: PageProps) {
  const { code } = await params;
  const country = getCountryByCode(code);

  if (!country) {
    notFound();
  }

  const areas = getAreasByCountry(country.code);
  const technicians = getTechniciansByCountry(country.code);
  const stats = getCountryStats(country.code);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto">
          <Breadcrumb
            items={[
              { label: "الدول", href: "/countries" },
              { label: country.name },
            ]}
          />

          {/* Hero */}
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl">{country.flag}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {country.name}
                </h1>
                <p className="text-white/80">{country.nameEn}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-md">
              <div className="text-center">
                <div className="text-3xl font-bold">{technicians.length}</div>
                <div className="text-white/70 text-sm">فني</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{areas.length}</div>
                <div className="text-white/70 text-sm">منطقة</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-3xl font-bold">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  {stats.avgRating.toFixed(1)}
                </div>
                <div className="text-white/70 text-sm">متوسط التقييم</div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-12">
            <SearchBar variant="compact" />
          </div>

          {/* Areas */}
          <h2 className="text-2xl font-bold mb-6">المناطق</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {areas.map((area) => (
              <Link
                key={area.id}
                href={`/technicians?country=${country.code}&area=${area.id}`}
                className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-shadow border border-border group"
              >
                <MapPin className="w-5 h-5 text-primary mx-auto mb-2" />
                <span className="font-medium group-hover:text-primary transition-colors">
                  {area.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Services in this country */}
          <h2 className="text-2xl font-bold mb-6">الخدمات المتاحة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/technicians?country=${country.code}&service=${service.id}`}
                className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-lg transition-shadow border border-border group"
              >
                <span className="font-medium group-hover:text-primary transition-colors">
                  {service.name}
                </span>
                <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          {/* Featured Technicians */}
          <h2 className="text-2xl font-bold mb-6">
            فنيون مميزون في {country.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicians.slice(0, 4).map((tech) => (
              <TechnicianCard key={tech.id} technician={tech} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

