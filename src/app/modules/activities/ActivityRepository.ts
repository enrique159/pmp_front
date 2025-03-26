import Http from '@/app/network/Http'
import Routes from '@/app/shared/routes'
import type { Activity } from './domain/activity'
import type { Response } from '@/app/network/domain/interfaces'
import { PageFilters } from '@/app/network/domain/interfaces/FetchPage'
import env from '@/app/shared/env'

const http = new Http()

export const getActivities = async (filters: PageFilters): Promise<Response<Activity[]>> => {
  const url = Routes.getActivities(env.apiBase)
  const response = await http.get<PageFilters, Activity[]>(url, { params: filters })
  return response
}

export const getActivity = async (activityId: string): Promise<Response<Activity>> => {
  const url = Routes.getActivity(env.apiBase, activityId)
  const response = await http.get<string, Activity>(url)
  return response
}

export const createActivity = async (activity: Partial<Activity>): Promise<Response<Activity>> => {
  const url = Routes.createActivity(env.apiBase)
  const response = await http.post<Partial<Activity>, Activity>(url, { data: activity })
  return response
}

export const updateActivity = async (activityId: string, activity: Partial<Activity>): Promise<Response<Activity>> => {
  const url = Routes.updateActivity(env.apiBase, activityId)
  const response = await http.put<Partial<Activity>, Activity>(url, { data: activity })
  return response
}

export const deleteActivity = async (activityId: string): Promise<Response<Activity>> => {
  const url = Routes.deleteActivity(env.apiBase, activityId)
  const response = await http.delete<string, Activity>(url)
  return response
}