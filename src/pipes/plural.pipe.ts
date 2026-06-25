import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralPipe',
  pure: true
})
export class PluralPipe implements PipeTransform {

  transform(count: number | string | null, one: string, few: string, many: string): string {
  
    const currentCount: number = count !== null ? Number(count) : 0;
    const lastDigit: number = currentCount % 10;
    const lastTwoDigits: number = currentCount % 100;

    switch (true) {
      case lastTwoDigits >= 11 && lastTwoDigits <= 14:
        return `${ currentCount } ${ many }`;
      case lastDigit === 1:
        return `${ currentCount } ${ one }`;
      case lastDigit >= 2 && lastDigit <= 4:
        return `${ currentCount } ${ few }`;
      default:
        return `${ currentCount } ${ many }`;
    }
  }
  
}
