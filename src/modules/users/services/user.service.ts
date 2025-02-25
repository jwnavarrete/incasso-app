import axios from "axios";

import { ErrorHandler } from "@/common/lib/errors";
import {
  IRegisterInvitedUser,
  IUser,
  IUsersResponse,
  IUserUpdate,
} from "../interfaces/user.interface";
import api from "@/common/lib/axiosInstance";
import { QueryParams } from "@/common/interfaces/query.interface";

class UserService {
  async getAllUsers(query: QueryParams): Promise<IUsersResponse> {
    try {
      const response = await api.get("/users", {
        params: query,
      });

      const users: IUsersResponse = response.data;

      return users;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async updateUser(userId: string, updateData: IUserUpdate): Promise<IUser> {
    try {
      const response = await api.patch(`/users/${userId}/update`, updateData);

      const updatedUser: IUser = response.data;

      return updatedUser;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async resendInvitation(userId: string): Promise<void> {
    try {
      await api.post(`/users/${userId}/resend-invitation`);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async inviteUsers(roleId: string, emails: string[]): Promise<void> {
    try {
      await api.post("/users/invite", {
        roleId,
        emails,
      });
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async registerUser(params: IRegisterInvitedUser): Promise<void> {
    try {
      const response = await api.post("/users/register", params);

      console.log(response);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async verifyInvitationToken(userId: string, token: string): Promise<void> {
    try {
      const response = await api.post(
        `/users/${userId}/verify-invitation-token`,
        {
          token,
        }
      );

      console.log(response);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }
}

export const userService = new UserService();
