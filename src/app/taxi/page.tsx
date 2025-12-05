"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Loader2, CheckCircle, AlertCircle, Sparkles, Timer } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import {
  TaxiDriver,
  getTaxiDrivers,
  logTaxiReferral,
} from "@/lib/taxiService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type TaxiLanguage = "tr" | "en";

const languageContent: Record<
  TaxiLanguage,
  {
    badge: string;
    heading: string;
    description: string;
    selectLabel: string;
    selectPlaceholder: { loading: string; default: string };
    emptyState: string;
    errors: Record<"selection" | "drivers" | "submission", string>;
    success: string;
    submittingLabel: string;
    buttonLabel: string;
    discount: {
      badge: string;
      title: string;
      description: string;
      note: string;
    };
    countdown: {
      title: string;
      subtitle: string;
      expired: string;
    };
    legal: string;
    whatsappMessage: (driver: TaxiDriver) => string;
  }
> = {
  tr: {
    badge: "Bimakas Taksi QR",
    heading: "Hizmetimizi kullanmaya başlamak için taksiyi seçin",
    description:
      "QR kodunu okuttuğunuz taksiciyi seçin. Seçiminiz doğrultusunda WhatsApp üzerinden ekibimize yönlendirileceksiniz.",
    selectLabel: "Hangi taksiden geldiniz?",
    selectPlaceholder: {
      loading: "Taksiciler yükleniyor...",
      default: "Taksici seçin",
    },
    emptyState:
      "Aktif taksici bulunamadı. Lütfen yönetim ekibiyle iletişime geçin.",
    errors: {
      selection: "Lütfen bindiğiniz taksiciyi seçin.",
      drivers:
        "Taksici listesi yüklenemedi. Lütfen daha sonra tekrar deneyin.",
      submission: "Bir hata oluştu. Lütfen tekrar deneyin.",
    },
    success:
      "Bilgiler kaydedildi. WhatsApp'a yönlendiriliyorsunuz...",
    submittingLabel: "Gönderiliyor...",
    buttonLabel: "WhatsApp üzerinden devam et",
    discount: {
      badge: "%40 lansman indirimi",
      title: "İlk Bimakas hizmetinde %40 indirim fırsatı",
      description:
        "Şimdi WhatsApp'a geçerek ilk hizmetinde %40'a varan indirim kazan. Kontenjan sınırlı, hemen harekete geç.",
      note: "Kampanya taksicinizin doğrulamasıyla aktiftir.",
    },
    countdown: {
      title: "İndirimi kaçırma",
      subtitle: "WhatsApp'a geçmek için kalan süre",
      expired: "Süre doldu. Yine de WhatsApp'tan devam edebilirsin.",
    },
    legal:
      "Seçiminiz, hizmet kalitemizi yükseltmek için Firebase veritabanımıza kaydedilir.",
    whatsappMessage: (driver) =>
      `Merhaba Bimakas, ${driver.name} (${driver.plate}) taksisinden geldim. Hizmetinizden yararlanmak istiyorum.`,
  },
  en: {
    badge: "BiMakas Taxi QR",
    heading: "Select the taxi you rode with to get started",
    description:
      "Choose the driver whose QR code you scanned. We will then connect you with our team on WhatsApp.",
    selectLabel: "Which taxi brought you?",
    selectPlaceholder: {
      loading: "Loading drivers...",
      default: "Select a driver",
    },
    emptyState:
      "No active drivers found. Please reach out to the operations team.",
    errors: {
      selection: "Please choose the driver you arrived with.",
      drivers: "We could not load the driver list. Please try again later.",
      submission: "Something went wrong. Please try again.",
    },
    success: "Details saved. Redirecting you to WhatsApp...",
    submittingLabel: "Sending...",
    buttonLabel: "Continue on WhatsApp",
    discount: {
      badge: "40% launch offer",
      title: "40% off your first BiMakas service",
      description:
        "Move to WhatsApp now and unlock up to 40% off your first on-demand service. Limited slots only.",
      note: "Your driver validates the promotion upon arrival.",
    },
    countdown: {
      title: "Claim it before time runs out",
      subtitle: "Time remaining to switch to WhatsApp",
      expired: "Timer ended, but you can still talk to us on WhatsApp.",
    },
    legal:
      "We store your selection in Firebase to keep the service quality high.",
    whatsappMessage: (driver) =>
      `Hello BiMakas, I'm coming from taxi driver ${driver.name} (${driver.plate}). I'd like to use your service.`,
  },
};

const LANGUAGE_CHOICES: { code: TaxiLanguage; flag: string }[] = [
  { code: "tr", flag: "🇹🇷" },
  { code: "en", flag: "🇬🇧" },
];

