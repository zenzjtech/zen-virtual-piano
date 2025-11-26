import { useAppSelector } from '@/store/hook';
import i18n from '@/lib/i18n/index';
import { Namespace } from '@/lib/i18n/types';

export const useTranslation = (namespace: Namespace = 'common') => {
  const locale = useAppSelector(state => state.i18n.locale);

  const t = (key: string, options?: object) => {
    return i18n.t(key, { ns: namespace, ...options });
  };

  return { t, locale };
};
