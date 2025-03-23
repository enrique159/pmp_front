const finish = (string: string, end: string) => string.endsWith(end) ? string : `${string}${end}`
const finishSlash = (string: string) => finish(string, '/')

// AUTH ROUTES
const signIn = (baseUrl: string) => `${finishSlash(baseUrl)}auth/signin`
const signOut = (baseUrl: string) => `${finishSlash(baseUrl)}auth/signout`
// USERS ROUTES
const getUsers = (baseUrl: string) => `${finishSlash(baseUrl)}users`
const getUser = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}users/${id}`
const createUser = (baseUrl: string) => `${finishSlash(baseUrl)}users`
const updateUser = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}users/${id}`
const deleteUser = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}users/${id}`
// PROJECTS ROUTES
const getProjects = (baseUrl: string) => `${finishSlash(baseUrl)}projects`
const getProject = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}projects/${id}`
const createProject = (baseUrl: string) => `${finishSlash(baseUrl)}projects`
const updateProject = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}projects/${id}`
const deleteProject = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}projects/${id}`
// ACTIVITIES ROUTES
const getActivities = (baseUrl: string) => `${finishSlash(baseUrl)}activities`
const getActivity = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}activities/${id}`
const createActivity = (baseUrl: string) => `${finishSlash(baseUrl)}activities`
const updateActivity = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}activities/${id}`
const deleteActivity = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}activities/${id}`

export default {
  // AUTH ROUTES
  signIn,
  signOut,
  // USERS ROUTES
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  // PROJECTS ROUTES
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  // ACTIVITIES ROUTES
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
}
