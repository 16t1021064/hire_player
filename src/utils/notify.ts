import { store } from "react-notifications-component";

type TNotifyType =
  | "success"
  | "danger"
  | "info"
  | "default"
  | "warning"
  | undefined;

interface Options {
  title?: string;
  message: string;
  onRemoval?: ((id: string, removedBy: any) => void) | undefined;
}

const notify = (options: Options, type: TNotifyType = "default") => {
  store.addNotification({
    title: options.title,
    message: options.message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
      pauseOnHover: true,
    },
    onRemoval: options.onRemoval,
  });
};

export const notifySuccess = (message: any) => {
  notify({ message }, "success");
};

export const notifyDanger = (message: any) => {
  notify({ message }, "danger");
};

export const notifyInfo = (message: any) => {
  notify({ message }, "info");
};

export const notifyWarning = (message: any) => {
  notify({ message }, "warning");
};

export default notify;
