export interface ITransaction extends IObjectKeys {
  ref: number;
  id: number;
  card_number: string;
  amount: string;
  currency: string;
  device_number: number;
  operation_type: number;
  operation_date: number;
  tid: string;
  mid: string;
  utrno: number;
  auth_code: string;
  aggregation: string[];
  other: string;
}

interface IObjectKeys {
  [key: string]: any;
}
