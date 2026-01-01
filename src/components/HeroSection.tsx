import { Search, MapPin, Wrench, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
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
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-accent/30 rounded-full blur-xl floating-element" />

      {/* Decorative Icons */}
      <div className="absolute top-32 left-1/4 text-white/20 floating-element">
        <Wrench className="w-12 h-12" />
      </div>
      <div className="absolute bottom-32 left-1/3 text-white/20 floating-element-delayed">
        <Zap className="w-10 h-10" />
      </div>
      <div className="absolute top-1/2 left-20 text-white/20 floating-element">
        <Shield className="w-8 h-8" />
      </div>

      <div className="container mx-auto relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-up">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              +5000 فني موثوق في الخليج
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-fade-up stagger-1">
            أسرع طريقة لإيجاد
            <br />
            <span className="relative">
              فني مناسب
              <svg className="absolute -bottom-2 left-0 right-0 w-full" height="8" viewBox="0 0 200 8">
                <path d="M0 8 Q 100 2, 200 10" stroke="#FACC15" strokeWidth="3" fill="none" />
              </svg>
            </span>
            {" "}في الكويت والخليج
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-white/80 mb-10 animate-fade-up stagger-2">
            ابحث عن فني صيانة… خلال ثواني.
          </p>

          {/* Search Box */}
          <div className="animate-fade-up stagger-3">
            <SearchBar variant="hero" />
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 animate-fade-up stagger-4">
            {[
              { number: "5000+", label: "فني مسجل" },
              { number: "4", label: "دول في الخليج" },
              { number: "50K+", label: "عميل سعيد" },
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
  );
};
