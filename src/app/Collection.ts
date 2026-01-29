export class Collection<T> {
  
  private elements: T[] = []; 
  
  constructor(enterElements: T[]) {
    this.elements = enterElements;
  }
  
  getAll(): T[] {
    return this.elements;
  }
  
  getByIndex(index: number): T {
    return this.elements[index];
  }
  
  clearСollection(): void {
    this.elements = [];
  }
  
  removeElement(element: T): T[] {
    return this.elements.filter((el: T) => el !== element);
  }
  
  replaceElement(oldElement: T, newElement: T): T[] {
    return this.elements.map((el: T) => el === oldElement ? newElement : el);
  }
  
}

const products: string[] = ['banana', 'apple', 'orange'];
const numbers: number[] = [10, 20, 30];

const productsCollection: Collection<string> = new Collection<string>(products);
const numberCollection: Collection<number> = new Collection<number>(numbers);