import { Client } from "@/app/modules/clients/domain/client";
import { PageFilters } from "@/app/network/domain/interfaces/FetchPage";
import { useClientStore } from "@/stores/clientStore";
import { storeToRefs } from "pinia";

export const useClients = () => {
  const clientStore = useClientStore();
  const { clients } = storeToRefs(clientStore);

  function getClients(filters: PageFilters) {
    return clientStore.getClients(filters);
  }

  function createClient(client: Partial<Client>) {
    return clientStore.createClient(client);
  }

  function updateClient(clientId: string, client: Partial<Client>) {
    return clientStore.updateClient(clientId, client);
  }

  function deleteClient(clientId: string) {
    return clientStore.deleteClient(clientId);
  }

  return {
    clients,
    getClients,
    createClient,
    updateClient,
    deleteClient
  };
}