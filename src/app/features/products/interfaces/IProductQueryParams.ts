import { ProductSort } from '../enums/ProductSort';
import { ProductSortOrder } from '../enums/ProductSortOrder';

export interface IProductQueryParams {
  query: string;
  category: string;
  sortBy: ProductSort;
  order: ProductSortOrder;
  limit?: number;
  skip?: number;
}
