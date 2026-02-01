# React Native Timezone and Region

[![Maintainability](https://api.codeclimate.com/v1/badges/3713253a365fe6a55615/maintainability)](https://codeclimate.com/github/samitha9125/react-native-timezone/maintainability)

A Simple react native module to get the Timezone and the Region of the Android/iOS devices.

# Why Choose This Library?

## 🔒 Privacy-First
Unlike other timezone/region libraries, `react-native-timezone` **does NOT require**:
- ❌ Location permissions (`ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION`)
- ❌ `READ_PHONE_STATE` permission (Android)
- ❌ Additional native dependencies

**This is critical for:**
- Privacy-conscious apps
- App Store/Play Store approval (permission justifications)
- GDPR/CCPA compliance

## 📱 Expo Compatible
Works seamlessly with **Expo Development Builds** (CNG - Continuous Native Generation):
```bash
npx expo install react-native-timezone
npx expo prebuild
npx expo run:ios
```

No need for bare React Native workflow—just prebuild and run.

## ⚡ Super Lightweight
- Zero JavaScript dependencies
- Native TurboModule (synchronous, no bridge overhead)
- Minimal footprint (~2KB gzipped)

## 🆕 Modern Architecture
Fully compatible with React Native's New Architecture (Fabric + TurboModules).

---

# Compatibility

| React Native | New Architecture | Tested | Notes |
|--------------|------------------|--------|-------|
| 0.71.x       | ✅ Stable         | ✅      | First stable TurboModule support |
| 0.72.x       | ✅                | ✅      | |
| 0.73.x       | ✅                | ✅      | |
| 0.74.x       | ✅ Default        | ✅      | New Arch enabled by default |
| 0.76.x       | ✅                | ✅      | |
| 0.83.x       | ✅                | ✅      | Latest (Feb 2026) |

**Breaking Changes in React Native:**
- **0.71**: New Architecture stabilized (TurboModules + Fabric)
- **0.74**: New Architecture enabled by default
- **0.76**: Minimum iOS deployment target raised to iOS 15.1

---

# ⚠️ Important: iOS Carrier API Deprecation

Apple has deprecated the entire `CTCarrier` class with **no replacement API**:

| API | Deprecated Since | Status |
|-----|-----------------|--------|
| `subscriberCellularProvider` | iOS 12 | ⚠️ Deprecated |
| `serviceSubscriberCellularProviders` | iOS 16 | ⚠️ Deprecated |
| `CTCarrier` class | iOS 16 | ❌ No replacement |

**What this means for `getRegionByTelephony()`:**
- **iOS < 18**: Works, but triggers deprecation warnings (suppressed in this library)
- **iOS 18+**: Returns `null` due to Apple's privacy restrictions

**Recommended Pattern:**
```javascript
// Use telephony-based region with locale fallback
const region = Timezone.getRegionByTelephony() ?? Timezone.getRegionByLocale();
```

This is an Apple platform limitation, not a bug in this library.

---

# Motivation

For a project of mine, I had to acquire the currently selected timezone of the user. Unfortunately, I could not find any react native package or react native in-build function that facilitates this. Thus I created a small library.

v3.0.0 and above, you can access the Region details. More details can be found below.

# Installation

`yarn add react-native-timezone`

## iOS

Do `cd ios/ && pod install` or `npx pod-install`.

# Usage

```javascript
import TimeZone from 'react-native-timezone';

export default function App() {
  React.useEffect(() => {
    const timezone = Timezone.getTimeZone();
    const isAutoTimeZoneEnabled = Timezone.isAutoTimeZoneEnabled();
    const telephonyRegion = Timezone.getRegionByTelephony();
    const localeRegion = Timezone.getRegionByLocale();
    // Update state or use data as needed
  }, []);

  // Render your component
}
```

Check out the [example](https://github.com/samitha9125/react-native-timezone/tree/master/example) folder.

# APIs

| API                   | Description                                                                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| getTimeZone           | Android: Returns timezone ID using `java.util.TimeZone.getID()`<br>iOS: Reflects the current system time zone using `localTimeZone` of `NSTimeZone` |
| isAutoTimeZoneEnabled | Returns a boolean indicating if auto timezone is enabled on the device **(Android Only)**                                                           |
| getRegionByTelephony  | Retrieves the region information based on the telephony (SIM card) of the device. Returns `null` if the device has no SIM card.                     |
| getRegionByLocale     | Retrieves the region information based on the device's locale settings                                                                              |
