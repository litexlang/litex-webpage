"use client";
import { Box, Divider, Drawer, Toolbar } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SnackbarProvider } from "notistack";
import Image from "next/image";
import logo from "./homepage/logo.png"
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useRouter } from "next/navigation";

export default function AppLayout({ children }: { children: ReactNode }) {
  // route vars
  const pathname = usePathname();
  const router = useRouter()

  // state vars
  const [routes, setRoutes] = useState([{ title: "", path: "" }])

  const routesInit = () => {
    fetch("/api/route").then((resp) => {
      if (resp.status === 200) {
        resp.json().then((json) => {
          setRoutes(json.data);
        });
      }
    });
  }

  const shouldPopup = (path: string) => {
    return path.indexOf("https://") === 0 || path.indexOf("http://") === 0;
  }

  const shouldJump = (path: string) => {
    return path.lastIndexOf("/") !== path.length - 1 || path === "/";
  }

  useEffect(() => { routesInit() }, [])

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
      <Box sx={{ display: "flex" }}>
        <Drawer variant="permanent" anchor="left"
          sx={{
            width: 240,
            '& .MuiDrawer-paper': {
              width: 240,
            },
          }}>
          <Toolbar>
            <Image src={logo} alt="" width={36} height={36} style={{ cursor: "pointer" }} onClick={(() => { router.push("/") })} />
          </Toolbar>
          <Divider />
          <RichTreeView
            items={routes}
            selectedItems={pathname}
            getItemId={(item) => item.path}
            getItemLabel={(item) => item.title}
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            onItemClick={(event, docPath) => {
              if (shouldJump(docPath)) {
                if (shouldPopup(docPath)) {
                  window.open(docPath, "_blank");
                } else {
                  router.push(docPath)
                }
              }
            }} />
        </Drawer>
        <Box flex={1}>
          {children}
        </Box>
      </Box>
    </SnackbarProvider >
  );
}
