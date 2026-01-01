import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MessageCircle, Shield, CheckCircle2, Clock } from "lucide-react";
import { getCtaContent } from "@/data";

export default function AddListingPage() {
  const ctaContent = getCtaContent('kw');

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-6">
              <span className="text-xl">🇰🇼</span>
              <span className="text-sm font-medium text-accent-foreground">
                الكويت
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              أضف إعلانك مجاناً
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {ctaContent?.technician_description || "انضم لشبكة فني فيكس وابدأ باستقبال طلبات العملاء في منطقتك"}
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {[
              {
                icon: Shield,
                title: "مجاني 100%",
                desc: "بدون رسوم أو عمولة",
              },
              {
                icon: MessageCircle,
                title: "تواصل مباشر",
                desc: "العملاء يتصلون بك مباشرة",
              },
              {
                icon: CheckCircle2,
                title: "موافقة سريعة",
                desc: "خلال 24 ساعة",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* WhatsApp Contact Section */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg text-center">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                تواصل معنا عبر واتساب
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                للانضمام إلى منصة فني فيكس، تواصل معنا عبر واتساب وسنساعدك في إضافة إعلانك.
                <br />
                <span className="font-semibold text-foreground">
                  سنقوم بإضافة بياناتك يدوياً خلال 24 ساعة
                </span>
              </p>

              {/* Information to Provide */}
              <div className="bg-muted/50 rounded-xl p-6 mb-8 text-right">
                <h3 className="font-bold mb-4 flex items-center gap-2 justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                  المعلومات المطلوبة:
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                  <li>• الاسم الكامل</li>
                  <li>• نوع الخدمة (تكييف، كهربائي، سباك، إلخ)</li>
                  <li>• المناطق التي تخدمها</li>
                  <li>• رقم الواتساب</li>
                  <li>• سنوات الخبرة (اختياري)</li>
                  <li>• السعر التقديري (اختياري)</li>
                </ul>
              </div>

              {/* WhatsApp Button */}
              <WhatsAppButton
                phoneNumber="965"
                text="تواصل معنا عبر واتساب لإضافة إعلانك"
                className="h-14 text-lg px-8 shadow-lg hover:shadow-xl transition-all"
              />

              <p className="text-xs text-muted-foreground mt-6">
                بالتواصل معنا فإنك توافق على{" "}
                <a href="#" className="text-primary hover:underline">
                  شروط الاستخدام
                </a>{" "}
                و{" "}
                <a href="#" className="text-primary hover:underline">
                  سياسة الخصوصية
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
