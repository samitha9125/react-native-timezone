# React Native Timezone
A Simple react native module to get Timezone of the Android/iOS device.

# Motivation
For a project of mine, I had to acquire the current selected timezone of the user. But unfortunately I could not find any react native package or react native in-build function which facilitates this. Thus I created a small library.

# Compatibility
| React native version | Tested | Result |
|----------------------|--------|--------|
| 0.62.3 +             |   ✅   |   ✅   |

# Installation
 
 `npm i --save react-native-timezone`
 
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

 # API
| API         | Description                                                                                                                                                 |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| getTimeZone | Android : Returns timezone ID using java.util.TimeZone.getID()<br>iOS : This always reflects the current system time zone using localTimeZone of NSTimeZone |
