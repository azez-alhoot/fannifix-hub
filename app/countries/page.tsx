import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  countries,
  getAreasByCountry,
  getTechniciansByCountry,
} from "@/data";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "الدول المتاحة | فني فيكس",
  description:
    "تصفح خدمات فني فيكس في الكويت والسعودية والإمارات وقطر. ابحث عن فنيين محترفين في دولتك.",
};

export default function CountriesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: "الدول" }]} />

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              نخدمك في أربع دول خليجية
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              اختر دولتك للوصول إلى الفنيين المتاحين في منطقتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {countries.map((country, index) => {
              const areas = getAreasByCountry(country.code);
              const technicians = getTechniciansByCountry(country.code);

              return (
                <Link
                  key={country.code}
                  href={`/country/${country.code}`}
                  className="bg-white rounded-2xl p-8 border border-border hover:shadow-xl transition-all group opacity-0 animate-fade-up"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl">{country.flag}</span>
                      <div>
                        <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                          {country.name}
                        </h2>
                        <p className="text-muted-foreground">
                          {country.nameEn}
                        </p>
                      </div>
                    </div>
                    <ArrowLeft className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:-translate-x-2 transition-all" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary">
                        {technicians.length}+
                      </div>
                      <div className="text-sm text-muted-foreground">فني</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary">
                        {areas.length}+
                      </div>
                      <div className="text-sm text-muted-foreground">منطقة</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

