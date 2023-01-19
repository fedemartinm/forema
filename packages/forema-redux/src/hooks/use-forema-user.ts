import { getUser, createUser, updateUser, deleteUser } from "../services";
import { useDispatch, useSelector } from "react-redux";
import { ForemaDispatch } from "../reducer/forema";
import { selectUser } from "../selectors";
import { User, Nullable } from "shared";

export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}

interface ForemaUserProps {
  user: Nullable<User>;
  error: Nullable<SerializedError>;
  getUser: (userId: string) => void;
  createUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
}

export const useForemaUser = (): ForemaUserProps => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<ForemaDispatch>();

  return {
    user: user.data,
    error: user.error,
    getUser: (userId: string) => dispatch(getUser(userId)),
    createUser: (user: User) => dispatch(createUser(user)),
    updateUser: (user: User) => dispatch(updateUser(user)),
    deleteUser: (userId: string) => dispatch(deleteUser(userId)),
  };
};
