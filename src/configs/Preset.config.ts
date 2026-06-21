import Nora from '@primeuix/themes/nora';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';

import { PrimePreset } from '../enums/PrimePreset';

export const PRESETS_MAP: Record<string, any> = {
  [PrimePreset.LARA]: Lara,
  [PrimePreset.AURA]: Aura,
  [PrimePreset.NORA]: Nora
};