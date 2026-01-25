export class Collection<T> {
  
  private elements: T[] = []; 
  
  constructor(enterElements: T[]) {
    this.elements = enterElements;
  }
  
  getAll(): T[] {
    return this.elements;
  }
  
  getCertainElement(index: number): T {
    return this.elements[index];
  }
  
  clearСollection(): void {
    this.elements = [];
  }
  
  deleteCertainElement(element: T): T[] {
    return this.elements.filter(el => el !== element);
  }
  
  replaceElement(oldElement: T, newElement: T): T[] {
    return this.elements.map(el => el === oldElement ? newElement : el);
  }
  
}

const products: string[] = ['banana', 'apple', 'orange'];
const numbers: number[] = [10, 20, 30];

const productsCollection: Collection<string> = new Collection<string>(products);
const numberCollection: Collection<number> = new Collection<number>(numbers);