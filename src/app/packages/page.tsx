import PackagesMergedView from "@/components/sections/PackagesMergedView";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Construction Packages & Gallery | Cosmic Homes Bengaluru",
  description:
    "Explore Cosmic Homes' all-inclusive construction packages, full architectural specifications, and curated gallery of finished luxury residences across Bengaluru.",
};

export default function PackagesPage() {
  return (
    <>
      <PackagesMergedView />
      <CTASection />
    </>
  );
}
