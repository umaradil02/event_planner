import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = () => {
  const { logdinuser } = useSelector((state) => state.auth);

  return (
    <div>
      <Header />
      <Outlet />
      {!logdinuser && <Footer />}
    </div>
  );
};

export default Layout;
