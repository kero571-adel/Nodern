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
      className="fixed top-6 right-6 z-50 border cursor-pointer border-white/20 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:border-purple-500 hover:bg-purple-500/20 transition-all duration-300"
    >
      {locale === 'en' ? 'عربي' : 'EN'}
    </button>
  );
}