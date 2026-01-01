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
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { MapPin, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{
    serviceSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  
  if (!service) {
    return {
      title: "الخدمة غير موجودة",
    };
  }

  // Get SEO from JSON (data-driven)
  const seoData = getSeoForPage('kw', 'service', service.id);
  const technicians = searchTechnicians({
    serviceId: service.id,
    countryCode: "kw",
  });

  // Fallback if SEO not found
  const pageTitle = seoData?.title || `${service.name} الكويت | فني تصليح`;
  const pageDescription = seoData?.description || `ابحث عن ${service.name} في جميع مناطق الكويت. ${technicians.length}+ فني متاح. تواصل مباشر، أسعار مناسبة.`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: seoData?.keywords || `${service.name} الكويت, فني ${service.name}`,
    alternates: {
      canonical: `https://fannifix.com/kw/${service.slug}`,
    },
  };
}

export default async function KuwaitServicePage({ params }: PageProps) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const country = getCountryByCode("kw");
  const kuwaitAreas = getAreasByCountry("kw");
  
  if (!service) {
    notFound();
  }

  const technicians = searchTechnicians({
    serviceId: service.id,
    countryCode: "kw",
  });

  // Get SEO data for service description
  const seoData = getSeoForPage('kw', 'service', service.id);
  const serviceDescription = seoData?.service_description || service.name;

  const breadcrumbItems = [
    { label: country?.name || "الكويت", href: "/kw" },
    { label: service.name, href: `/kw/${service.slug}` },
  ];

  // Get FAQs from JSON (data-driven)
  const faqs = getFaqs('kw', 'service', service.name);

  // Get pricing from JSON (data-driven)
  const pricing = getPricing('kw');

  // Generate structured data
  const serviceSchema = generateServiceSchema({
    name: service.name,
    description: serviceDescription,
    slug: service.slug,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'الكويت', url: 'https://fannifix.com/kw' },
    { name: service.name, url: `https://fannifix.com/kw/${service.slug}` },
  ]);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
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
              {service.name} في الكويت
            </h1>
            
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              {serviceDescription}
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
                <span>{kuwaitAreas.length} منطقة مغطاة</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar 
              variant="compact" 
              initialService={service.id}
            />
          </div>

          {/* Area Quick Links */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">تصفح {service.name} حسب المنطقة</h2>
            <div className="flex flex-wrap gap-2">
              {kuwaitAreas.map((a) => (
                <Link
                  key={a.id}
                  href={`/kw/${service.slug}/${a.slug}`}
                  className="px-4 py-2 bg-muted hover:bg-primary hover:text-white rounded-full text-sm transition-colors"
                >
                  {a.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Technicians Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              فنيين {service.name} في الكويت
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

          {/* How to Choose Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">كيف تختار فني {service.name} موثوق؟</h2>
            <div className="bg-muted/30 rounded-2xl p-6 md:p-8">
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">1.</span>
                  <span><strong className="text-foreground">تحقق من التقييمات والآراء:</strong> اقرأ تقييمات العملاء السابقين للتأكد من جودة الخدمة.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">2.</span>
                  <span><strong className="text-foreground">اسأل عن الخبرة:</strong> تأكد من سنوات الخبرة في مجال {service.name}.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">3.</span>
                  <span><strong className="text-foreground">اطلب تقدير سعر:</strong> احصل على تقدير واضح للأسعار قبل البدء بالعمل.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">4.</span>
                  <span><strong className="text-foreground">تأكد من التغطية:</strong> تحقق من أن الفني يغطي منطقتك في الكويت.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Pricing Section */}
          {pricing && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">أسعار تقريبية لـ {service.name} في الكويت</h2>
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
                <p className="text-sm text-muted-foreground mt-4">
                  * {pricing.disclaimer}
                </p>
              </div>
            </section>
          )}

          {/* Other Services */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">خدمات أخرى في الكويت</h2>
            <div className="flex flex-wrap gap-2">
              {services.filter(s => s.id !== service.id).slice(0, 6).map((s) => (
                <Link
                  key={s.id}
                  href={`/kw/${s.slug}`}
                  className="px-4 py-2 bg-muted hover:bg-primary hover:text-white rounded-full text-sm transition-colors"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <FAQSection 
              title={`أسئلة شائعة عن ${service.name} في الكويت`}
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

