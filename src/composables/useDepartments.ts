import { Activity } from "@/app/modules/activities/domain/activity";
import { Department } from "@/app/modules/departments/domain/department";
import { PageFilters } from "@/app/network/domain/interfaces/FetchPage";
import { useDepartmentStore } from "@/stores/departmentStore";
import { storeToRefs } from "pinia";

export const useDepartments = () => {
  const departmentStore = useDepartmentStore()
  const { departments, activities } = storeToRefs(departmentStore)

  function getDepartments(filters: PageFilters) {
    return departmentStore.getDepartments(filters)
  }
  function createDepartment(department: Partial<Department>) {
    return departmentStore.createDepartment(department)
  }
  function updateDepartment(departmentId: string, department: Partial<Department>) {
    return departmentStore.updateDepartment(departmentId, department)
  }
  function deleteDepartment(departmentId: string) {
    return departmentStore.deleteDepartment(departmentId)
  }

  // ACTIVITIES
  function getActivities(filters: PageFilters) {
    return departmentStore.getActivities(filters)
  }
  function createActivity(activity: Partial<Activity>) {
    return departmentStore.createActivity(activity)
  }
  function updateActivity(activityId: string, activity: Partial<Activity>) {
    return departmentStore.updateActivity(activityId, activity)
  }
  function deleteActivity(activityId: string) {
    return departmentStore.deleteActivity(activityId)
  }

  return {
    departments,
    activities,
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getActivities,
    createActivity,
    updateActivity,
    deleteActivity
  }
}