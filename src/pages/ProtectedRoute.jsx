import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

/**
 * The `ProtectedRoute` component is used to render its children only if the user is authenticated,
 * otherwise it redirects to the home page.
 * @returns The ProtectedRoute component returns the children components if the user is authenticated,
 * otherwise it returns null.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
