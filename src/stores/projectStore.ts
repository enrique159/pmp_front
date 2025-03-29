import { defineStore } from 'pinia'
import { Project } from '@/app/modules/projects/domain/project.d'
import {
  getProjects as getProjectsUseCase,
  createProject as createProjectUseCase,
  updateProject as updateProjectUseCase,
  deleteProject as deleteProjectUseCase
} from '@/app/modules/projects/ProjectRepository'
import {
  getTasks as getTasksUseCase,
  createTask as createTaskUseCase,
  updateTask as updateTaskUseCase,
  deleteTask as deleteTaskUseCase
} from '@/app/modules/tasks/TaskRepository'
import { PageFilters } from '@/app/network/domain/interfaces/FetchPage'
import { CreateTask, Task } from '@/app/modules/tasks/domain/task'

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [] as Project[],
    tasks: [] as Task[]
  }),
  actions: {
    setProjects(projects: Project[]) {
      this.projects = projects
    },
    setTasks(tasks: Task[]) {
      this.tasks = tasks
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
    removeTask(taskId: string) {
      const index = this.tasks.findIndex((t) => t.id === taskId)
      if (index !== -1) {
        this.tasks.splice(index, 1)
      }
    },
    updateTaskInStore(task: Task) {
      const index = this.tasks.findIndex((t) => t.id === task.id)
      if (index !== -1) {
        this.tasks[index] = task
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
    },

    // FETCH TASKS
    async getTasks(filters: PageFilters) {
      const response = await getTasksUseCase(filters)
        .then((response) => {
          this.setTasks(response.data)
          return response
        })
        .catch((error) => {
          throw error
        })
      return response
    },
    async createTask(payload: CreateTask) {
      const response = await createTaskUseCase(payload)
        .then((response) => {
          // @ts-ignore
          this.setTasks([...this.tasks, { ...payload, id: response.data.id! }])
          return response
        })
        .catch((error) => {
          throw error
        })
      return response
    },
    async updateTask(taskId: string, task: Partial<Task>) {
      const response = await updateTaskUseCase(taskId, task)
        .then((response) => {
          this.updateTaskInStore(response.data)
          return response
        })
        .catch((error) => {
          throw error
        })
      return response
    },
    async deleteTask(taskId: string) {
      const response = await deleteTaskUseCase(taskId)
        .then((response) => {
          this.removeTask(taskId)
          return response
        })
        .catch((error) => {
          throw error
        })
      return response
    }
  }
})
