"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { debounce } from "lodash";

import {
  IRegisterInvitedUser,
  IUser,
  IUsersResponse,
  IUserUpdate,
} from "@/modules/users/interfaces/user.interface";
import { userService } from "@/modules/users/services/user.service";
import { ErrorHandler } from "@/common/lib/errors";
import { Pagination, QueryParams } from "@/common/interfaces/query.interface";

interface UserContextProps {
  users: IUser[];
  getAllUsers: () => Promise<IUsersResponse>;
  loading: boolean;
  pagination: Pagination;
  query: QueryParams;
  openModalInvite: boolean;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearch: (search: string) => void;
  resendInvitation: (userId: string) => Promise<void>;
  updateUser: (userId: string, updateData: IUserUpdate) => Promise<IUser>;
  setOpenModalInvite: (open: boolean) => void;
  inviteUsers: (roleId: string, emails: string[]) => Promise<void>;
  registerUser: (params: IRegisterInvitedUser) => Promise<void>;
  verifyInvitationToken: (userId: string, token: string) => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [executeSearch, setExecuteSearch] = useState(false);
  const [openModalInvite, setOpenModalInvite] = useState(false);

  const [users, setUsers] = useState<IUser[]>([]);
  const [query, setQuery] = useState<QueryParams>({
    search: "",
    page: 1,
    limit: 10,
  });

  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 0,
  });

  useEffect(() => {
    if (executeSearch) {
      getAllUsers();
      setExecuteSearch(false);
    }
  }, [executeSearch]);

  const getAllUsers = async (): Promise<IUsersResponse> => {
    try {
      setLoading(true);

      const response = await userService.getAllUsers(query);

      setUsers(response.data);

      setPagination({
        currentPage: response.page,
        totalPages: Math.ceil(response.total / response.limit),
        pageSize: response.limit,
        totalItems: response.total,
      });

      return response;
    } catch (error) {
      ErrorHandler.handle(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (
    userId: string,
    updateData: IUserUpdate
  ): Promise<IUser> => {
    try {
      setLoading(true);
      const updatedUser = await userService.updateUser(userId, updateData);
      setExecuteSearch(true);
      return updatedUser;
    } catch (error) {
      ErrorHandler.handle(error);
    } finally {
      setLoading(false);
    }
  };

  const resendInvitation = async (userId: string): Promise<void> => {
    try {
      setLoading(true);
      await userService.resendInvitation(userId);
      setExecuteSearch(true);
    } catch (error) {
      ErrorHandler.handle(error);
    } finally {
      setLoading(false);
    }
  };

  const inviteUsers = async (
    roleId: string,
    emails: string[]
  ): Promise<void> => {
    try {
      setLoading(true);
      await userService.inviteUsers(roleId, emails);
      setExecuteSearch(true);
    } catch (error) {
      ErrorHandler.handle(error);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (params: IRegisterInvitedUser): Promise<void> => {
    try {
      setLoading(true);
      const response = await userService.registerUser(params);
      console.log(response);
    } catch (error) {
      ErrorHandler.handle(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyInvitationToken = async (
    userId: string,
    token: string
  ): Promise<void> => {
    try {
      setLoading(true);
      const response = await userService.verifyInvitationToken(userId, token);
      console.log(response);
    } catch (error) {
      ErrorHandler.handle(error);
    } finally {
      setLoading(false);
    }
  };

  const setPage = (page: number) => {
    setQuery((prevQuery) => ({ ...prevQuery, page }));
  };

  const setLimit = (limit: number) => {
    setQuery((prevQuery) => ({ ...prevQuery, limit }));
  };

  const setSearch = async (search: string) => {
    setQuery((prevQuery) => ({ ...prevQuery, search }));
    debouncedSearch(search);
  };

  const search = (query: string) => {
    setExecuteSearch(true);
  };

  const debouncedSearch = useCallback(debounce(search, 1000), []);

  const contextValue = useMemo(
    () => ({
      loading,
      users,
      pagination,
      query,
      openModalInvite,
      getAllUsers,
      setPage,
      setLimit,
      setSearch,
      updateUser,
      resendInvitation,
      setOpenModalInvite,
      inviteUsers,
      registerUser,
      verifyInvitationToken,
    }),
    [loading, users, pagination, query, openModalInvite]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};
