import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { usePreset } from '@primeuix/themes';
import { Preset } from '../enums/Preset';
import { ITheme } from '../interfaces/ITheme';
import { PRESETS_MAP } from '../configs/Preset.config'

@Injectable({ providedIn: 'root' })
export class ThemeService {
  
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  private DARK_MODE_CLASS: string = 'my-app-dark';
  private APP_MODE_KEY: string = 'prime-mode';
  private APP_PRESET_KEY: string = 'prime-preset';
  
  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.initDarkMode());
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable()
    .pipe(
      tap((isDarkMode: boolean) => this.toggleHtmlClass(isDarkMode))
    );
  
  private presetSubject: BehaviorSubject<Preset> = new BehaviorSubject<Preset>(this.initPreset());
  preset$: Observable<Preset> = this.presetSubject.asObservable()
    .pipe(
      tap((preset: Preset) => this.setPreset(preset))
    );
  
  presetOptions: ITheme[] = [
    { name: 'Nora', value: Preset.NORA },
    { name: 'Lara', value: Preset.LARA },
    { name: 'Aura', value: Preset.AURA }
  ];
  
  toggleMode(isDarkMode: boolean): void {
    this.localStorageService.setValue(this.APP_MODE_KEY, isDarkMode);
    this.isDarkModeSubject.next(isDarkMode);
  }
  
  changePreset(preset: Preset): void {
    this.localStorageService.setValue(this.APP_PRESET_KEY, preset);
    this.presetSubject.next(preset);
  }
  
  toggleHtmlClass(isDarkMode: boolean): void {
    document.documentElement.classList.toggle(this.DARK_MODE_CLASS, isDarkMode === true);
  }
  
  setPreset(preset: Preset): void {
    usePreset(PRESETS_MAP[preset]);
  }
  
  private initDarkMode(): boolean {
    return this.localStorageService.getValue(this.APP_MODE_KEY) ?? false;
  }
  
  private initPreset(): Preset {
    return this.localStorageService.getValue(this.APP_PRESET_KEY) ?? Preset.AURA;
  }

}