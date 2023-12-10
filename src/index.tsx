import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-timezone' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const TimezoneModule = isTurboModuleEnabled
  ? require('./NativeTimezone').default
  : NativeModules.Timezone;

const Timezone = TimezoneModule
  ? TimezoneModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default {
  getTimeZone: () => Timezone.getTimeZone(),
  getRegionByLocale: () => Timezone.getRegionByLocale(),
  getRegionByTelephony: () => Timezone.getRegionByTelephony() ?? undefined,
  isAutoTimeZoneEnabled: () => {
    if (Platform.OS === 'android') {
      return Timezone.isAutoTimeZoneEnabled();
    }
    return undefined;
  },
};
