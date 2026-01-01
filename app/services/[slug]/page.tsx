import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TechnicianCard } from "@/components/TechnicianCard";
import { ServiceCard } from "@/components/ServiceCard";
import {
  getServiceBySlug,
  getTechniciansByService,
  services,
} from "@/data";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "الخدمة غير موجودة",
    };
  }

  return {
    title: `${service.name} | فني تصليح`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const technicians = getTechniciansByService(service.id);
  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 4);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto">
          <Breadcrumb
            items={[
              { label: "الخدمات", href: "/services" },
              { label: service.name },
            ]}
          />

          {/* Hero */}
          <div
            className={`bg-gradient-to-br ${service.color} rounded-2xl p-8 md:p-12 text-white mb-12`}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {service.name}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl">
              {service.description}
            </p>
            <div className="mt-6">
              <span className="bg-white/20 rounded-full px-4 py-2">
                {technicians.length} فني متاح
              </span>
            </div>
          </div>

          {/* Technicians */}
          <h2 className="text-2xl font-bold mb-6">فنيون متاحون</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {technicians.map((tech) => (
              <TechnicianCard key={tech.id} technician={tech} />
            ))}
          </div>

          {/* Other Services */}
          <h2 className="text-2xl font-bold mb-6">خدمات أخرى</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

