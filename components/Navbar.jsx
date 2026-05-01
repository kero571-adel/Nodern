import {useTranslations} from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
export default function Navbar() {
  const t = useTranslations('nav');
  /**
   * <a href="#">{t('services')}</a>
   * <a href="#">{t('work')}</a>
   */
  return (
    <nav>
      <LanguageSwitcher />
    </nav>
  );
}