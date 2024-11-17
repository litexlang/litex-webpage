import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import AppLayout from "./ui/AppLayout";
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "Litexlang",
};

export default function RootLayout({ children }) {
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
