import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchUsers, createUser, updateUser, deleteUser } from "@/app/store/slices/user/userThunks";
import { IUser } from "@/shared/types";

export function useUser() {
  const dispatch = useAppDispatch();
  const { users, loadingUsers, error } = useAppSelector((state) => state.users);

  const isFatched = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (!isFatched.current) dispatch(fetchUsers());
    isFatched.current = true;
  }, [dispatch]);

  function handleAddUser(user: IUser) {
    dispatch(createUser(user));
  }

  function handleUpdateUser(userId: number, user: IUser) {
    dispatch(updateUser({ userId, user }));
  }

  function handleDeleteUser(userId: number) {
    dispatch(deleteUser(userId));
  }

  return {
    users,
    loadingUsers,
    error,

    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
  };
}
