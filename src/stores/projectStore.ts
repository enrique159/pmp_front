import { defineStore } from 'pinia'
import { Project } from '@/app/modules/projects/domain/project.d'
import {
  getProjects as getProjectsUseCase,
  createProject as createProjectUseCase,
  updateProject as updateProjectUseCase,
  deleteProject as deleteProjectUseCase
} from '@/app/modules/projects/ProjectRepository'
import { PageFilters } from '@/app/network/domain/interfaces/FetchPage'

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [] as Project[]
  }),
  actions: {
    setProjects(projects: Project[]) {
      this.projects = projects
    },
    removeProject(projectId: string) {
      const index = this.projects.findIndex((p) => p.id === projectId)
      if (index !== -1) {
        this.projects.splice(index, 1)
      }
    },
    updateProjectInStore(project: Project) {
      const index = this.projects.findIndex((p) => p.id === project.id)
      if (index !== -1) {
        this.projects[index] = project
      }
    },

    // FETCH API
    async getProjects(filters: PageFilters) {
      const response = await getProjectsUseCase(filters)
        .then((response) => {
          this.setProjects(response.data)
          return response
        })
        .catch((error) => {
          throw error
        })
      return response
    },
    async createProject(payload: Partial<Project>) {
      const response = await createProjectUseCase(payload)
        .then((response) => {
          // @ts-ignore
          this.setProjects([...this.projects, { ...payload, id: response.data.id! }])
          return response
        })
        .catch((error) => {
          throw error
        })
      return response
    },
    async updateProject(projectId: string, project: Partial<Project>) {
      const response = await updateProjectUseCase(projectId, project)
        .then((response) => {
          this.updateProjectInStore(response.data)
          return response
        })
        .catch((error) => {
          throw error
        })
      return response
    },
    async deleteProject(projectId: string) {
      const response = await deleteProjectUseCase(projectId)
        .then((response) => {
          this.removeProject(projectId)
          return response
        })
        .catch((error) => {
          throw error
        })
      return response
    }
  }
})
