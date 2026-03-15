import { useAppSelector } from "@/hooks/useRedux";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  element: JSX.Element;
  unauthorizedRedirectPath?: string;
};
const ProtectedRoute = ({
  element,
  unauthorizedRedirectPath = "/login",
}: ProtectedRouteProps) => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to={unauthorizedRedirectPath} />;
  }
  return element;
};

export default ProtectedRoute;
