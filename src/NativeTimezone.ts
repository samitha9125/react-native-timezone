import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getTimeZone(): string | null;
  getRegionByLocale(): string | null;
  getRegionByTelephony(): string | null;
  isAutoTimeZoneEnabled(): boolean | null;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Timezone');
