import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { TableProvider } from "@/contexts/TableContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <TableProvider>
        <Component {...pageProps} />
      </TableProvider>
    </ChakraProvider>
  );
}
