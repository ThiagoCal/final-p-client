import { useAppContext } from "../Component/AppContext";
import { useLocation, Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { isLogged, user } = useAppContext();
  const location = useLocation();

  console.log("not producer", user);
  if (isLogged === false) {
    // if (user.is_producer === false)
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
