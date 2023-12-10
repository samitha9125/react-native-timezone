package com.timezone;

import com.facebook.react.bridge.ReactApplicationContext;

abstract class TimezoneSpec extends NativeTimezoneSpec {
  TimezoneSpec(ReactApplicationContext context) {
    super(context);
  }
}
