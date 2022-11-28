
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNTimezoneSpec.h"

@interface Timezone : NSObject <NativeTimezoneSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Timezone : NSObject <RCTBridgeModule>
#endif

@end
