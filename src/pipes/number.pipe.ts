import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'number',
})
export class NumberPipe implements PipeTransform {

  transform(value: string, mode: string): string {
    
    value = this.standardizeNumber(value);
    
    switch(mode) {
      case('compact'):
        return `${this.compact(value)}`;
      case('international'):
        return `${this.international(value)}`;
      case('national'):
        return this.national(value);
      case('masked'):
        return this.masked(value);
      default:
        return `+${value}`;
    }
    
  }
  
  standardizeNumber(value: string): string {
    const cleanValue = value.split('x')[0].replace(/[\s().-]/g, '');
    
    const normalizedNumber = cleanValue.length === 10 
    ? '38' + cleanValue 
    : cleanValue.length === 11
      ? '3' + cleanValue 
      : cleanValue; 
      
    return normalizedNumber.length === 12 ? normalizedNumber : `+${cleanValue}`;
  }
  
  compact(number: string): string {
    return `+${number}`;
  }

  international(number: string): string {
    const formatted = number.replace(/^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
    return `+${formatted}`;
  }

  national(number: string): string {
    const nationalPart = number.slice(2);
    return nationalPart.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4');
  }

  masked(number: string): string {
    return number.replace(/^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 $2 *** ** $5');
  }
  
}
