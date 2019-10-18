
package com.rntimezone;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import java.util.TimeZone;
import java.util.Calendar;

public class RNReactNativeTimezoneModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNReactNativeTimezoneModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNReactNativeTimezone";
  }

  @ReactMethod
  public void getTimeZone(Promise promise) {
    try {
      Calendar calendar = Calendar.getInstance(TimeZone.getDefault());
      TimeZone zone = calendar.getTimeZone();
      promise.resolve(zone.getID());
    }catch (Exception e){
      promise.reject(e);
    }
  }
}