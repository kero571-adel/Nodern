import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("nav");
  return (
    <main>
      <Navbar />
      <h1 className="text-3xl font-bold font-syne">{t("Hello")}!</h1>
    </main>
  );
}
