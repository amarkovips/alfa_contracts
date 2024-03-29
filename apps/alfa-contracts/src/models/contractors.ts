export interface IContractor extends IObjectKeys {
  merchant: number
  company_name: string
  bank_details: number
  personal_account: number
  bank: string
  bik: string
  ks: number
  payment_order: number
  roles: string[]
  ogrn: string
  inn: number
  ref: number
}

interface IObjectKeys {
  [key: string]: any
}
