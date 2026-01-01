import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { TechnicianCard } from "@/components/TechnicianCard";
import { FAQSection } from "@/components/FAQSection";
import { CoveredAreasSection } from "@/components/CoveredAreasSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { 
  services, 
  getAreasByCountry,
  getFeaturedTechnicians,
  getTechniciansByCountry,
  getCountryByCode,
  getSeoForPage,
  getFaqs,
  getHeroContent,
  getCtaContent
} from "@/data";
import { 
  Wind, 
  Refrigerator, 
  WashingMachine, 
  Zap, 
  Droplets, 
  Satellite, 
  Hammer, 
  Wrench,
  Camera,
  Shield,
  MessageCircle,
  Banknote,
  MapPin,
  LucideIcon
} from "lucide-react";
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
  Shield,
};

// Get SEO from JSON (data-driven)
const seoData = getSeoForPage('kw', 'default');

export const metadata: Metadata = {
  title: seoData?.title || "فني تصليح الكويت | فنيين موثوقين تواصل مباشر",
  description: seoData?.description || "ابحث عن فني تكييف، كهربائي، سباك في الكويت.",
  keywords: seoData?.keywords,
  alternates: {
    canonical: "https://fannifix.com/kw",
  },
};

export default function KuwaitLandingPage() {
  const country = getCountryByCode("kw");
  const kuwaitAreas = getAreasByCountry("kw");
  const featuredTechnicians = getFeaturedTechnicians().slice(0, 6);
  const allKuwaitTechnicians = getTechniciansByCountry("kw");

  // Get all content from JSON (data-driven)
  const faqs = getFaqs('kw', 'default');
  const heroContent = getHeroContent('kw');
  const ctaContent = getCtaContent('kw');

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 hero-gradient" />
          
          {/* Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-2xl floating-element" />
          <div className="absolute bottom-40 right-20 w-32 h-32 bg-white/10 rounded-full blur-3xl floating-element-delayed" />

          <div className="container mx-auto relative z-10 pt-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Kuwait Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-up">
                <span className="text-2xl">{country?.flag}</span>
                <span className="text-white/90 font-medium">الكويت</span>
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              </div>

              {/* Value Proposition - Clear and Visible */}
              <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-full px-6 py-3 mb-8 animate-fade-up stagger-0">
                <div className="flex items-center gap-2 text-white/95 text-sm md:text-base font-medium">
                  <Shield className="w-4 h-4" />
                  <span>فنيين موثوقين في الكويت</span>
                </div>
                <div className="w-1 h-4 bg-white/30 rounded-full" />
                <div className="flex items-center gap-2 text-white/95 text-sm md:text-base font-medium">
                  <MessageCircle className="w-4 h-4" />
                  <span>تواصل مباشر</span>
                </div>
                <div className="w-1 h-4 bg-white/30 rounded-full" />
                <div className="flex items-center gap-2 text-white/95 text-sm md:text-base font-medium">
                  <Banknote className="w-4 h-4" />
                  <span>بدون عمولة</span>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-relaxed animate-fade-up stagger-1">
                {heroContent?.headline || "أسرع طريقة لإيجاد فني مناسب في الكويت"}
              </h1>

              {/* Sub-headline */}
              <p className="text-lg md:text-xl text-white/80 mb-14 leading-relaxed animate-fade-up stagger-2">
                {heroContent?.subheadline || "فنيين موثوقين في التكييف، الكهرباء، السباكة، الغسالات والثلاجات — تواصل مباشر بدون عمولة"}
              </p>

              {/* Search Box */}
              <div className="animate-fade-up stagger-3">
                <SearchBar variant="hero" />
                {/* User Guidance Helper Text */}
                <p className="text-white/80 text-sm md:text-base mt-4 animate-fade-up stagger-4">
                  {heroContent?.search_placeholder || "اختر فني حسب منطقتك وتواصل فورًا"}
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-up stagger-4">
                {[
                  { number: `${allKuwaitTechnicians.length}+`, label: "فني في الكويت" },
                  { number: `${kuwaitAreas.length}`, label: "منطقة مغطاة" },
                  { number: "4.8", label: "متوسط التقييم" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-white">{stat.number}</div>
                    <div className="text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="hsl(var(--background))"
              />
            </svg>
          </div>
        </section>

        {/* Social Proof Section - Lightweight */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {allKuwaitTechnicians.length}+
                </div>
                <div className="text-sm md:text-base text-gray-600 font-medium">عدد الفنيين</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-gray-200" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {Math.floor(allKuwaitTechnicians.length * 15)}+
                </div>
                <div className="text-sm md:text-base text-gray-600 font-medium">عدد العملاء</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-gray-200" />
              <div className="text-center max-w-xs">
                <p className="text-sm md:text-base text-gray-700 font-medium">
                  منصة متخصصة في خدمات الصيانة بالكويت
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">خدماتنا في الكويت</h2>
            <p className="section-subtitle">اختر الخدمة التي تحتاجها وابدأ البحث</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Wrench;
              return (
                <Link
                  key={service.id}
                  href={`/kw/${service.slug}`}
                  className="service-card group text-center"
                >
                  <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{service.name}</h3>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Technicians */}
        {featuredTechnicians.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="section-title mb-2">فنيين مميزين في الكويت</h2>
                  <p className="text-muted-foreground">فنيين موثوقين بتقييمات عالية · تواصل مباشر عبر واتساب</p>
                </div>
                <Link href="/kw/technicians">
                  <Button variant="outline">عرض الكل</Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredTechnicians.map((tech, index) => (
                  <div 
                    key={tech.id} 
                    className={index === 0 ? "relative" : ""}
                  >
                    {index === 0 && (
                      <div className="absolute -top-3 -right-3 z-10 bg-accent text-[#1E293B] text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                        ابدأ من هنا
                      </div>
                    )}
                    <TechnicianCard technician={tech} showFullDetails />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Covered Areas Section */}
        <CoveredAreasSection />

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="section-title">لماذا فني تصليح؟</h2>
              <p className="section-subtitle">ما يميزنا عن غيرنا</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: "فنيين موثوقين",
                  description: "جميع الفنيين مسجلين مع تقييمات حقيقية من العملاء",
                  color: "bg-blue-500",
                },
                {
                  icon: MessageCircle,
                  title: "تواصل مباشر",
                  description: "تواصل مع الفني مباشرة عبر واتساب دون وسيط",
                  color: "bg-green-500",
                },
                {
                  icon: Banknote,
                  title: "بدون عمولة",
                  description: "لا رسوم خفية أو عمولة. الخدمة مجانية للعملاء",
                  color: "bg-yellow-500",
                },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-card hover:shadow-card-hover transition-shadow">
                  <div className={`w-16 h-16 mx-auto ${item.color} rounded-xl flex items-center justify-center mb-6`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 container mx-auto px-4">
          <FAQSection 
            title="أسئلة شائعة عن خدماتنا في الكويت"
            faqs={faqs}
          />
        </section>

        {/* Final CTA - For Users Who Didn't Find Technician */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10 border-t border-primary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              {ctaContent?.user || "لم تجد الفني المناسب؟"}
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
              {ctaContent?.user_description || "تواصل معنا وسنساعدك في العثور على أفضل فني لاحتياجاتك"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WhatsAppButton 
                phoneNumber="965"
                text="تواصل معنا عبر واتساب"
                className="h-12 px-8 shadow-lg hover:shadow-xl transition-all"
              />
              <Link href="/kw/add-listing">
                <Button variant="outline" className="h-12 px-8">
                  هل أنت فني؟ أضف إعلانك
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section - For Technicians */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {ctaContent?.technician || "هل أنت فني؟ أضف إعلانك الآن — مجاناً"}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {ctaContent?.technician_description || "انضم لشبكة فني تصليح وابدأ باستقبال طلبات العملاء في منطقتك"}
            </p>
            <Link href="/kw/add-listing">
              <Button className="btn-accent text-lg px-8 py-6">
                أضف إعلانك مجاناً
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

