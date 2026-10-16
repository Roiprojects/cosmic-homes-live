import { redirect } from "next/navigation";

export default function GalleryRedirectPage() {
  redirect("/packages#gallery-section");
}
