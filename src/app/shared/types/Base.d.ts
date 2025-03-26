export interface Base {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  createdBy?: string
  updatedBy?: string
  deletedAt?: Date
}

export interface ISuccess {
  success: boolean
}
