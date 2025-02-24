import { toast } from "react-toastify";

export const showToast = (type: "success" | "error" | "info" | "warning", message: string) => {
    toast[type](message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    });
};