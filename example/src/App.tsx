import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Timezone from 'react-native-timezone';

type Result = {
  timezone: string | null;
  isAutoTimeZoneEnabled: boolean | null;
  telephonyRegion: string | null;
  localeRegion: string | null;
};
export default function App() {
  const [result, setResult] = useState<Result>({
    timezone: '',
    isAutoTimeZoneEnabled: false,
    telephonyRegion: '',
    localeRegion: '',
  });

  useEffect(() => {
    const timezone = Timezone.getTimeZone();
    const isAutoTimeZoneEnabled = Timezone.isAutoTimeZoneEnabled();
    const telephonyRegion = Timezone.getRegionByTelephony();
    const localeRegion = Timezone.getRegionByLocale();
    setResult({
      timezone,
      isAutoTimeZoneEnabled,
      telephonyRegion,
      localeRegion,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Current Timezone is {result.timezone}</Text>
      <Text>
        Is Auto Timezone Enabled? {String(result.isAutoTimeZoneEnabled)}
      </Text>
      <Text>
        Region obtained by SIM card is {String(result.telephonyRegion)}
      </Text>
      <Text>Region obtained by Locale is {result.localeRegion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
