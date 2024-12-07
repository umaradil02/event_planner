import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../component/Layout";
import LoginForm from "../component/LoginForm";
import SignupForm from "../component/SignupForm";
import DashBoard from "../component/usere_dashboard/UserDashboard";
import WelcomePage from "../pages/WelcomePage";
import { Logincheker, Routeprotected } from "../component/RouteCheker";
import Admin from "../component/admin/admin";
import EventDetails from "../component/usere_dashboard/EventDetails";
import BookedEvents from "../component/usere_dashboard/BookedEvents";
import ContactForm from "../component/ContactForm";
import Bookings from "../component/admin/Bookings";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route element={<Routeprotected />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/my-bookings" element={<BookedEvents />} />
          <Route path="/contact-us" element={<ContactForm />} />
          <Route path="/all-bookings" element={<Bookings />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route element={<Logincheker />}>
          <Route path="/" element={<WelcomePage />} />

          <Route path="/loginform" element={<LoginForm />} />
          <Route path="/signupform" element={<SignupForm />} />
        </Route>
      </Route>
    </>
  )
);
