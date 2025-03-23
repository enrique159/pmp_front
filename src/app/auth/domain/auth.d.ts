import type { UUID } from '@/app/shared/types/Id'

export interface ISignInPayload {
  emailPhone: string
  password: string
}

export interface ISignInResponse {
  _id: UUID
  username: string
  email: string
  phoneNumber: string
  fullName: string
  permissions: number
  twoFactorEnabled: boolean
  registerLocation: boolean
  profileImageUrl?: string
}
