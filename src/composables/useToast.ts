import { toast } from 'vue3-toastify'

export const useToast = () => {
  const success = (message: string) => {
    toast.success(message)
  }

  const error = (message: string) => {
    toast.error(message)
  }

  const info = (message: string) => {
    toast.info(message)
  }

  const warning = (message: string) => {
    toast.warning(message)
  }

  return {
    success,
    error,
    info,
    warning,
    toast, // Expose the original toast object for advanced usage
  }
}