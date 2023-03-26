import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToastMessage = (message) => {
  return toast(message);
};
