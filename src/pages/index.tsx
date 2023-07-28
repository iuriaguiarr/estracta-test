import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { Table } from "@/components/Table";
import { Topbar } from "@/components/Topbar";

export default function Home() {
  return (
    <>
      {/* Meta tags */}
      <Head>
        <title>eStracta Test</title>
        <meta name="description" content="Desafio React para eStracta" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Meta tags */}

      <Flex w="full" minH="100vh" p="8" flexDir="column" gap="4" bg="gray.100">
        <Topbar /> {/* Barra superior */}
        <Table /> {/* Tabela */}
      </Flex>
    </>
  );
}
