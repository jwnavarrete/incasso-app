import axios from "axios";
import { AlertService } from "./alerts";
import { notifyError } from "@/common/lib/notifications";

export class ErrorHandler {
  static handle(error: unknown): never {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "An unexpected error occurred."
      );
    } else {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  }

  static showError(error: unknown, notify: boolean = false): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (notify) {
      notifyError(`Error: ${errorMessage}`);
    } else {
      AlertService.showError(`Error: ${errorMessage}`);
    }
  }

  static showErrorWithCallback(error: unknown, callback: () => void): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    AlertService.showErrorWithCallback(`Error: ${errorMessage}`, callback);
  }
}
