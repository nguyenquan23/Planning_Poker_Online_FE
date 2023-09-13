import { toast } from "react-toastify"

export const toastUnknownError = () => {
  toast.error("Something wrong!", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
}
