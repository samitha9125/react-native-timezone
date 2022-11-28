# React Native Timezone
A Simple react native module to get Timezone of the Android/iOS device.

# Motivation
For a project of mine, I had to acquire the current selected timezone of the user. But unfortunately I could not find any react native package or react native in-build function which facilitates this. Thus I created a small library.

# Compatibility
Timezone version 2.0.0 only support React Native version 0.62.3 and above due to React Native Regular Expression Denial of Service (ReDoS) vulnerability.

| React native version | Tested | Result |
|----------------------|--------|--------|
| 0.62.3 +             |   ✅   |   ✅   |
| 0.62.5 +             |   ✅   |   ✅   |
| 0.70.5 +             |   ✅   |   ✅   |

# Installation
 
 `npm i react-native-timezone`
 
 ## iOS

 Do `cd ios/ && pod install`. 
 
 # Usage
 ```javascript
import TimeZone from 'react-native-timezone';

getTimeZone = async() => {
  const timeZone = await TimeZone.getTimeZone().then(zone => zone);
  console.log({ timeZone });
}
```
Check out the [example]("https://github.com/samitha9125/react-native-timezone/tree/master/example") folder.
 # API
| API         | Description                                                                                                                                                 |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| getTimeZone | Android : Returns timezone ID using java.util.TimeZone.getID()<br>iOS : This always reflects the current system time zone using localTimeZone of NSTimeZone |