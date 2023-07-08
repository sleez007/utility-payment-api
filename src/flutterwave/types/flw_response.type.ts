import { FlwProduct } from './flw_product.types';

export type FlwResponse = {
  message: string;
  status: string;
  data: FlwProduct[];
};
