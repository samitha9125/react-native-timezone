import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Timezone from 'react-native-timezone';

const BRAND_NAME = 'Samitha Nanayakkara';

type Result = {
  timezone: string | null;
  isAutoTimeZoneEnabled: boolean | null;
  telephonyRegion: string | null;
  localeRegion: string | null;
};

const toDisplay = (value: string | null) => {
  if (value == null) {
    return 'Unavailable';
  }

  const normalized = value.trim();
  return normalized.length === 0 ? 'Unavailable' : normalized;
};

export default function App() {
  const reveal = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const [result, setResult] = useState<Result>({
    timezone: null,
    isAutoTimeZoneEnabled: null,
    telephonyRegion: null,
    localeRegion: null,
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

    Animated.stagger(
      90,
      reveal.map((value) =>
        Animated.timing(value, {
          toValue: 1,
          duration: 480,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [reveal]);

  const revealStyles = reveal.map((value) => ({
    opacity: value,
    transform: [
      {
        translateY: value.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  }));

  const autoTimeZoneLabel =
    result.isAutoTimeZoneEnabled == null
      ? 'Not available on this platform'
      : result.isAutoTimeZoneEnabled
        ? 'Enabled'
        : 'Disabled';

  const bestCurrentRegion = result.telephonyRegion ?? result.localeRegion;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.backgroundLayer}>
        <View style={[styles.blob, styles.blobOne]} />
        <View style={[styles.blob, styles.blobTwo]} />
        <View style={[styles.blob, styles.blobThree]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View style={[styles.hero, revealStyles[0]]}>
          <View style={styles.brandBadge}>
            <Text style={styles.brandBadgeText}>{BRAND_NAME}</Text>
          </View>
          <Text style={styles.title}>Timezone Snapshot</Text>
          <Text style={styles.subtitle}>
            A personal diagnostic dashboard by {BRAND_NAME}.
          </Text>
          <View style={styles.signalRow}>
            <Text style={styles.signalLabel}>Best current region</Text>
            <Text style={styles.signalValue}>
              {toDisplay(bestCurrentRegion)}
            </Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.card, revealStyles[1]]}>
          <Text style={styles.cardLabel}>Current Timezone</Text>
          <Text style={styles.cardValue}>{toDisplay(result.timezone)}</Text>
        </Animated.View>

        <Animated.View style={[styles.card, revealStyles[2]]}>
          <Text style={styles.cardLabel}>Auto Timezone</Text>
          <View
            style={[
              styles.statusPill,
              result.isAutoTimeZoneEnabled
                ? styles.pillActive
                : styles.pillIdle,
            ]}
          >
            <Text style={styles.statusPillText}>{autoTimeZoneLabel}</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.card, revealStyles[3]]}>
          <Text style={styles.cardLabel}>Telephony Region</Text>
          <Text style={styles.cardValue}>
            {toDisplay(result.telephonyRegion)}
          </Text>
        </Animated.View>

        <Animated.View style={[styles.card, revealStyles[4]]}>
          <Text style={styles.cardLabel}>Locale Region</Text>
          <Text style={styles.cardValue}>{toDisplay(result.localeRegion)}</Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f5f2',
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
  },
  blobOne: {
    width: 260,
    height: 260,
    top: -90,
    right: -70,
    backgroundColor: '#c3ecdf',
  },
  blobTwo: {
    width: 190,
    height: 190,
    top: 210,
    left: -70,
    backgroundColor: '#ffe3bf',
  },
  blobThree: {
    width: 220,
    height: 220,
    bottom: -90,
    right: -50,
    backgroundColor: '#d8dff8',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 12,
    gap: 14,
  },
  hero: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.86)',
    borderWidth: 1,
    borderColor: 'rgba(17, 24, 39, 0.08)',
    shadowColor: '#0f172a',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 4,
  },
  brandBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#0f4c5c',
  },
  brandBadgeText: {
    color: '#f8fafc',
    fontFamily: Platform.select({
      ios: 'AvenirNext-DemiBold',
      android: 'serif',
    }),
    letterSpacing: 1.1,
    fontSize: 12,
  },
  title: {
    marginTop: 12,
    fontSize: 30,
    color: '#0f172a',
    lineHeight: 36,
    fontFamily: Platform.select({
      ios: 'AvenirNext-Bold',
      android: 'serif',
    }),
  },
  subtitle: {
    marginTop: 8,
    color: '#334155',
    fontSize: 15,
    lineHeight: 21,
    fontFamily: Platform.select({
      ios: 'AvenirNext-Regular',
      android: 'serif',
    }),
  },
  signalRow: {
    marginTop: 16,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f2fbf8',
    borderWidth: 1,
    borderColor: '#b5e9da',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  signalLabel: {
    color: '#0f4c5c',
    fontSize: 13,
    fontFamily: Platform.select({
      ios: 'AvenirNext-DemiBold',
      android: 'serif',
    }),
  },
  signalValue: {
    color: '#0b7a75',
    fontSize: 15,
    fontFamily: Platform.select({
      ios: 'AvenirNext-Bold',
      android: 'serif',
    }),
  },
  card: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardLabel: {
    color: '#64748b',
    fontSize: 13,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    fontFamily: Platform.select({
      ios: 'AvenirNext-DemiBold',
      android: 'serif',
    }),
  },
  cardValue: {
    marginTop: 10,
    color: '#111827',
    fontSize: 24,
    lineHeight: 30,
    fontFamily: Platform.select({
      ios: 'AvenirNext-Bold',
      android: 'serif',
    }),
  },
  statusPill: {
    marginTop: 10,
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pillActive: {
    backgroundColor: '#d7f7ee',
  },
  pillIdle: {
    backgroundColor: '#ffecd6',
  },
  statusPillText: {
    color: '#0f172a',
    fontSize: 14,
    fontFamily: Platform.select({
      ios: 'AvenirNext-DemiBold',
      android: 'serif',
    }),
  },
});
