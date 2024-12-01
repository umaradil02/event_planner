import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../component/Layout";
import LoginForm from "../component/LoginForm";
import SignupForm from "../component/SignupForm";
import DashBoard from "../component/usere_dashboard/UserDashboard";
import WelcomePage from "../pages/WelComePage";
import { Logincheker, Routeprotected } from "../component/RouteCheker";
import Admin from "../component/admin/admin";
import EventDetails from "../component/usere_dashboard/EventDetails";
import BookedEvents from "../component/usere_dashboard/BookedEvents";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route element={<Routeprotected />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/my-bookings" element={<BookedEvents />} />
          <Route path="/admin" element={<Admin />} />
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
