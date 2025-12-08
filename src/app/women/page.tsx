"use client";

import Image from "next/image";
import { Navbar } from "@/components/navigation/navbar";
import Footer from "@/components/sections/footer";
import { useLanguage } from "@/contexts/language-context";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Droplets,
  HandHeart,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

const trustPoints = [
  {
    title: "Seçili kuaförler",
    description: "Ekibe katılan her kuaför, deneyim ve referans kontrolünden geçiyor.",
    icon: ShieldCheck,
  },
  {
    title: "Tek kullanımlık malzeme",
    description: "İstersen tarak, havlu, fırça gibi ürünleri yalnızca senin için açıyoruz.",
    icon: Droplets,
  },
  {
    title: "Mahremiyet ve saygı",
    description: "Evinin fotoğrafını paylaşmak zorunda değilsin, konum yeterli.",
    icon: HandHeart,
  },
];

const testimonials = [
  { name: "M***** A.", quote: "Salona gitmeye vaktim yoktu, evde fön yaptırmak inanılmaz rahatmış. 35 dakikada hazırdım, keşke daha önce deneseymişim." },
  { name: "S****** Y.", quote: "Saçım çok kabarık olduğu için her yerde düzgün fön çekilmiyor. Gelen kuaför gerçekten profesyoneldi, sonuç mükemmel oldu." },
  { name: "G****** K.", quote: "Küçük bebeğim olduğu için dışarı çıkamıyorum. Kuaförün eve gelmesi hayat kurtardı resmen. Hem hijyenik hem pratik." },
  { name: "B******* T.", quote: "Akşam 9 gibi randevu alabildim, yoğun çalışan biri olarak bu esneklik inanılmaz iyi. Salon kalitesinde hizmet aldım." },
  { name: "D****** R.", quote: "Boya konusunda çok titizim, evde yapılır mı diye tereddüt ettim ama sonuç tertemiz oldu. Her şeyi kendi getirdiler." },
  { name: "E***** L.", quote: "Özel gün için saçımı evde yaptırdım. Hazırlık stresim sıfıra indi, sonuç da fotoğraflarda çok iyi çıktı." },
  { name: "A****** N.", quote: "Biraz geç kaldılar ama işçilik çok iyiydi. Özellikle maşa tam istediğim gibi doğal dalga oldu." },
  { name: "Z******* Ç.", quote: "Arkadaşım önermişti. Mahremiyet konusunda endişem vardı ama gelen kuaför çok profesyonel ve saygılıydı. Gönül rahatlığıyla alabilirsiniz." },
];

const gallery = [
  { image: "/women/galeri-1.jpg" },
  { image: "/women/galeri-2.jpg" },
  { image: "/women/galeri-3.jpg" },
];

const steps = [
  {
    title: "WhatsApp'tan yaz",
    description: "Bize tarihini, saatini ve istediğin işlemi yaz.",
  },
  {
    title: "Uygun kuaför eşleşsin",
    description: "Konumuna en yakın, müsait ve uzman kuaförü eşleştiriyoruz.",
  },
  {
    title: "Evinde hizmet al",
    description: "Kuaförün belirlediğin saatte kapında.",
  },
];

const faqs = [
  {
    question: "Evime gelen kuaför güvenilir mi?",
    answer: "Ekibimize katılan kuaförlerin kimlik, referans ve deneyim kontrolü yapılıyor.",
  },
  {
    question: "Fiyatlar sabit mi?",
    answer: "İşleme ve saç uzunluğuna göre değişiyor. Net fiyatı randevu öncesi WhatsApp'tan yazılı olarak paylaşıyoruz.",
  },
  {
    question: "Sadece kadın kuaför isteyebilir miyim?",
    answer: "Evet, talebine göre yalnızca kadın kuaför yönlendirebiliriz.",
  },
  {
    question: "İptal edebilir miyim?",
    answer: "Randevundan en geç 6 saat önce ücretsiz iptal edebilirsin.",
  },
];

