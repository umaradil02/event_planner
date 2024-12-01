import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
const isAdmin = (user) => user?.uid === "lnfg9c7PTjaSOxqlCbU0sW3pGkb2";
const Logincheker = () => {
  const { loading, logdinuser } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return logdinuser ? <Navigate to="/dashboard" /> : <Outlet />;
};

const Routeprotected = () => {
  const { loading, logdinuser } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (logdinuser) {
    const userAdmin = isAdmin(logdinuser);
    if (userAdmin && location.pathname !== "/admin") {
      return <Navigate to="/admin" />;
    }
    if (!userAdmin && location.pathname === "/admin") {
      return <Navigate to="/dashboard" />;
    }
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

export { Logincheker, Routeprotected, isAdmin };
