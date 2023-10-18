export interface ITranche extends IObjectKeys {
  ref: number;
  id: number;
  kt: number;
  dt: number;
  date: number;
  amount: string;
  currency: number;
  comment: string;
  charge_date: number;
}

interface IObjectKeys {
  [key: string]: any;
}
