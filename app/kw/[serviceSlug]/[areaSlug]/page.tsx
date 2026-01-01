import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TechnicianCard } from "@/components/TechnicianCard";
import { SearchBar } from "@/components/SearchBar";
import { FAQSection } from "@/components/FAQSection";
import {
  services,
  getServiceBySlug,
  getAreaBySlug,
  getAreasByCountry,
  searchTechnicians,
  getCountryByCode,
  getSeoForPage,
  getFaqs,
  getPricing
} from "@/data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { MapPin, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{
    serviceSlug: string;
    areaSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceSlug, areaSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const area = getAreaBySlug(areaSlug, "kw");
  
  if (!service || !area) {
    return {
      title: "الصفحة غير موجودة",
    };
  }

  // Get SEO from JSON (data-driven)
  const seoData = getSeoForPage('kw', 'service_area', service.id, area.id);
  const technicians = searchTechnicians({
    serviceId: service.id,
    countryCode: "kw",
    areaId: area.id,
  });

  // Fallback if SEO not found
  const pageTitle = seoData?.title || `${service.name} ${area.name} | فني تصليح الكويت`;
  const pageDescription = seoData?.description || `${service.name} في ${area.name}، الكويت. فنيين موثوقين، تواصل مباشر عبر واتساب. أسعار مناسبة.`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: seoData?.keywords || `${service.name} ${area.name}, فني ${service.name} ${area.name}`,
    alternates: {
      canonical: `https://fannifix.com/kw/${service.slug}/${area.slug}`,
    },
  };
}

export default async function KuwaitServiceAreaPage({ params }: PageProps) {
  const { serviceSlug, areaSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const area = getAreaBySlug(areaSlug, "kw");
  const country = getCountryByCode("kw");
  const kuwaitAreas = getAreasByCountry("kw");
  
  if (!service || !area) {
    notFound();
  }

  const technicians = searchTechnicians({
    serviceId: service.id,
    countryCode: "kw",
    areaId: area.id,
  });

  // Get SEO data for service description
  const seoData = getSeoForPage('kw', 'service', service.id);
  const serviceDescription = seoData?.service_description || service.name;

  const breadcrumbItems = [
    { label: country?.name || "الكويت", href: "/kw" },
    { label: service.name, href: `/kw/${service.slug}` },
    { label: area.name },
  ];

  // Get FAQs from JSON (data-driven)
  const faqs = getFaqs('kw', 'service_area', service.name, area.name);

  // Get pricing from JSON (data-driven)
  const pricing = getPricing('kw');

  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'الكويت', url: 'https://fannifix.com/kw' },
    { name: service.name, url: `https://fannifix.com/kw/${service.slug}` },
    { name: area.name, url: `https://fannifix.com/kw/${service.slug}/${area.slug}` },
  ]);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      
      <main className="pt-24">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-12 mb-8 text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">{country?.flag}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">الكويت</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {service.name} في {area.name}
            </h1>
            
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              {service.description}
            </p>
            
            <div className="flex flex-wrap gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{technicians.length} فني متاح</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-accent text-accent" />
                <span>تقييم 4.8 متوسط</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{area.name}</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar 
              variant="compact" 
              initialService={service.id}
              initialArea={area.id}
            />
          </div>

          {/* How to Choose Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">كيف تختار فني {service.name} موثوق في {area.name}؟</h2>
            <div className="bg-muted/30 rounded-2xl p-6 md:p-8">
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">1.</span>
                  <span><strong className="text-foreground">تحقق من التقييمات:</strong> اقرأ تقييمات العملاء في {area.name}.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">2.</span>
                  <span><strong className="text-foreground">اسأل عن الخبرة:</strong> تأكد من سنوات الخبرة في {service.name}.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">3.</span>
                  <span><strong className="text-foreground">اطلب تقدير سعر:</strong> احصل على تقدير واضح قبل البدء.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Pricing Section */}
          {pricing && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">أسعار {service.name} في {area.name}</h2>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/50 rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-2">الكشف</h3>
                    <p className="text-2xl font-bold text-primary">{pricing.inspection}</p>
                  </div>
                  <div className="bg-white/50 rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-2">الصيانة البسيطة</h3>
                    <p className="text-2xl font-bold text-primary">{pricing.basic_maintenance}</p>
                  </div>
                  <div className="bg-white/50 rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-2">الصيانة الشاملة</h3>
                    <p className="text-2xl font-bold text-primary">{pricing.comprehensive_maintenance}</p>
                  </div>
                  <div className="bg-white/50 rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-2">التركيب</h3>
                    <p className="text-2xl font-bold text-primary">{pricing.installation}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  * {pricing.disclaimer}
                </p>
              </div>
            </section>
          )}

          {/* Technicians Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              فنيين {service.name} في {area.name}
            </h2>
            
            {technicians.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {technicians.map((tech) => (
                  <TechnicianCard key={tech.id} technician={tech} showFullDetails />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-2xl">
                <p className="text-muted-foreground mb-4">
                  لا يوجد فنيين متاحين حالياً في هذه المنطقة
                </p>
                <Link href="/kw/add-listing">
                  <Button className="btn-primary">
                    هل أنت فني؟ أضف إعلانك مجاناً
                  </Button>
                </Link>
              </div>
            )}
          </section>

          {/* Other Areas */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">{service.name} في مناطق أخرى</h2>
            <div className="flex flex-wrap gap-2">
              {kuwaitAreas.filter(a => a.id !== area.id).map((a) => (
                <Link
                  key={a.id}
                  href={`/kw/${service.slug}/${a.slug}`}
                  className="px-4 py-2 bg-muted hover:bg-primary hover:text-white rounded-full text-sm transition-colors"
                >
                  {service.name} في {a.name}
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <FAQSection 
              title={`أسئلة شائعة عن ${service.name} في ${area.name}`}
              faqs={faqs}
            />
          )}

          {/* CTA Section */}
          <section className="my-12 bg-accent/10 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              هل أنت فني {service.name}؟
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              أضف إعلانك مجاناً وابدأ باستقبال طلبات العملاء في منطقتك
            </p>
            <Link href="/kw/add-listing">
              <Button className="btn-accent text-lg px-8 py-6">
                أضف إعلانك الآن — مجاناً
              </Button>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

