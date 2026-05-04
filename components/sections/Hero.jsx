import { useTranslations } from "next-intl";
export default function Hero() {
  const t = useTranslations("hero");
  return (
    <>
    <h1>{t("title")}</h1>
    <p>{t("description")}</p>
    </>
  )
}
