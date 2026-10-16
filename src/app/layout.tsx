import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
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

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cosmic Homes — Premium Residential Construction, Bengaluru",
    template: "%s | Cosmic Homes",
  },
  description:
    "Cosmic Homes is a premier architectural design and residential home construction firm in Bengaluru, delivering bespoke turnkey homes with unwavering quality and transparency.",
  icons: {
    icon: "/logo/cosmic-logo.png",
    shortcut: "/logo/cosmic-logo.png",
    apple: "/logo/cosmic-logo.png",
  },
  openGraph: {
    title: "Cosmic Homes — Premium Residential Construction, Bengaluru",
    description:
      "End-to-end residential construction in Bengaluru. From architectural design to handover.",
    type: "website",
    locale: "en_IN",
    images: ["/logo/cosmic-logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="font-body antialiased bg-white">
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
