import { Project } from '@/app/modules/projects/domain/project'
import { CreateTask, Task } from '@/app/modules/tasks/domain/task'
import { PageFilters } from '@/app/network/domain/interfaces/FetchPage'
import { useProjectStore } from '@/stores/projectStore'
import { storeToRefs } from 'pinia'

export const useProjects = () => {
  const store = useProjectStore()
  const { projects, tasks } = storeToRefs(store)

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
  function getTasks(filters: PageFilters) {
    return store.getTasks(filters)
  }
  function createTask(payload: CreateTask) {
    return store.createTask(payload)
  }
  function updateTask(taskId: string, task: Partial<Task>) {
    return store.updateTask(taskId, task)
  }
  function deleteTask(taskId: string) {
    return store.deleteTask(taskId)
  }
  return {
    projects,
    tasks,
    getProjects,
    getProjectsByClientId,
    createProject,
    updateProject,
    deleteProject,
    getTasks,
    createTask,
    updateTask,
    deleteTask
  }
}
