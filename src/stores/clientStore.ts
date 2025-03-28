import { Client } from '@/app/modules/clients/domain/client'
import { PageFilters } from '@/app/network/domain/interfaces/FetchPage'
import { defineStore } from 'pinia'
import {
  getClients as getClientsUseCase,
  createClient as createClientUseCase,
  updateClient as updateClientUseCase,
  deleteClient as deleteClientUseCase
} from '@/app/modules/clients/ClientRepository'

interface ClientStoreState {
  clients: Client[]
}

export const useClientStore = defineStore('client', {
  state: (): ClientStoreState => ({
    clients: [] 
  }),
  actions: {
    setClients(value: Client[]) {
      this.clients = value
    },

    // FETCH API
    async getClients(filters: PageFilters) {
      const action = await getClientsUseCase(filters)
        .then((response) => {
          this.setClients(response.data)
        })
        .catch((error) => {
          throw error
        })
      return action
    },

    async createClient(client: Partial<Client>) {
      const action = await createClientUseCase(client)
        .then((response) => {
          this.clients.push(response.data)
          return response
        })
        .catch((error) => {
          throw error
        })
      return action
    },

    async updateClient(clientId: string, client: Partial<Client>) {
      const action = await updateClientUseCase(clientId, client)
        .then((response) => {
          const index = this.clients.findIndex((client) => client.id === clientId)
          if (index !== -1) {
            this.clients[index] = response.data
          }
          return response
        })
        .catch((error) => {
          throw error
        })
      return action
    },

    async deleteClient(clientId: string) {
      const action = await deleteClientUseCase(clientId)
        .then((response) => {
          this.clients = this.clients.filter((client) => client.id !== clientId)
          return response
        })
        .catch((error) => {
          throw error
        })
      return action
    }
  }
})
