import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralPipe',
  pure: true
})
export class PluralPipe implements PipeTransform {

  transform(count: number | string | null, form1: string, form2: string, form3: string): string {
  
  const currentCount: number = count !== null ? Number(count) : 0;
  const mod100: number = currentCount % 100;
  const mod10: number = currentCount % 10;
  
  if (mod100 >= 11 && mod100 <= 14) {
    return `${currentCount} ${form3}`;
  }
  
  switch(mod10) {
    case 1:
      return `${currentCount} ${form1}`;
    case 2:
    case 3:
    case 4:
      return `${currentCount} ${form2}`;
    default:
      return `${currentCount} ${form3}`;
    }
  };
  
}
