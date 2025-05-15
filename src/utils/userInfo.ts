import { localStorageHelper } from "./localStorage";
import { iUserInfo } from "@/common/types/auth/auth";

export const getUserInfo = (): iUserInfo | null => {
  const userInfo = localStorageHelper.getItem("userInfo");
  if (userInfo) {
    try {
      return JSON.parse(userInfo) as iUserInfo;
    } catch (error) {
      console.error("Error parsing userInfo from localStorage", error);
      return null;
    }
  }
  return null;
};

export const setUserInfo = (userInfo: iUserInfo): void => {
  localStorageHelper.setItem("userInfo", JSON.stringify(userInfo));
};
export const clearUserInfo = (): void => {
  localStorageHelper.removeItem("userInfo");
};
