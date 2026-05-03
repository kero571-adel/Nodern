import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
export default function Navbar() {
  const t = useTranslations("nav");
  return (
    <nav>
      <LanguageSwitcher />
    </nav>
  );
}
