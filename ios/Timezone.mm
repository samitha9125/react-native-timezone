#import <CoreTelephony/CTTelephonyNetworkInfo.h>
#import <CoreTelephony/CTCarrier.h>
#import "Timezone.h"

static NSString *NormalizeCountryCode(NSString *countryCode) {
    if (countryCode == nil) {
        return nil;
    }

    NSString *trimmed = [countryCode stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
    if (trimmed.length == 0) {
        return nil;
    }

    return [trimmed uppercaseStringWithLocale:[NSLocale localeWithLocaleIdentifier:@"en_US_POSIX"]];
}

@implementation Timezone

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

RCT_EXPORT_MODULE();
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
    * Gets the best current region based on telephony data.
    * Prefers the active data service carrier when available.
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
            NSDictionary<NSString *, CTCarrier *> *carriers = [networkInfo serviceSubscriberCellularProviders];
            
            if (carriers && carriers.count > 0) {
                // Prefer the active data service carrier when available (iOS 13+).
                if (@available(iOS 13.0, *)) {
                    NSString *activeServiceIdentifier = networkInfo.dataServiceIdentifier;
                    if (activeServiceIdentifier != nil) {
                        CTCarrier *activeCarrier = carriers[activeServiceIdentifier];
                        isoCountryCode = [activeCarrier isoCountryCode];
                    }
                }

                // Fallback: deterministically scan all carriers until a non-empty code is found.
                if (NormalizeCountryCode(isoCountryCode) == nil) {
                    NSArray<NSString *> *serviceIdentifiers = [[carriers allKeys] sortedArrayUsingSelector:@selector(compare:)];
                    for (NSString *serviceIdentifier in serviceIdentifiers) {
                        CTCarrier *carrier = carriers[serviceIdentifier];
                        NSString *candidateCountryCode = [carrier isoCountryCode];
                        if (NormalizeCountryCode(candidateCountryCode) != nil) {
                            isoCountryCode = candidateCountryCode;
                            break;
                        }
                    }
                }
            }
        }
        
        // Fallback for iOS < 12 OR if iOS 12+ returns nothing
        if (NormalizeCountryCode(isoCountryCode) == nil) {
            CTCarrier *carrier = [networkInfo subscriberCellularProvider];
            isoCountryCode = [carrier isoCountryCode];
        }
        
#pragma clang diagnostic pop
        
        // iOS 18+: Will likely return nil due to privacy restrictions
        NSString *normalizedCountryCode = NormalizeCountryCode(isoCountryCode);
        if (normalizedCountryCode == nil) {
            return nil;
        }
        
        return normalizedCountryCode;
    }

    /**
    * Synchronous method.
    * Retrieves the region based on the device's locale.
    */
    RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getRegionByLocale)
    {
        NSLocale *locale = [NSLocale currentLocale];
        NSString *countryCode = [locale objectForKey:NSLocaleCountryCode];
        return NormalizeCountryCode(countryCode);
    }

    /**
    * Synchronous method.
    * Checks if automatic time zone is enabled on the device.
    * Note: iOS doesn't provide a direct API for this, so we return nil.
    */
    RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isAutoTimeZoneEnabled)
    {
        // iOS doesn't provide a public API to check if automatic time zone is enabled
        // This feature is primarily available on Android
        return nil;
    }

    - (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
        (const facebook::react::ObjCTurboModule::InitParams &)params
    {
        return std::make_shared<facebook::react::NativeTimezoneSpecJSI>(params);
    }

@end
