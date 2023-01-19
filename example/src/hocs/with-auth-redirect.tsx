import { selectUser } from "forema-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const withAuthRedirect =
  (Children: React.ElementType) => (props: any) => {
    const user = useSelector(selectUser);
    if (!user.data) {
      return <Navigate to="/login" replace />;
    }

    return <Children {...props} />;
  };
