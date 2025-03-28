import type { Base } from '@/app/shared/types/Base'

export interface Client extends Base {
  company_name: string
  address: string
  city: string
  state: string
  country: string
}