const LANGUAGE_CARD_COPY: Record<
  TaxiLanguage,
  { title: string; subtitle: string }
> = {
  tr: {
    title: "Türkçe",
    subtitle: "Yerel ekip ile Türkçe sohbet edin.",
  },
  en: {
    title: "English",
    subtitle: "Continue the WhatsApp chat in English.",
  },
};

const LANGUAGE_INTRO_COPY = {
  title: "Dilini seç / Choose your language",
  description:
    "WhatsApp görüşmesini hangi dilde sürdürmek istersiniz? • Which language should we continue with on WhatsApp?",
};

const CHANGE_LANGUAGE_COPY: Record<TaxiLanguage, { button: string }> = {
  tr: { button: "Dili değiştir" },
  en: { button: "Switch language" },
};

const COUNTDOWN_DURATION_SECONDS = 5 * 60;

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905015260754";

type ErrorState = "drivers" | "selection" | "submission" | null;

const TaxiReferralPage = () => {
  const { config, currentLanguage, setLanguage } = useLanguage();
  const primaryColor = config?.brand?.colors?.text ?? "#ff7778";
  const [selectedLanguage, setSelectedLanguage] = useState<TaxiLanguage>(
    currentLanguage ?? "tr"
  );
  const [languageModalOpen, setLanguageModalOpen] = useState(true);
  const [drivers, setDrivers] = useState<TaxiDriver[]>([]);
  const [selectedTaxiId, setSelectedTaxiId] = useState<string>("");
  const [loadingDrivers, setLoadingDrivers] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorType, setErrorType] = useState<ErrorState>(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_DURATION_SECONDS);
  const content = languageContent[selectedLanguage];

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedLanguage = localStorage.getItem("preferred-language");
      if (storedLanguage === "tr" || storedLanguage === "en") {
        setSelectedLanguage(storedLanguage);
        setLanguageModalOpen(false);
      }
    } catch (error) {
      console.warn("Failed to detect stored language:", error);
    }
  }, []);

  useEffect(() => {
    if (currentLanguage) {
      setSelectedLanguage(currentLanguage as TaxiLanguage);
    }
  }, [currentLanguage]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const data = await getTaxiDrivers();
        setDrivers(data);
      } catch (err) {
        setErrorType("drivers");
      } finally {
        setLoadingDrivers(false);
      }
    };

    fetchDrivers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLanguageSelection = (languageCode: TaxiLanguage) => {
    setSelectedLanguage(languageCode);
    setLanguage(languageCode);
    setLanguageModalOpen(false);
  };

  const selectedDriver = useMemo(
    () => drivers.find((driver) => driver.id === selectedTaxiId),
    [drivers, selectedTaxiId]
  );
  const formattedCountdown = useMemo(() => {
    const minutes = Math.floor(countdown / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (countdown % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  }, [countdown]);
  const countdownLabel =
    countdown > 0 ? content.countdown.subtitle : content.countdown.expired;
  const changeLanguageButtonLabel = CHANGE_LANGUAGE_COPY[selectedLanguage].button;
  const reopenLanguageModal = () => setLanguageModalOpen(true);
  const firstRideLabel = selectedLanguage === "tr" ? "ilk hizmet" : "first ride";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorType(null);

    if (!selectedDriver) {
      setErrorType("selection");
      return;
    }

    const message = content.whatsappMessage(selectedDriver);
    setSubmitting(true);

    try {
      await logTaxiReferral({
        taxiId: selectedDriver.id,
        taxiName: selectedDriver.name,
        taxiPlate: selectedDriver.plate,
        source: "qr-taxi-campaign",
        whatsappMessage: message,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        locale:
          typeof navigator !== "undefined"
            ? navigator.language
            : undefined,
      });

      setSuccess(true);

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`;

      window.location.href = url;
    } catch (err) {
      console.error(err);
      setErrorType("submission");
    } finally {
      setSubmitting(false);
    }
  };

  if (languageModalOpen) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#FFF8F0] via-white to-[#FFE4E6] px-6 py-10">
        <div className="w-full max-w-2xl space-y-8 rounded-[32px] bg-white/90 p-8 text-center shadow-2xl ring-1 ring-white/70 backdrop-blur">
          <Image
            src="/logo.png"
            alt="BiMakas"
            width={96}
            height={96}
            className="mx-auto h-16 w-auto"
          />
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-400">
              BiMakas
            </p>
            <h1 className="text-3xl font-bold text-gray-900">
              {LANGUAGE_INTRO_COPY.title}
            </h1>
            <p className="text-sm text-gray-600">
              {LANGUAGE_INTRO_COPY.description}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {LANGUAGE_CHOICES.map((choice) => {
              const isActive = selectedLanguage === choice.code;
              const cardCopy = LANGUAGE_CARD_COPY[choice.code];
              return (
                <button
                  key={choice.code}
                  type="button"
                  onClick={() => handleLanguageSelection(choice.code)}
                  className={`flex h-full flex-col rounded-2xl border-2 p-5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isActive
                      ? "border-transparent bg-[#FFE4E6] shadow-lg focus-visible:ring-[#FFC0CB]"
                      : "border-gray-200 hover:border-gray-300 focus-visible:ring-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{choice.flag}</span>
                    {isActive && (
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    )}
                  </div>
                  <div className="mt-4 space-y-1">
                    <p className="text-lg font-semibold text-gray-900">
                      {cardCopy.title}
                    </p>
                    <p className="text-sm text-gray-600">{cardCopy.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-500">
            Seçiminizi daha sonra sayfa içinden değiştirebilirsiniz • You can update this later inside the page.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFF8F0] via-white to-[#FFE4E6] px-6 pb-12 pt-32 sm:px-8 lg:px-0">
      <div className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 sm:px-6">
        <div className="flex w-full max-w-3xl items-center justify-between rounded-2xl border border-rose-100 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
              <Timer className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-500">
                {content.countdown.title}
              </p>
              <p className="text-sm text-gray-600">{countdownLabel}</p>
            </div>
          </div>
          <p
            className={`font-mono text-2xl font-bold ${
              countdown === 0 ? "text-gray-400" : "text-rose-500"
            }`}
          >
            {formattedCountdown}
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-white/60 backdrop-blur-sm">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={reopenLanguageModal}
              className="rounded-full border border-gray-200 px-4 py-1 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
            >
              {changeLanguageButtonLabel}
            </button>
          </div>
          <header className="flex flex-col items-center gap-4 text-center">
            <Image
              src="/logo.png"
              alt="BiMakas"
              width={96}
              height={96}
              className="h-16 w-auto"
            />
            <div className="space-y-2">
              <span
                className="inline-flex items-center justify-center rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-wide"
                style={{
                  backgroundColor: `${primaryColor}10`,
                  color: primaryColor,
                }}
              >
                {content.badge}
              </span>
              <h1 className="text-3xl font-bold text-gray-900">
                {content.heading}
              </h1>
              <p className="text-base text-gray-600">{content.description}</p>
            </div>
          </header>

          <section className="relative overflow-hidden rounded-[32px] bg-slate-900 p-6 text-white shadow-2xl ring-1 ring-slate-800/40 sm:p-8">
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <div className="absolute -inset-x-16 -top-24 h-56 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-amber-400 blur-3xl" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>
            <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  {content.discount.badge}
                </span>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                    {content.discount.title}
                  </h2>
                  <p className="text-sm text-white/80">
                    {content.discount.description}
                  </p>
                </div>
              </div>
              <div className="relative isolate grid place-items-center rounded-3xl bg-white/10 px-8 py-6 text-center shadow-lg sm:min-w-[200px]">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
                  {firstRideLabel}
                </p>
                <p className="text-5xl font-black tracking-tight text-white">
                  -40%
                </p>
                <p className="text-xs text-white/70">
                  {content.discount.note}
                </p>
              </div>
            </div>
          </section>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {content.selectLabel}
              </label>
              <Select
                onValueChange={setSelectedTaxiId}
                value={selectedTaxiId}
                disabled={loadingDrivers || submitting || drivers.length === 0}
              >
                <SelectTrigger className="w-full justify-between">
                  <SelectValue
                    placeholder={
                      loadingDrivers
                        ? content.selectPlaceholder.loading
                        : content.selectPlaceholder.default
                    }
                  />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      <span className="flex flex-1 items-center justify-between gap-4">
                        <span className="font-medium text-gray-900">
                          {driver.name}
                        </span>
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold tracking-wide text-gray-600">
                          {driver.plate}
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!loadingDrivers && drivers.length === 0 && (
                <p className="text-sm text-gray-500">{content.emptyState}</p>
              )}
            </div>

            {errorType && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span>{content.errors[errorType]}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                <CheckCircle className="h-4 w-4" />
                <span>{content.success}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={!selectedTaxiId || submitting}
              className="w-full text-base font-semibold"
              style={{ backgroundColor: primaryColor, color: "#fff" }}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {content.submittingLabel}
                </span>
              ) : (
                content.buttonLabel
              )}
            </Button>

            <p className="text-center text-xs text-gray-500">
              {content.legal}
            </p>
          </form>
        </div>
    </main>
  );
};

export default TaxiReferralPage;
