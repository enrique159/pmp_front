import type { Base } from '@/app/shared/types/Base'

interface User extends Base {
  code: string
  name: string
  email: string
  password: string
  nss: string
  employer_registration?: string
  hire_date: Date
  daily_salary?: number
  department_id: string
  position: string
  cost_center?: string
  status: string
}