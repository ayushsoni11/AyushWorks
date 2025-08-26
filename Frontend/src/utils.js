import { toast } from "react-toastify";

const handleError = (msg) => {
    toast.error(msg, {
        position : "top-right"
    })
}

const handleSuccess = (msg) => {
    toast.success(msg, {position : 'top-right'})
}

export {handleError, handleSuccess};