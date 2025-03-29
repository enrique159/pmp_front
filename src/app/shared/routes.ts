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
// DEPARTMENTS ROUTES
const getDepartments = (baseUrl: string) => `${finishSlash(baseUrl)}departments`
const getDepartment = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}departments/${id}`
const createDepartment = (baseUrl: string) => `${finishSlash(baseUrl)}departments`
const updateDepartment = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}departments/${id}`
const deleteDepartment = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}departments/${id}`

// ACTIVITIES ROUTES
const getActivities = (baseUrl: string) => `${finishSlash(baseUrl)}activities`
const getActivity = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}activities/${id}`
const createActivity = (baseUrl: string) => `${finishSlash(baseUrl)}activities`
const updateActivity = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}activities/${id}`
const deleteActivity = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}activities/${id}`

// PROJECTS ROUTES
const getProjects = (baseUrl: string) => `${finishSlash(baseUrl)}projects`
const getProject = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}projects/${id}`
const createProject = (baseUrl: string) => `${finishSlash(baseUrl)}projects`
const updateProject = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}projects/${id}`
const deleteProject = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}projects/${id}`

// PROJECT TASKS ROUTES
const getTasks = (baseUrl: string) => `${finishSlash(baseUrl)}tasks`
const getTask = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}tasks/${id}`
const createTask = (baseUrl: string) => `${finishSlash(baseUrl)}tasks`
const updateTask = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}tasks/${id}`
const deleteTask = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}tasks/${id}`

// CLIENTS ROUTES
const getClients = (baseUrl: string) => `${finishSlash(baseUrl)}clients`
const getClient = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}clients/${id}`
const createClient = (baseUrl: string) => `${finishSlash(baseUrl)}clients`
const updateClient = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}clients/${id}`
const deleteClient = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}clients/${id}`

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
  // DEPARTMENTS ROUTES
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  // PROJECTS ROUTES
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  // PROJECT TASKS ROUTES
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  // ACTIVITIES ROUTES
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,

  // CLIENTS ROUTES
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
}
