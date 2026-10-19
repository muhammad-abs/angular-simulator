import { IProduct } from './IProduct';

export interface IProductDetails extends IProduct {
  discount: number,
  brand: string,
  dimensions: IDimensions,
  warranty: string,
  shipping_information: string
}

interface IDimensions {
  width: number,
  height: number,
  depth: number
}