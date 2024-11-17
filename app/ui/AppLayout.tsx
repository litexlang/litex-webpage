"use client";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { grey } from "@mui/material/colors";
import { OpenInNew } from "@mui/icons-material";
import routeList from "../lib/routeList";

export default function AppLayout({ children }) {
  // theme vars
  const theme = useTheme();

  // route vars
  const pathname = usePathname();

  // state vars
  const [title, setTitle] = useState("");

  // get page title name
  const titleInit = () => {
    setTitle(
      "LitexLang | " +
        routeList.find((route) => {
          return route.path === pathname;
        }).title
    );
  };

  useEffect(() => {
    titleInit();
  }, [pathname]);

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
      <AppBar elevation={0} color="default">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {routeList.map((route, index) => (
            <Link
              key={index}
              href={route.path}
              target={route.path.indexOf("http") === 0 ? "_blank" : "_self"}
              style={{
                textDecoration: "none",
                color: pathname === route.path ? grey[900] : grey[600],
              }}
            >
              <Button
                startIcon={route.icon}
                endIcon={route.path.indexOf("http") === 0 && <OpenInNew />}
                color="inherit"
              >
                {route.title}
              </Button>
            </Link>
          ))}
        </Toolbar>
      </AppBar>
      {children}
    </SnackbarProvider>
  );
}
