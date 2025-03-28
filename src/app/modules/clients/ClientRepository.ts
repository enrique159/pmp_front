import Http from '@/app/network/Http'
import Routes from '@/app/shared/routes'
import type { Client } from './domain/client'
import { type Response } from '@/app/network/domain/interfaces'
import type { PageFilters } from '@/app/network/domain/interfaces/FetchPage'
import env from '@/app/shared/env'

const http = new Http()

export const getClients = async (filters: PageFilters): Promise<Response<Client[]>> => {
  const url = Routes.getClients(env.apiBase)
  const response = await http.get<PageFilters, Client[]>(url, { params: filters })
  return response
}

export const getClient = async (clientId: string): Promise<Response<Client>> => {
  const url = Routes.getClient(env.apiBase, clientId)
  const response = await http.get<string, Client>(url)
  return response
}

export const createClient = async (payload: Partial<Client>): Promise<Response<Client>> => {
  const url = Routes.createClient(env.apiBase)
  const response = await http.post<Partial<Client>, Client>(url, { data: payload })
  return response
}

export const updateClient = async (clientId: string, client: Partial<Client>): Promise<Response<Client>> => {
  const url = Routes.updateClient(env.apiBase, clientId)
  const response = await http.put<Partial<Client>, Client>(url, { data: client })
  return response
}

export const deleteClient = async (clientId: string): Promise<Response<Client>> => {
  const url = Routes.deleteClient(env.apiBase, clientId)
  const response = await http.delete<string, Client>(url)
  return response
}
  