import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TechnicianCard } from "@/components/TechnicianCard";
import { SearchBar } from "@/components/SearchBar";
import { FAQSection } from "@/components/FAQSection";
import { AreaChip } from "@/components/AreaChip";
import {
  services,
  getAreaBySlug,
  getKuwaitAreas,
  searchTechnicians,
  getCountryByCode,
  getKuwaitAreasByGovernorate
} from "@/data";
import { MapPin, Users, Star, Wrench, Wind, Refrigerator, WashingMachine, Zap, Droplets, Hammer, Satellite, Camera, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, LucideIcon> = {
  Wind,
  Refrigerator,
  WashingMachine,
  Zap,
  Droplets,
  Satellite,
  Hammer,
  Wrench,
  Camera,
};

interface PageProps {
  params: Promise<{
    areaSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { areaSlug } = await params;
  const area = getAreaBySlug(areaSlug, "kw");
  
  if (!area) {
    return {
      title: "الصفحة غير موجودة",
    };
  }

  const technicians = searchTechnicians({
    countryCode: "kw",
    areaId: area.id,
  });

  const pageTitle = `فنيين في ${area.name} - الكويت | فني تصليح`;
  const pageDescription = `ابحث عن أفضل الفنيين في ${area.name}، الكويت. ${technicians.length}+ فني متاح في التكييف، الكهرباء، السباكة، الغسالات والثلاجات. تواصل مباشر، بدون عمولة.`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: `فنيين ${area.name}, صيانة ${area.name}, فني تكييف ${area.name}, كهربائي ${area.name}, سباك ${area.name}, فني غسالات ${area.name}, فني ثلاجات ${area.name}`,
  };
}

export default async function KuwaitAreaPage({ params }: PageProps) {
  const { areaSlug } = await params;
  const area = getAreaBySlug(areaSlug, "kw");
  const country = getCountryByCode("kw");
  const kuwaitAreas = getKuwaitAreas();
  
  if (!area) {
    notFound();
  }

  const technicians = searchTechnicians({
    countryCode: "kw",
    areaId: area.id,
  });

  // Get services available in this area
  const areaServices = services.filter(service => {
    const serviceTechnicians = searchTechnicians({
      serviceId: service.id,
      countryCode: "kw",
      areaId: area.id,
    });
    return serviceTechnicians.length > 0;
  });

  const breadcrumbItems = [
    { label: "الكويت", href: "/kw" },
    { label: area.name },
  ];

  const faqs = [
    {
      question: `كم تكلفة الخدمات في ${area.name}؟`,
      answer: `تختلف الأسعار حسب نوع الخدمة والعمل المطلوب. الكشف يبدأ عادة من 5-10 د.ك. يمكنك التواصل مباشرة مع الفني للحصول على تقدير دقيق للسعر.`,
    },
    {
      question: `هل الفنيين في ${area.name} موثوقين؟`,
      answer: `نعم، جميع الفنيين مسجلين ولديهم تقييمات حقيقية من العملاء. يمكنك رؤية التقييمات قبل التواصل.`,
    },
    {
      question: `كيف أتواصل مع الفنيين في ${area.name}؟`,
      answer: `يمكنك التواصل مباشرة عبر واتساب أو الاتصال الهاتفي من خلال صفحة الفني. لا يوجد وسيط.`,
    },
    {
      question: `ما هي الخدمات المتاحة في ${area.name}؟`,
      answer: `نوفر جميع خدمات الصيانة المنزلية في ${area.name}: التكييف، الكهرباء، السباكة، الغسالات، الثلاجات، والأجهزة المنزلية الأخرى.`,
    },
  ];

  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      
      <main className="pt-24">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-12 mb-8 text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">{country?.flag}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">الكويت</span>
              {area.governorate && (
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {area.governorate}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              فنيين في {area.name}
            </h1>
            
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              فنيين موثوقين في جميع خدمات الصيانة المنزلية — تواصل مباشر بدون عمولة
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
              initialArea={area.id}
            />
          </div>

          {/* Services Available in Area */}
          {areaServices.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                الخدمات المتاحة في {area.name}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {areaServices.map((service) => {
                  const serviceTechnicians = searchTechnicians({
                    serviceId: service.id,
                    countryCode: "kw",
                    areaId: area.id,
                  });
                  const Icon = iconMap[service.icon] || Wrench;
                  
                  return (
                    <Link
                      key={service.id}
                      href={`/kw/${service.slug}/${area.slug}`}
                      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center group"
                    >
                      <div className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-sm mb-1">{service.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {serviceTechnicians.length} فني
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Technicians Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              فنيين في {area.name}
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
                  لا يوجد فنيين متاحين حالياً في {area.name}
                </p>
                <Link href="/kw/add-listing">
                  <Button className="btn-primary">
                    هل أنت فني؟ أضف إعلانك مجاناً
                  </Button>
                </Link>
              </div>
            )}
          </section>

          {/* Other Areas in Same Governorate */}
          {area.governorate && (
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4">
                مناطق أخرى في {area.governorate}
              </h2>
              <div className="flex flex-wrap gap-2">
                {kuwaitAreas
                  .filter(a => a.governorate === area.governorate && a.id !== area.id)
                  .map((a) => (
                    <AreaChip key={a.id} area={a} />
                  ))}
              </div>
            </section>
          )}

          {/* Other Areas */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">مناطق أخرى في الكويت</h2>
            <div className="flex flex-wrap gap-2">
              {kuwaitAreas
                .filter(a => a.id !== area.id)
                .slice(0, 12)
                .map((a) => (
                  <AreaChip key={a.id} area={a} />
                ))}
            </div>
          </section>

          {/* FAQ Section */}
          <FAQSection 
            title={`أسئلة شائعة عن الفنيين في ${area.name}`}
            faqs={faqs}
          />

          {/* CTA Section */}
          <section className="my-12 bg-accent/10 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              هل أنت فني في {area.name}؟
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

