export interface IContract extends IObjectKeys {
  ref: number;
  date: number;
  autlet: string;
  number: string;
  merchant: number;
  company_name: string;
  bank_details: number;
  inn: number;
  aggregation_scheme: string;
  segment: string;
  bank_accounts: number[];
  personal_account: number;
  bank: string;
  bik: string;
  ks: number;
  payment_order: number;
  other: string;
  email: string[];
  sftp: string;
  eq_id: string;
  tariff: string;
}

interface IObjectKeys {
  [key: string]: any;
}
