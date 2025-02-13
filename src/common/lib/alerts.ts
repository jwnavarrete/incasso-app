import Swal from "sweetalert2";

export class AlertService {
  static showSuccess(message: string): void {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
    });
  }

  static showError(message: string): void {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  }

  static showInfo(message: string): void {
    Swal.fire({
      icon: "info",
      title: "Info",
      text: message,
    });
  }

  static showWarning(message: string): void {
    Swal.fire({
      icon: "warning",
      title: "Warning",
      text: message,
    });
  }

  static showErrorWithCallback(message: string, callback: () => void): void {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    }).then(() => {
      callback();
    });
  }
}
