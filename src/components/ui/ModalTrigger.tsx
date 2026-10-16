"use client";
import { useEnquiryModal } from "@/components/layout/EnquiryModalProvider";
import Button from "@/components/ui/Button";

interface ModalTriggerProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "navy" | "teal";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ModalTrigger({ children, variant = "primary", size = "md", className = "" }: ModalTriggerProps) {
  const { openModal } = useEnquiryModal();
  return (
    <Button variant={variant} size={size} onClick={openModal} className={className}>
      {children}
    </Button>
  );
}
