import Http from '@/app/network/Http'
import Routes from '@/app/shared/routes'
import type { Project } from './domain/project.d'
import { type Response } from '@/app/network/domain/interfaces'
import type { PageFilters } from '@/app/network/domain/interfaces/FetchPage'
import env from '@/app/shared/env'

const http = new Http()

export const getProjects = async (filters: PageFilters): Promise<Response<Project[]>> => {
  const url = Routes.getProjects(env.apiBase)
  const response = await http.get<PageFilters, Project[]>(url, { params: filters })
  return response
}

export const getProject = async (projectId: string): Promise<Response<Project>> => {
  const url = Routes.getProject(env.apiBase, projectId)
  const response = await http.get<string, Project>(url)
  return response
}

export const createProject = async (payload: Partial<Project>): Promise<Response<Project>> => {
  const url = Routes.createProject(env.apiBase)
  const response = await http.post<Partial<Project>, Project>(url, { data: payload })
  return response
}

export const updateProject = async (projectId: string, project: Partial<Project>): Promise<Response<Project>> => {
  const url = Routes.updateProject(env.apiBase, projectId)
  const response = await http.put<Partial<Project>, Project>(url, { data: project })
  return response
}

export const deleteProject = async (projectId: string): Promise<Response<Project>> => {
  const url = Routes.deleteProject(env.apiBase, projectId)
  const response = await http.delete<string, Project>(url)
  return response
}