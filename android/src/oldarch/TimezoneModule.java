package com.samitha.rn.timezone;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

public class TimezoneModule extends ReactContextBaseJavaModule {
  public static final String NAME = TimezoneModuleImpl.NAME;

  TimezoneModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return TimezoneModuleImpl.NAME;
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean isAutoTimeZoneEnabled() {
    return TimezoneModuleImpl.isAutoTimeZoneEnabled(getReactApplicationContext());
  }
  @ReactMethod(isBlockingSynchronousMethod = true)
  public String getTimeZone() {
    return TimezoneModuleImpl.getTimeZone();
  }
  @ReactMethod(isBlockingSynchronousMethod = true)
  public String getRegionByTelephony() {
    return TimezoneModuleImpl.getRegionByTelephony(getReactApplicationContext());
  }
  @ReactMethod(isBlockingSynchronousMethod = true)
  public String getRegionByLocale() {
    return TimezoneModuleImpl.getRegionByLocale(getReactApplicationContext());
  }
}
