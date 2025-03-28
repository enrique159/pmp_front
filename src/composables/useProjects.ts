import { Project } from '@/app/modules/projects/domain/project'
import { PageFilters } from '@/app/network/domain/interfaces/FetchPage'
import { useProjectStore } from '@/stores/projectStore'
import { storeToRefs } from 'pinia'

export const useProjects = () => {
  const store = useProjectStore()
  const { projects } = storeToRefs(store)

  const getProjectsByClientId = async (clientId: string, filters: PageFilters = {}) => {
    await store.getProjects(filters)
    return projects.value.filter((project) => project.client_id === clientId)
  }

  function getProjects(filters: PageFilters) {
    return store.getProjects(filters)
  }
  function createProject(payload: Partial<Project>) {
    return store.createProject(payload)
  }
  function updateProject(projectId: string, project: Partial<Project>) {
    return store.updateProject(projectId, project)
  }
  function deleteProject(projectId: string) {
    return store.deleteProject(projectId)
  }
  return {
    projects,
    getProjects,
    getProjectsByClientId,
    createProject,
    updateProject,
    deleteProject,
  }
}
