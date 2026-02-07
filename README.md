# React Native Timezone

Fast, privacy-first timezone and country detection for React Native with zero extra permissions.

`react-native-timezone` gives you:
- Current timezone ID
- Best current country from telephony (network-first, then SIM fallback)
- Locale country fallback
- Android auto-timezone setting status

## Why this package

### Privacy-first
No location permission and no `READ_PHONE_STATE` needed.

### Native + fast
TurboModule implementation with synchronous reads for simple integration.

### Expo development builds ready
Works with Expo prebuild/dev-client workflows.

### Lightweight
Measured from the v3.2.1 package (February 7, 2026):
- Publish tarball: **~13.2 KB** (varies slightly between pack runs)
- Installed package contents (unpacked): **52,165 bytes** (~51.0 KB)
- JS runtime payload (CommonJS entry used by Metro): **1,288 bytes raw**, **706 bytes gzip**

## Compatibility

| React Native | New Architecture | Status |
| --- | --- | --- |
| >= 0.71.0 | Supported | Compatible |
| 0.76.x | Default New Arch | Verified in this repo |
| 0.81.x | Default New Arch | Verified in example app |

## iOS note on telephony APIs

Apple has deprecated `CTCarrier` APIs with no direct replacement. This can make telephony country unavailable on newer iOS versions, depending on device/network/privacy behavior.

Recommended pattern:

```ts
const bestCountry =
  Timezone.getRegionByTelephony() ?? Timezone.getRegionByLocale();
```

## Installation

```bash
yarn add react-native-timezone
```

For iOS:

```bash
npx pod-install
```

## Expo (development builds)

```bash
npx expo install react-native-timezone
npx expo prebuild
npx expo run:ios
```

## Usage

```tsx
import { useEffect } from 'react';
import Timezone from 'react-native-timezone';

export default function App() {
  useEffect(() => {
    const timezone = Timezone.getTimeZone();
    const isAutoTimeZoneEnabled = Timezone.isAutoTimeZoneEnabled();
    const telephonyRegion = Timezone.getRegionByTelephony();
    const localeRegion = Timezone.getRegionByLocale();
    const bestCountry = telephonyRegion ?? localeRegion;

    console.log({
      timezone,
      isAutoTimeZoneEnabled,
      telephonyRegion,
      localeRegion,
      bestCountry,
    });
  }, []);

  return null;
}
```

See the [example app](https://github.com/samitha9125/react-native-timezone/tree/master/example).

## API

| API | Description |
| --- | --- |
| `getTimeZone()` | Returns current timezone ID (for example `Asia/Colombo`, `Europe/Berlin`). |
| `isAutoTimeZoneEnabled()` | Android only. Returns `true` or `false`; returns `null` on iOS. |
| `getRegionByTelephony()` | Returns best current telephony country (network-first, then SIM fallback) as uppercase ISO code (for example `LK`, `US`) or `null`. |
| `getRegionByLocale()` | Returns locale country as uppercase ISO code (for example `LK`, `US`) or `null`. |
