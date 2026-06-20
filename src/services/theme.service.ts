import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { usePreset } from '@primeuix/themes';
import { PrimePreset } from '../enums/PrimePreset';
import { IPreset } from '../interfaces/IPreset';
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
      tap((isDarkMode: boolean) => this.applyDarkMode(isDarkMode))
    );
  
  private presetSubject: BehaviorSubject<PrimePreset> = new BehaviorSubject<PrimePreset>(this.initPreset());
  preset$: Observable<PrimePreset> = this.presetSubject.asObservable()
    .pipe(
      tap((preset: PrimePreset) => this.setPreset(preset))
    );
  
  presetOptions: IPreset[] = [
    { name: 'Nora', value: PrimePreset.NORA },
    { name: 'Lara', value: PrimePreset.LARA },
    { name: 'Aura', value: PrimePreset.AURA }
  ];
  
  toggleDarkMode(isDarkMode: boolean): void {
    this.localStorageService.setValue<boolean>(this.APP_MODE_KEY, isDarkMode);
    this.isDarkModeSubject.next(isDarkMode);
  }
  
  changePreset(preset: PrimePreset): void {
    this.localStorageService.setValue<PrimePreset>(this.APP_PRESET_KEY, preset);
    this.presetSubject.next(preset);
  }
  
  applyDarkMode(isDarkMode: boolean): void {
    document.documentElement.classList.toggle(this.DARK_MODE_CLASS, isDarkMode === true);
  }
  
  setPreset(preset: PrimePreset): void {
    usePreset(PRESETS_MAP[preset]);
  }
  
  private initDarkMode(): boolean {
    return this.localStorageService.getValue<boolean>(this.APP_MODE_KEY) ?? false;
  }
  
  private initPreset(): PrimePreset {
    return this.localStorageService.getValue<PrimePreset>(this.APP_PRESET_KEY) ?? PrimePreset.AURA;
  }

}