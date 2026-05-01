'use client';
import {useLocale} from 'next-intl';
import {useRouter, usePathname} from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLocale}
      className="border border-white/20 text-white px-4 py-2 rounded-full text-sm hover:border-white/50 transition-colors"
    >
      {locale === 'en' ? 'عربي' : 'EN'}
    </button>
  );
}