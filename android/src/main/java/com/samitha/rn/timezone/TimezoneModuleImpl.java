package com.samitha.rn.timezone;

import androidx.annotation.NonNull;
import android.os.Build;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

import java.util.TimeZone;
import java.util.Calendar;
import android.telephony.TelephonyManager;

import android.provider.Settings;
import android.content.ContentResolver;
import android.util.Log;

public class TimezoneModuleImpl {
  public static final String NAME = "Timezone";

  // Whether the device is set to automatically detect the time zone.
  @ReactMethod
  public static boolean isAutoTimeZoneEnabled(ReactApplicationContext reactContext) {
    ContentResolver resolver = reactContext.getContentResolver();
    return (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1
        ? Settings.Global.getInt(resolver, Settings.Global.AUTO_TIME_ZONE, 0)
        : Settings.System.getInt(resolver, Settings.System.AUTO_TIME_ZONE, 0)) != 0;
  }

  @ReactMethod
  public static String getTimeZone() {
    try {
      Calendar calendar = Calendar.getInstance(TimeZone.getDefault());
      TimeZone zone = calendar.getTimeZone();
      return zone.getID();
    }catch (Exception e){
      return null;
    }
  }

  @ReactMethod
  public static String getRegionByTelephony(ReactApplicationContext reactContext) {
    try {
      TelephonyManager tm = (TelephonyManager)reactContext.getSystemService(reactContext.TELEPHONY_SERVICE);
      return tm.getNetworkCountryIso();
    }catch (Exception e){
      return null;
    }
    
  }

  @ReactMethod
  public static String getRegionByLocale(ReactApplicationContext reactContext) {
    try {
      return reactContext.getResources().getConfiguration().locale.getCountry();
    }catch (Exception e){
      return null;
    }
  }
}
