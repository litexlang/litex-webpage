import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import AppLayout from "./ui/AppLayout";
import StoreProvider from "./StoreProvider";
import { ReactNode } from "react";

export const metadata = {
  title: "Litex",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <CssBaseline />
          <AppRouterCacheProvider>
            <CssBaseline />
            <AppLayout>{children}</AppLayout>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
