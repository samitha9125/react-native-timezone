#import <CoreTelephony/CTTelephonyNetworkInfo.h>
#import <CoreTelephony/CTCarrier.h>
#import "Timezone.h"

@implementation Timezone
RCT_EXPORT_MODULE()

// Get the current timezone using NSTimeZone
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getTimeZone)
{
    NSTimeZone *timeZone = [NSTimeZone localTimeZone];
    return timeZone.name;
}

// Get the current timezone using CTTelephonyNetworkInfo
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

// Get the current timezone using NSLocale
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getRegionByLocale)
{
    NSLocale *locale = [NSLocale currentLocale];
    NSString *countryCode = [locale objectForKey:NSLocaleCountryCode];
    return countryCode;
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeTimezoneSpecJSI>(params);
}
#endif

@end
