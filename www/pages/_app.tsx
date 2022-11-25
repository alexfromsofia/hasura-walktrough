import "../styles/globals.css";
import type { AppProps } from "next/app";
import withUrql from "../utils/client";
import Header from "../components/Header";
import { ThemeProvider } from "next-themes";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="cupcake">
      <div className="container mx-auto max-w-5xl">
        <Header />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default withUrql(App);
