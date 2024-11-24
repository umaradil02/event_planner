import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

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

  return logdinuser ? <Outlet /> : <Navigate to="/" />;
};

export { Logincheker, Routeprotected };
