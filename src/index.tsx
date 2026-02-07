import { Platform } from 'react-native';

import Timezone from './NativeTimezone';

const normalizeRegion = (countryCode: string | null) => {
  if (countryCode == null) {
    return null;
  }

  const normalized = countryCode.trim().toUpperCase();
  return normalized.length === 0 ? null : normalized;
};

export default {
  getTimeZone: () => Timezone.getTimeZone(),
  getRegionByLocale: () => normalizeRegion(Timezone.getRegionByLocale()),
  getRegionByTelephony: () => normalizeRegion(Timezone.getRegionByTelephony()),
  isAutoTimeZoneEnabled: () => {
    if (Platform.OS === 'android') {
      return Timezone.isAutoTimeZoneEnabled();
    }
    return null;
  },
};
