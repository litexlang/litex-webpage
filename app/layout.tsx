import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import AppLayout from "./ui/AppLayout";

export const metadata = {
  title: "Litexlang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <CssBaseline />
          <AppLayout>{children}</AppLayout>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