export default function LandingPageWomen() {
  const { config } = useLanguage();
  const accent = config?.brand?.colors?.text ?? "#ff7778";
  const whatsappColor = "#25D366";
  const whatsappNumber = config?.links?.whatsapp || "https://wa.me/905015260754";
  const whatsappMessage =
    "Merhaba Bimakas, evde kuaför hizmeti için randevu almak istiyorum. İşlem: (saç kesimi/fön/boya...), Tarih: ___ , Saat: ___ .";
  const whatsappLink = `${whatsappNumber}${whatsappNumber.includes("?") ? "&" : "?"}text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-[#FFF8F0] via-white to-[#FFE4E6] pt-16 text-gray-900">
        <section id="hero" className="px-6 lg:px-8 py-16 lg:py-24">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-white/80 ring-1 ring-white/60">
            <Image
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
              alt="Evde kuaför hizmeti alan kadın"
              fill
              className="object-cover sm:hidden"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-[#fff8f0]/25 sm:hidden" />

            <div className="relative grid grid-cols-1 gap-12 bg-white/80 px-6 py-10 lg:grid-cols-2 lg:px-10 lg:py-12">
              <div className="space-y-6 text-gray-900">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/30 backdrop-blur sm:bg-white/85 sm:text-gray-900 sm:ring-white/70" style={{ backgroundColor: accent }}>
                  <Sparkles className="h-4 w-4 text-white sm:text-amber-500" />
                  Evde kuaför hizmeti • kadın odaklı
                </div>
                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                  kuaför değil, konfor istiyorum diyen kadınlar için evde kuaför hizmeti
                </h1>
                <p className="text-lg text-gray-800 sm:text-gray-700">
                  Boya, fön, maşa, bakım… hepsi evinin rahatlığında. Salonda sıra bekleme, trafiğe girme.
                  Güven, hijyen ve mahremiyet önceliğimiz.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href={whatsappLink}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:scale-[1.01]"
                    style={{ backgroundColor: whatsappColor }}
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp'tan randevu al
                  </a>
                  <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-white shadow-sm ring-1 ring-white/25 backdrop-blur sm:bg-white/85 sm:text-gray-800 sm:ring-white/70" style={{ backgroundColor: accent }}>
                    <div className="flex items-center text-amber-300 sm:text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300 sm:fill-amber-400 sm:text-amber-500" />
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">4.9/5 memnuniyet</p>
                      <p className="text-xs text-white/80 sm:text-gray-600">1.200+ randevu</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-white sm:text-gray-700">
                  <span className="rounded-full px-3 py-1 shadow-sm ring-1 ring-white/25 backdrop-blur sm:bg-white/85 sm:text-gray-700 sm:ring-white/70" style={{ backgroundColor: accent }}>Hijyen ve mahremiyet</span>
                  <span className="rounded-full px-3 py-1 shadow-sm ring-1 ring-white/25 backdrop-blur sm:bg-white/85 sm:text-gray-700 sm:ring-white/70" style={{ backgroundColor: accent }}>Esnek saatler</span>
                  <span className="rounded-full px-3 py-1 shadow-sm ring-1 ring-white/25 backdrop-blur sm:bg-white/85 sm:text-gray-700 sm:ring-white/70" style={{ backgroundColor: accent }}>Çocuklu / yoğun çalışan kadınlara özel</span>
                </div>
              </div>

              <div className="relative hidden sm:block">
                <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-[#ffd7d7] via-white to-[#ffe4e6] blur-3xl opacity-70" />
                <div className="overflow-hidden rounded-[28px] bg-white/80 shadow-2xl ring-1 ring-white/60 backdrop-blur">
                  <Image
                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
                    alt="Evde kuaför hizmeti alan kadın"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover"
                    priority
                  />
                  <div className="flex items-center justify-between border-t border-white/70 bg-white/70 px-4 py-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-rose-500" />
                      <span>35 dk'da hazır</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HeartHandshake className="h-4 w-4 text-rose-500" />
                      <span>Mahremiyet güvencesi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-white/80 px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-rose-500">Hizmetler</p>
              <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: accent }}>
                Evde alabileceğin hizmetler
              </h2>
              <p className="text-gray-600">İşlemini seç, konum ve zamanı yaz; sana en yakın kuaförü eşleştirip fiyatı netleştirelim.</p>
            </div>
            <div className="mt-10 grid gap-6">
              <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-white/70">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">✂️ Saç</h3>
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-500">En çok tercih edilen</span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <ServiceItem title="Saç Kesimi" description="Yüz hatlarına uygun, evde rahat kesim." />
                  <ServiceItem title="Fön (Düz/Dalgalı/Kırık)" description="Hacimli veya doğal görünüm, dakikalar içinde." />
                  <ServiceItem title="Dip / Komple Boya" description="Temiz, iz bırakmayan uygulamalar." />
                  <ServiceItem title="Brezilya Fönü" description="Daha kalıcı ve pürüzsüz sonuç isteyenlere." />
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-white/70">
                  <h3 className="text-xl font-semibold mb-3">💄 Makyaj & Gelin</h3>
                  <div className="space-y-2">
                    <ServiceItem title="Günlük / Gece Makyajı" description="Hızlı, hijyenik, ev konforunda." />
                    <ServiceItem title="Gelin Makyaj + Saç" description="Prova ve özel gün hazırlığı; fiyatı birlikte netliyoruz." />
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-white/70">
                  <h3 className="text-xl font-semibold mb-3">💅 Tırnak</h3>
                  <div className="space-y-2">
                    <ServiceItem title="Manikür – Pedikür" description="30–60 dk’da evinde, hijyen odaklı." />
                    <ServiceItem title="Kalıcı Oje" description="Dayanıklı, temiz uygulama." />
                    <ServiceItem title="Jel Güçlendirme" description="Doğal tırnaklarını güçlendirme." />
                    <ServiceItem title="Protez Tırnak (Opsiyonel)" description="Tips/Şablon; talebe göre fiyatlandırılır." />
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-white/70">
                  <h3 className="text-xl font-semibold mb-3">✨ Kirpik & Kaş</h3>
                  <div className="space-y-2">
                    <ServiceItem title="Kirpik Lifting" description="Doğal, kalıcı kavis." />
                    <ServiceItem title="Kaş Alma + Laminasyon" description="Daha düzenli ve dolgun görünüm." />
                    <ServiceItem title="İpek Kirpik (Opsiyonel)" description="Talebe göre uzman eşleştirilir." />
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-white/70">
                  <h3 className="text-xl font-semibold mb-3">🖋 Kalıcı Makyaj</h3>
                  <div className="space-y-2">
                    <ServiceItem title="Kaş" description="Mikropigmentasyon, doğal tonlar." />
                    <ServiceItem title="Dudak" description="Renk dengeleme ve dolgunluk etkisi." />
                    <ServiceItem title="Gelin Paketi" description="Detay ve fiyatı birlikte netleştiriyoruz." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="trust" className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-rose-500">Güven & hijyen</p>
              <h2 className="text-3xl font-bold sm:text-4xl">Neden bizi evine davet edebilirsin?</h2>
              <p className="text-gray-600">Kadınlarda en büyük bariyer olan güven konusunu yumuşatmak için süreç şeffaf.</p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.title}
                    className="flex h-full flex-col gap-4 rounded-2xl bg-white/80 p-6 shadow-md ring-1 ring-white/70 backdrop-blur"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{point.title}</h3>
                    <p className="text-sm text-gray-700">{point.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-white/80 px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex flex-col gap-3 text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-600">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                4.9/5 memnuniyet
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">Müşterilerimizin söylediği en net şey: rahatlık</h2>
              <p className="text-gray-600">Evinizin konforunda aldığınız hizmetlerden gelen yorumlar.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="flex h-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-md ring-1 ring-white/70"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">4.9/5</span>
                  </div>
                  <p className="text-sm text-gray-700">“{testimonial.quote}”</p>
                  <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-rose-500">Galeri</p>
              <h2 className="text-3xl font-bold sm:text-4xl">Galeriden birkaç gerçek an</h2>
              <p className="text-gray-600">Evinizde nasıl bir deneyim yaşayacağınızı görmek için küçük bir önizleme</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((item, index) => (
                <div key={item.image} className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/70">
                  <Image
                    src={item.image}
                    alt={`BiMakas galeri ${index + 1}`}
                    width={800}
                    height={600}
                    className="h-64 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="steps" className="bg-white/80 px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-10">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-rose-500">İşleyiş</p>
              <h2 className="text-3xl font-bold sm:text-4xl">3 adımda randevunu al</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative flex h-full flex-col gap-3 rounded-2xl bg-white p-6 shadow-md ring-1 ring-white/70"
                >
                  <div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-gray-700">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-start gap-3 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">
              <AlertCircle className="mt-0.5 h-4 w-4" />
              <p>
                Sorular aklında kalmasın. Hijyen, mahremiyet ve fiyatlar hakkında en sık gelen soruları yanıtladık.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl bg-white/90 p-5 shadow-md ring-1 ring-white/70"
                  open
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-semibold text-gray-900">
                    {faq.question}
                    <span className="text-sm text-rose-500 transition group-open:rotate-180">▲</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="download" className="bg-gradient-to-r from-[#ffe3e9] via-[#ffd7d7] to-[#fff5f5] px-6 py-16 lg:px-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-3xl bg-white/70 p-8 text-center shadow-xl ring-1 ring-white/70 backdrop-blur">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-500 shadow-sm ring-1 ring-white/70">
              <Sparkles className="h-4 w-4" />
              Kendine zaman ayırmanın en kolay yolu
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">Kendine zaman ayırmanın en kolay yolunu dene.</h2>
            <p className="max-w-2xl text-gray-700">
              Güvenilir, hijyenik ve mahremiyet odaklı kuaförlerimizle evinden çıkmadan hazırlan.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappLink}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:scale-[1.01]"
                style={{ backgroundColor: whatsappColor }}
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp'tan randevu al
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Evinin mahremiyeti korunur • Hijyen opsiyonları mevcut
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <a
        href={whatsappLink}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-2xl transition hover:scale-105"
        aria-label="WhatsApp'tan randevu al"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>
    </>
  );
}

type ServiceItemProps = {
  title: string;
  description: string;
};

function ServiceItem({ title, description }: ServiceItemProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white/90 px-4 py-3 shadow-sm">
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
