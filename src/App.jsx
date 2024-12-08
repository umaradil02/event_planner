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
    const unsub = onAuthStateChanged(auth, async (user) => {
      dispatch(inital());
      if (user) {
        await user.reload();
        const { displayName, email, uid } = user;
        dispatch(
          login({
            email,
            uid,
            name: displayName || "Guest",
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => unsub();
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
