import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../component/Layout";
import LoginForm from "../component/LoginForm";
import SignupForm from "../component/SignupForm";
import DashBoard from "../pages/DashBoard";
import WelcomePage from "../pages/WelComePage";
import { Logincheker, Routeprotected } from "../component/RouteCheker";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route element={<Routeprotected />}>
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
        <Route element={<Logincheker />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/loginform" element={<LoginForm />} />
          <Route path="/signupform" element={<SignupForm />} />
        </Route>
      </Route>
    </>
  )
);
