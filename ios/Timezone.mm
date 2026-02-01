#import <CoreTelephony/CTTelephonyNetworkInfo.h>
#import <CoreTelephony/CTCarrier.h>
#import "Timezone.h"

@implementation Timezone
    RCT_EXPORT_MODULE(Timezone);
    /**
    * This is a Synchronous method.
    * Retrieves the current time zone name.
    */
    RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getTimeZone)
    {
        NSTimeZone *timeZone = [NSTimeZone localTimeZone];
        return timeZone.name;
    }

    /**
    * Synchronous method.
    * Gets the region based on the telephony manager's network country ISO.
    *
    * ⚠️ DEPRECATION NOTICE:
    * - subscriberCellularProvider: Deprecated iOS 12+
    * - serviceSubscriberCellularProviders: Deprecated iOS 16+
    * - CTCarrier class: Deprecated iOS 16+ with NO REPLACEMENT
    *
    * Starting iOS 18, these APIs return nil due to privacy restrictions.
    * Apple has intentionally removed carrier info access with no alternative.
    * Consider using getRegionByLocale() as a fallback.
    */
    RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getRegionByTelephony)
    {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
        
        CTTelephonyNetworkInfo *networkInfo = [[CTTelephonyNetworkInfo alloc] init];
        NSString *isoCountryCode = nil;
        
        // iOS 12+: Check all cellular providers (multi-SIM support)
        if (@available(iOS 12.0, *)) {
            NSDictionary *carriers = [networkInfo serviceSubscriberCellularProviders];
            
            if (carriers && carriers.count > 0) {
                // Get the first available carrier's country code
                CTCarrier *carrier = [carriers.allValues firstObject];
                isoCountryCode = [carrier isoCountryCode];
            }
        }
        
        // Fallback for iOS < 12 OR if iOS 12+ returns nothing
        if (isoCountryCode == nil || [isoCountryCode isEqualToString:@""]) {
            CTCarrier *carrier = [networkInfo subscriberCellularProvider];
            isoCountryCode = [carrier isoCountryCode];
        }
        
#pragma clang diagnostic pop
        
        // iOS 18+: Will likely return nil due to privacy restrictions
        if (isoCountryCode == nil || [isoCountryCode isEqualToString:@""]) {
            return nil;
        }
        
        return isoCountryCode;
    }

    /**
    * Synchronous method.
    * Retrieves the region based on the device's locale.
    */
    RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getRegionByLocale)
    {
        NSLocale *locale = [NSLocale currentLocale];
        NSString *countryCode = [locale objectForKey:NSLocaleCountryCode];
        return countryCode;
    }

    - (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
        (const facebook::react::ObjCTurboModule::InitParams &)params
    {
        return std::make_shared<facebook::react::NativeTimezoneSpecJSI>(params);
    }

@end
