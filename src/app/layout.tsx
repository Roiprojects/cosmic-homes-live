import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import { EnquiryModalProvider } from "@/components/layout/EnquiryModalProvider";

import EnquiryModal from "@/components/modals/EnquiryModal";
import LeadCapturePopup from "@/components/modals/LeadCapturePopup";

const heading = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const brand = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cosmic Homes — Turnkey Luxury Residences, Bengaluru",
    template: "%s | Cosmic Homes",
  },
  description:
    "Cosmic Homes is a premier architectural design and turnkey residential construction firm in Bengaluru, delivering bespoke luxury homes with unwavering quality and transparency.",
  icons: {
    icon: "/logo/cosmic_logo.jpeg",
    shortcut: "/logo/cosmic_logo.jpeg",
    apple: "/logo/cosmic_logo.jpeg",
  },
  openGraph: {
    title: "Cosmic Homes — Turnkey Luxury Residences, Bengaluru",
    description:
      "End-to-end residential construction in Bengaluru. From architectural design to handover.",
    type: "website",
    locale: "en_IN",
    images: ["/logo/cosmic_logo.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${brand.variable}`}>
      <body className="font-body antialiased bg-[#fbfbf9] text-[#1a242f]">
        <Header />
        <EnquiryModalProvider>
          <main>{children}</main>
          <EnquiryModal />
          <LeadCapturePopup />
          <Footer />
          <FloatingContact />
        </EnquiryModalProvider>
      </body>
    </html>
  );
}
