import { Wrench, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "إنشاء ملف شخصي احترافي",
  "الوصول إلى آلاف العملاء",
  "إدارة إعلاناتك بسهولة",
  "تلقي الطلبات مباشرة",
];

export const CTASection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-accent/20 rounded-full blur-xl floating-element" />
      <div className="absolute bottom-10 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl floating-element-delayed" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-6">
                  <Wrench className="w-4 h-4 text-primary" />
                  <span className="text-primary font-medium text-sm">للفنيين فقط</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  هل أنت فني؟
                  <br />
                  <span className="text-primary">أضف إعلانك الآن</span>
                </h2>

                <p className="text-muted-foreground mb-6">
                  انضم إلى آلاف الفنيين واحصل على عملاء جدد كل يوم. التسجيل مجاني ويستغرق دقيقة واحدة فقط.
                </p>

                {/* Benefits */}
                <ul className="space-y-3 mb-8">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button size="lg" className="btn-accent gap-2 text-lg px-8">
                  أضف إعلان الآن
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </div>

              {/* Illustration */}
              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl" />
                <div className="relative p-8">
                  {/* Stats Cards */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl">📈</span>
                        </div>
                        <div>
                          <div className="font-bold text-foreground">+300%</div>
                          <div className="text-sm text-muted-foreground">زيادة في العملاء</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-lg mr-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl">⭐</span>
                        </div>
                        <div>
                          <div className="font-bold text-foreground">4.9/5</div>
                          <div className="text-sm text-muted-foreground">متوسط تقييم الفنيين</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-lg ml-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl">💰</span>
                        </div>
                        <div>
                          <div className="font-bold text-foreground">مجاناً</div>
                          <div className="text-sm text-muted-foreground">إضافة الإعلان الأول</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
