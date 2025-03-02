"use client";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { grey } from "@mui/material/colors";
import { OpenInNew } from "@mui/icons-material";
import Image from "next/image";
import logo from "./homepage/logo.png"

export default function AppLayout({ children }: { children: ReactNode }) {
  // route vars
  const pathname = usePathname();

  // state vars
  const [routes, setRoutes] = useState([{ icon: "", title: "", path: "" }])

  const routesInit = () => {
    fetch("/api/route").then((resp) => {
      if (resp.status === 200) {
        resp.json().then((json) => {
          setRoutes(json.data);
        });
      }
    });
  }

  useEffect(() => { routesInit() }, [])

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
      <AppBar elevation={0} color="default">
        <Toolbar>
          <Box flex={1}>
            <Image src={logo} alt="" width={36} height={36} />
          </Box>
          {routes && routes.map((route, index) => (
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
                sx={{ mx: 1 }}
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
