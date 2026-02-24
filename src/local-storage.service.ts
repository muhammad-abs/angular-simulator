import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService{
  
  setValue<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  getValue<T>(key: string): T | null {
  const value: string | null = localStorage.getItem(key);
  return value ? JSON.parse(value) as T : null;
}
  
  removeValue(key: string): void {
    localStorage.removeItem(key);
  }
  
  clear(): void {
    localStorage.clear();
  }
  
}
