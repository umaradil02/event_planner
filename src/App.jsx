import React from "react";
import { router } from "./routes/Index";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/configure";
import { useDispatch } from "react-redux";
import { inital, login, logout } from "./slices/slice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(inital());
      if (user) {
        dispatch(login({ email: user.email, uid: user.uid }));
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
