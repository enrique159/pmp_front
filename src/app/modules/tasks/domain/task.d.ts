import { Base } from '@/app/shared/types/Base'

export interface Task extends Base {
  project_id: string
  user_id: string
  activity_id: string
  description: string
  date?: Date
  hours: number
  extra_hours?: number
  status?: TaskStatus
  approved_by?: string
}

export interface CreateTask
  extends Omit<
    Task,
    'id' | 'created_at' | 'updated_at' | 'approved_by' | 'status' | 'date'
  > {}

export enum TaskStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}