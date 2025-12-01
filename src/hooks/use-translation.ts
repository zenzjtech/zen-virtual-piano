import { useAppSelector } from '@/store/hook';
import i18n from '@/lib/i18n';
import { Namespace } from '@/lib/i18n/types';
import { useCallback } from 'react';

export const useTranslation = (namespace: Namespace = 'common') => {
  const locale = useAppSelector(state => state.i18n.locale);

  const t = useCallback((key: string, options?: object) => {
    return i18n.t(key, { ns: namespace, ...options });
  }, [namespace, locale]);

  return { t, locale };
};
