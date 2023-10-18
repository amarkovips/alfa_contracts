export interface IContractsFilter extends IObjectKeys {
  merchant?: string;
  autlet?: string;
  terminal?: string;
  eqid?: string;
  company_name?: string;
  ref?: number;
}

export interface ITranchesFilter extends IObjectKeys {
  company_name?: string;
  autlet?: string;
  terminal?: string;
  name?: string;
  from?: Date;
  to?: Date;
  kt?: number;
  dt?: number;
  amount?: number;
  ref?: number;
}

export interface ITransactionsFilter extends IObjectKeys {
  id?: number;
  card_number?: string;
  tid?: string;
  mid?: string;
  utrno?: number;
  auth_code?: string;
  ref?: number;
}

export interface IFilterELem {
  name: string;
  value: string | number;
}

interface IObjectKeys {
  [key: string]: any;
}
