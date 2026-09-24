import Nora from '@primeuix/themes/nora';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';

import { PrimePreset } from '../enums/PrimePreset';

export const PRESETS_MAP: Record<PrimePreset, typeof Lara | typeof Aura | typeof Nora> = {
  [PrimePreset.LARA]: Lara,
  [PrimePreset.AURA]: Aura,
  [PrimePreset.NORA]: Nora,
};
