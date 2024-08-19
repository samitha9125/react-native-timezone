# React Native Timezone and Region

[![Maintainability](https://api.codeclimate.com/v1/badges/3713253a365fe6a55615/maintainability)](https://codeclimate.com/github/samitha9125/react-native-timezone/maintainability)

A Simple react native module to get the Timezone and the Region of the Android/iOS devices.

# Motivation

For a project of mine, I had to acquire the currently selected timezone of the user. Unfortunately, I could not find any react native package or react native in-build function that facilitates this. Thus I created a small library.

v3.0.0 and above, you can access the Region details. More details can be found below.

# Compatibility

Timezone version 3.0.0 only supports React Native version 0.62.3 and above due to the React Native Regular Expression Denial of Service (ReDoS) vulnerability.

| React native version | Tested | Result |
| -------------------- | ------ | ------ |
| 0.62.3 +             | ✅     | ✅     |
| 0.70.0 +             | ✅     | ✅     |
| 0.73.0 +             | ✅     | ✅     |

# Installation

`npm i react-native-timezone`

## iOS

Do `cd ios/ && pod install` or `npx pod-install`.

# Usage

```javascript
import Timezone from 'react-native-timezone';

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
| getRegionByTelephony  | Retrieves the region information based on the telephony (SIM card) of the device. Returns `undefined` if the device has no SIM card.                |
| getRegionByLocale     | Retrieves the region information based on the device's locale settings                                                                              |
