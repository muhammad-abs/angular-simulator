import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '../enums/Theme';
import Nora from '@primeuix/themes/nora';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import { ThemeKey } from '../types/theme.types';
import { updatePreset } from '@primeuix/themes';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  
  private readonly customThemeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.LIGHT);
  public readonly theme$: Observable<Theme> = this.customThemeSubject.asObservable();
  
  private readonly primeThemeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.LIGHT);
  public readonly primeTheme$: Observable<Theme> = this.primeThemeSubject.asObservable();
  
  private readonly presetSubject: BehaviorSubject<string> = new BehaviorSubject<string>('lara');
  public readonly preset$: Observable<string> = this.presetSubject.asObservable();
  
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly DARK_MODE_CLASS = 'my-app-dark';
  
  private readonly presetsMap: Record<string, any> = {
    lara: Lara,
    aura: Aura,
    nora: Nora
  };

  private readonly themeConfig = {
    custom: { subject: this.customThemeSubject, storageKey: 'custom-theme' },
    prime: { subject: this.primeThemeSubject, storageKey: 'prime-theme' },
  };
  
  constructor() {
    (Object.keys(this.themeConfig) as ThemeKey[]).forEach((key) => {
      
      const config = this.themeConfig[key];
      const savedTheme: Theme | null = this.localStorageService.getValue<Theme>(config.storageKey);
      config.subject.next(savedTheme ?? Theme.LIGHT);
      
      if (key === 'prime') {
        this.syncHtmlClass(savedTheme ?? Theme.LIGHT);
      }
      
    });
    
    const savedPreset: string | null = this.localStorageService.getValue<string>('prime-preset');
    this.presetSubject.next(savedPreset ?? 'aura');
    
    setTimeout(() => {
      const selectedPreset = this.presetsMap[savedPreset ?? 'aura'];
      updatePreset(selectedPreset);
    }, 0);
  }
  
  updatePreset(presetName: string): void {
    const selectedPreset = this.presetsMap[presetName];
    updatePreset(selectedPreset);
    
    this.presetSubject.next(presetName);
    this.localStorageService.setValue<string>('prime-preset', presetName);
  }
  
  getCurrentPreset(): string {
    return this.presetSubject.getValue();
  }
  
  getCurrentTheme(key1: ThemeKey): Theme {
    return this.themeConfig[key1].subject.getValue();
  }
  
  toggleTheme(key: ThemeKey): void {
    const config = this.themeConfig[key];
    const currentTheme: Theme = config.subject.getValue();
    const nextTheme: Theme = currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    
    config.subject.next(nextTheme);
    this.localStorageService.setValue<Theme>(config.storageKey, nextTheme);
    
    if (key === 'prime') {
      this.syncHtmlClass(nextTheme);
    }
  }
  
  syncHtmlClass(theme: Theme): void {
    document.documentElement.classList.toggle(this.DARK_MODE_CLASS, theme === Theme.DARK);
  }

}