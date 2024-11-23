import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const Logincheker = () => {
  const { loading, logdinuser } = useSelector((state) => state.auth);
  return loading ? (
    <CircularProgress />
  ) : !logdinuser ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" />
  );
};
const Routeprotected = () => {
  const { loading, logdinuser } = useSelector((state) => state.auth);
  // const { loginuser, loadinguser } = useContext(Authcontext);
  return loading ? (
    <CircularProgress />
  ) : logdinuser ? (
    <Outlet />
  ) : (
    <Navigate to="/loginform" />
  );
};
export { Logincheker, Routeprotected };
