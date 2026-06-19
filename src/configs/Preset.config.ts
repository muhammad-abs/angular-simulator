import Nora from '@primeuix/themes/nora';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';

import { Preset } from '../enums/Preset';

export const PRESETS_MAP: Record<string, any> = {
  [Preset.LARA]: Lara,
  [Preset.AURA]: Aura,
  [Preset.NORA]: Nora
};