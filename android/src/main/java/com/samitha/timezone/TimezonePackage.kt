package com.samitha.timezone

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import java.util.HashMap

class TimezonePackage : BaseReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return if (name == TimezoneModule.NAME) {
      TimezoneModule(reactContext)
    } else {
      null
    }
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      // Keep the legacy constructor for backwards compatibility with older RN versions.
      @Suppress("DEPRECATION")
      val timezoneModuleInfo = ReactModuleInfo(
        TimezoneModule.NAME,
        TimezoneModule.NAME,
        false,  // canOverrideExistingModule
        false,  // needsEagerInit
        false,  // hasConstants
        false,  // isCxxModule
        true // isTurboModule
      )
      moduleInfos[TimezoneModule.NAME] = timezoneModuleInfo
      moduleInfos
    }
  }
}
