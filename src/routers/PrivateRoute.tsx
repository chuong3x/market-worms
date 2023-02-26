import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

import { authSelector } from "../features/auth.slice";

interface RouteProtectorProps {
  children: JSX.Element;
}

const RouteProtector: React.FC<RouteProtectorProps> = ({ children }) => {
  const { isLogged } = useAppSelector(authSelector);
  return isLogged ? children : <Navigate to="/" replace={true} />;
  // return children;
};

export default RouteProtector;
