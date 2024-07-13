"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MusicBoard from "./components/musicBoard";
import { createTheme, ThemeProvider } from "@mui/material";

const queryClient = new QueryClient();

export default function Home() {
  const theme = createTheme({
    typography: {
      // fontFamily: "Inter",
    },
  });
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <MusicBoard />
        </ThemeProvider>
      </QueryClientProvider>
    </main>
  );
}
