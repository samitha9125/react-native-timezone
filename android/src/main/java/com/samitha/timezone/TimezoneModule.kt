package com.samitha.timezone

import android.content.ContentResolver
import android.content.Context
import android.os.Build
import android.provider.Settings
import android.telephony.TelephonyManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule
import java.util.TimeZone

@ReactModule(name = TimezoneModule.NAME)
class TimezoneModule(reactContext: ReactApplicationContext) :
  NativeTimezoneSpec(reactContext) {

  override fun getName(): String = NAME

  /**
   * This is a Synchronous method.
   * Checks if the device is set to automatically detect the time zone.
   */
  @ReactMethod(isBlockingSynchronousMethod = true)
  override fun isAutoTimeZoneEnabled(): Boolean? {
    return try {
      val resolver: ContentResolver = reactApplicationContext.contentResolver
      val isLaterThanJelly = Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1
      if (isLaterThanJelly) {
        Settings.Global.getInt(resolver, Settings.Global.AUTO_TIME_ZONE, 0) != 0
      } else {
        Settings.System.getInt(resolver, Settings.System.AUTO_TIME_ZONE, 0) != 0
      }
    } catch (e: Exception) {
      null
    }
  }

  /**
   * This is a Synchronous method.
   * Retrieves the current time zone ID.
   */
  @ReactMethod(isBlockingSynchronousMethod = true)
  override fun getTimeZone(): String? {
    return try {
      TimeZone.getDefault().id
    } catch (e: Exception) {
      null
    }
  }

  /**
   * Synchronous method.
   * Gets the region based on the telephony manager's network country ISO.
   */
  @ReactMethod(isBlockingSynchronousMethod = true)
  override fun getRegionByTelephony(): String? {
    return try {
      val telephonyService = reactApplicationContext.getSystemService(Context.TELEPHONY_SERVICE) as? TelephonyManager
      telephonyService?.networkCountryIso
    } catch (e: Exception) {
      null
    }
  }

  /**
   * Synchronous method.
   * Retrieves the region based on the device's locale.
   */
  @ReactMethod(isBlockingSynchronousMethod = true)
  override fun getRegionByLocale(): String? {
    return try {
      val configuration = reactApplicationContext.resources.configuration
      val locale = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
        configuration.locales.get(0)
      } else {
        configuration.locale
      }
      locale.country
    } catch (e: Exception) {
      null
    }
  }

  companion object {
    const val NAME = "Timezone"
  }
}
