import { Shield, MessageCircle, Banknote, MapPin, Clock, ThumbsUp } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "فنيين موثوقين",
    description: "جميع الفنيين مسجلين ومعتمدين مع تقييمات حقيقية من العملاء",
    color: "bg-blue-500",
  },
  {
    icon: MessageCircle,
    title: "تواصل مباشر",
    description: "تواصل مع الفني مباشرة عبر الواتساب أو الهاتف دون وسيط",
    color: "bg-green-500",
  },
  {
    icon: Banknote,
    title: "أسعار واضحة",
    description: "تعرف على الأسعار التقديرية مسبقاً قبل حجز الخدمة",
    color: "bg-yellow-500",
  },
  {
    icon: MapPin,
    title: "يغطي كل المناطق",
    description: "خدماتنا تغطي جميع مناطق الكويت والخليج العربي",
    color: "bg-purple-500",
  },
  {
    icon: Clock,
    title: "استجابة سريعة",
    description: "احصل على ردود سريعة من الفنيين في منطقتك",
    color: "bg-orange-500",
  },
  {
    icon: ThumbsUp,
    title: "ضمان الجودة",
    description: "تقييمات ومراجعات حقيقية تضمن جودة الخدمة",
    color: "bg-cyan-500",
  },
];

export const WhySection = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold mb-3">
            لماذا فني تصليح؟
          </span>
          <h2 className="section-title">
            نوفر لك أفضل تجربة للعثور على فني
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            منصة موثوقة تجمع بين العملاء والفنيين المحترفين في مكان واحد
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 group opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${benefit.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-card">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50,000+", label: "عميل سعيد" },
              { number: "5,000+", label: "فني مسجل" },
              { number: "100+", label: "منطقة مغطاة" },
              { number: "4.8", label: "متوسط التقييم" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
