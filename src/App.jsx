import React, { useMemo } from "react";
import { router } from "./routes/Index";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/configure";
import { useDispatch, useSelector } from "react-redux";
import { inital, login, logout } from "./slices/slice";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(inital());
      if (user) {
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            name: user.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}

export default App;
