import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ServiceCard } from "@/components/ServiceCard";
import { services, getTechniciansByService } from "@/data";

export const metadata: Metadata = {
  title: "جميع الخدمات | فني فيكس",
  description:
    "تصفح جميع خدمات الصيانة المتاحة: كهربائي، سباك، فني تكييف، نجار، حداد وغيرها في الكويت والخليج.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: "الخدمات" }]} />

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              جميع خدمات الصيانة
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              اختر الخدمة التي تحتاجها واعثر على أفضل الفنيين في منطقتك
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="opacity-0 animate-fade-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                <ServiceCard
                  service={service}
                  technicianCount={getTechniciansByService(service.id).length}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

