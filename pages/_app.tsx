import "@/styles/globals.css";
import type { AppProps } from "next/app";

// Theme
import { ThemeProvider } from "next-themes"

// User Context
import UserProvider from "@/utils/UserProvider";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
}
