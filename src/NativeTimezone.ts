import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getTimeZone(): string;
  getRegionByLocale(): string;
  getRegionByTelephony(): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Timezone');
