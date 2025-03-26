import { defineStore } from 'pinia'
import {
  getDepartments as getDepartmentsUseCase,
  createDepartment as createDepartmentUseCase,
  updateDepartment as updateDepartmentUseCase,
  deleteDepartment as deleteDepartmentUseCase
} from '@/app/modules/departments/DepartmentRepository'
import { Department } from '@/app/modules/departments/domain/department'
import { Activity } from '@/app/modules/activities/domain/activity'
import {
  getActivities as getActivitiesUseCase, 
  createActivity as createActivityUseCase,
  updateActivity as updateActivityUseCase,
  deleteActivity as deleteActivityUseCase
} from '@/app/modules/activities/ActivityRepository'
import { PageFilters } from '@/app/network/domain/interfaces/FetchPage'

export const useDepartmentStore = defineStore('department', {
  state: () => ({
    departments: [] as Department[],
    activities: [] as Activity[]
  }),
  actions: {
    setDepartments(departments: Department[]) {
      this.departments = departments
    },
    setActivities(activities: Activity[]) {
      this.activities = activities
    },

    /* API FETCH */
    // GET DEPARTMENTS
    async getDepartments(filters: PageFilters) {
      const action = await getDepartmentsUseCase(filters)
        .then((response) => {
          this.setDepartments(response.data)
          return response
        })
        .catch((error: Error) => {
          throw error
        })
      return action
    },

    // CREATE DEPARTMENT
    async createDepartment(department: Partial<Department>) {
      const action = await createDepartmentUseCase(department)
        .then((response) => {
          this.departments.push(response.data)
          return response
        })
        .catch((error: Error) => {
          throw error
        })
      return action
    },

    // UPDATE DEPARTMENT
    async updateDepartment(departmentId: string, department: Partial<Department>) {
      const action = await updateDepartmentUseCase(departmentId, department)
        .then((response) => {
          const index = this.departments.findIndex((d) => d.id === departmentId)
          if (index !== -1) {
            this.departments[index] = response.data
          }
          return response
        })
        .catch((error: Error) => {
          throw error
        })
      return action
    },

    // DELETE DEPARTMENT
    async deleteDepartment(departmentId: string) {
      const action = await deleteDepartmentUseCase(departmentId)
        .then((response) => {
          this.departments = this.departments.filter((d) => d.id !== departmentId)
          return response
        })
        .catch((error: Error) => {
          throw error
        })
      return action
    },

    // GET ACTIVITIES
    async getActivities(filters: PageFilters) {
      const action = await getActivitiesUseCase(filters)
        .then((response) => {
          this.setActivities(response.data)
          return response
        })
        .catch((error: Error) => {
          throw error
        })
      return action
    },

    // CREATE ACTIVITY
    async createActivity(activity: Partial<Activity>) {
      const action = await createActivityUseCase(activity)
        .then((response) => {
          this.activities.push(response.data)
          return response
        })
        .catch((error: Error) => {
          throw error
        })
      return action
    },

    // UPDATE ACTIVITY
    async updateActivity(activityId: string, activity: Partial<Activity>) {
      const action = await updateActivityUseCase(activityId, activity)
        .then((response) => {
          const index = this.activities.findIndex((a) => a.id === activityId)
          if (index !== -1) {
            this.activities[index] = response.data
          }
          return response
        })
        .catch((error: Error) => {
          throw error
        })
      return action
    },

    // DELETE ACTIVITY
    async deleteActivity(activityId: string) {
      const action = await deleteActivityUseCase(activityId)
        .then((response) => {
          this.activities = this.activities.filter((a) => a.id !== activityId)
          return response
        })
        .catch((error: Error) => {
          throw error
        })
      return action
    }
  }
})
