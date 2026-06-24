import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'number',
})
export class NumberPipe implements PipeTransform {

  transform(value: string, mode: string): string {
    
    value = this.standardizeNumber(value);
    
    switch(mode) {
      case('compact'):
        return `${ this.getCompactFormat(value) }`;
      case('international'):
        return `${ this.getInternationalFormat(value) }`;
      case('national'):
        return this.getNationalFormat(value);
      case('masked'):
        return this.getMaskedFormat(value);
      default:
        return `+${ value }`;
    }
  }
  
  standardizeNumber(value: string): string {
    const cleanValue = value.split('x')[0].replace(/[\s().-]/g, '');
    
    const normalizedNumber = cleanValue.length === 10 
    ? '38' + cleanValue 
    : cleanValue.length === 11
      ? '3' + cleanValue 
      : cleanValue; 
      
    return normalizedNumber.length === 12 ? normalizedNumber : `+${ cleanValue }`;
  }
  
  getCompactFormat(number: string): string {
    return `+${ number }`;
  }

  getInternationalFormat(number: string): string {
    const formatted = number.replace(/^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
    return `+${ formatted }`;
  }

  getNationalFormat(number: string): string {
    const formatted = number.slice(2);
    return formatted.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4');
  }

  getMaskedFormat(number: string): string {
    return number.replace(/^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 $2 *** ** $5');
  }
  
}
