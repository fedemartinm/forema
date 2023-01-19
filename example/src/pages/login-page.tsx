import { useForemaUser } from "forema-redux";
import { Login } from "../components";

export const LoginPage = () => {
  const data = useForemaUser();

  return <Login />;
};
