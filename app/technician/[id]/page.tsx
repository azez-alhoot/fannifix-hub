import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, BadgeCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { ContactButtons } from "@/components/ContactButtons";
import { ShareButton } from "@/components/ShareButton";
import {
  getTechnicianById,
  getServiceById,
  getAreaById,
  getCountryByCode,
} from "@/data";
import { generateLocalBusinessSchema } from "@/lib/seo";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const technician = getTechnicianById(id);
  
  if (!technician) {
    return {
      title: "الفني غير موجود",
    };
  }

  const serviceIds = technician.serviceIds || (technician.service_id ? [technician.service_id] : []);
  const areaIds = technician.areaIds || technician.areas || [];
  const countryCode = technician.countryCode || 'kw';
  const services = serviceIds.map(id => getServiceById(id)).filter(Boolean);
  const areas = areaIds.map(id => getAreaById(id, countryCode)).filter(Boolean);
  const primaryService = services[0];
  const primaryArea = areas[0];

  // Optimize title: فني {service} في {area} | FanniFix
  const pageTitle = `${technician.name} - فني ${primaryService?.name || 'صيانة'} في ${primaryArea?.name || 'الكويت'} | فني فيكس`;
  const pageDescription = `${technician.name} - فني ${primaryService?.name || 'صيانة'} في ${primaryArea?.name || 'الكويت'}. ${technician.description.substring(0, 100)}... تواصل مباشر.`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `https://fannifix.com/technician/${technician.id}`,
    },
  };
}

export default async function TechnicianProfilePage({ params }: PageProps) {
  const { id } = await params;
  const technician = getTechnicianById(id);
  
  if (!technician) {
    notFound();
  }

  const serviceIds = technician.serviceIds || (technician.service_id ? [technician.service_id] : []);
  const areaIds = technician.areaIds || technician.areas || [];
  const services = serviceIds.map(id => getServiceById(id)).filter(Boolean);
  const areas = areaIds.map(id => getAreaById(id, technician.countryCode || 'kw')).filter(Boolean);
  const country = getCountryByCode(technician.countryCode || 'kw');
  const primaryService = services[0];
  const primaryArea = areas[0];
  
  const structuredData = generateLocalBusinessSchema({
    name: technician.name,
    description: technician.description || '',
    phone: technician.phone || technician.whatsapp || '',
    rating: technician.rating || 0,
    reviewsCount: technician.reviewsCount || 0,
    areaName: primaryArea?.name || "الكويت",
    serviceName: primaryService?.name || "صيانة",
    url: `https://fannifix.com/technician/${technician.id}`,
  });

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumb items={[
            { label: "الفنيين", href: "/technicians" },
            { label: technician.name }
          ]} />

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="relative h-64 bg-gradient-to-br from-primary to-primary/80">
              <div className="absolute bottom-0 right-8 w-32 h-32 translate-y-1/2">
                <Image 
                  src={technician.images[0]} 
                  alt={technician.name} 
                  width={128}
                  height={128}
                  className="rounded-full border-4 border-white object-cover" 
                />
              </div>
            </div>

            <div className="pt-20 px-8 pb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">{technician.name}</h1>
                    {technician.verified && <BadgeCheck className="w-6 h-6 text-primary" />}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {services.map((service, idx) => (
                      <Link key={service?.id || idx} href={`/services/${service?.slug}`} className="text-primary font-medium hover:underline">
                        {service?.name}
                        {idx < services.length - 1 && <span className="text-muted-foreground mx-1">•</span>}
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2">
                    <MapPin className="w-4 h-4" />
                    {areas.map((area, idx) => (
                      <span key={area?.id || idx}>
                        {area?.name}
                        {idx < areas.length - 1 && <span>، </span>}
                      </span>
                    ))}
                    {country && <span>، {country.name}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <ShareButton />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    {technician.rating}
                  </div>
                  <div className="text-sm text-muted-foreground">التقييم</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{technician.reviewsCount}</div>
                  <div className="text-sm text-muted-foreground">تقييم</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{technician.experienceYears}</div>
                  <div className="text-sm text-muted-foreground">سنوات خبرة</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{technician.viewsCount}</div>
                  <div className="text-sm text-muted-foreground">مشاهدة</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-3">نبذة</h2>
                <p className="text-muted-foreground leading-relaxed">{technician.description}</p>
              </div>

              {/* Price */}
              <div className="bg-accent/10 rounded-xl p-4 mb-8">
                <span className="text-muted-foreground">السعر التقديري: </span>
                <span className="text-xl font-bold text-primary">{technician.priceEstimate}</span>
              </div>

              {/* Actions */}
              <ContactButtons 
                whatsapp={technician.whatsapp} 
                phone={technician.phone}
                technicianName={technician.name}
                service={primaryService?.name}
                area={primaryArea?.name}
                technicianId={technician.id}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

