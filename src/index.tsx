import { Platform } from 'react-native';

import Timezone from './NativeTimezone';

export default {
  getTimeZone: () => Timezone.getTimeZone(),
  getRegionByLocale: () => Timezone.getRegionByLocale(),
  getRegionByTelephony: () => Timezone.getRegionByTelephony(),
  isAutoTimeZoneEnabled: () => {
    if (Platform.OS === 'android') {
      return Timezone.isAutoTimeZoneEnabled();
    }
    return null;
  },
};
