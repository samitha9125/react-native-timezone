#import <CoreTelephony/CTTelephonyNetworkInfo.h>
#import <CoreTelephony/CTCarrier.h>
#import "Timezone.h"

@implementation Timezone
    RCT_EXPORT_MODULE('Timezone');
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
    */
    RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getRegionByTelephony)
    {
        CTTelephonyNetworkInfo *networkInfo = [[CTTelephonyNetworkInfo alloc] init];
        CTCarrier *carrier = [networkInfo subscriberCellularProvider];
        NSString *isoCountryCode = [carrier isoCountryCode];
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
