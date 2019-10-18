
#import "RNReactNativeTimezone.h"

@implementation RNReactNativeTimezone

RCT_EXPORT_MODULE()
RCT_EXPORT_METHOD(getTimeZone:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    @try{
        NSTimeZone *timeZone = [NSTimeZone localTimeZone];
        resolve(timeZone.name);
    }
    @catch(NSException *exception){
    NSMutableDictionary * info = [NSMutableDictionary dictionary];
    [info setValue:exception.name forKey:@"ExceptionName"];
    [info setValue:exception.reason forKey:@"ExceptionReason"];
    [info setValue:exception.userInfo forKey:@"ExceptionUserInfo"];
    NSError *error = [[NSError alloc] initWithDomain:@"Root Detection Module" code:0 userInfo:info];
    reject(@"failed to execute",@"",error);
    }
}

@end
  
