import {
  Table as ChakraTable,
  CircularProgress,
  Flex,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ChevronDown, ChevronUp } from "react-feather";

import { useTable } from "@/contexts/TableContext";

export const Table = () => {
  const { dataToShow, isLoading, orderBy, setOrderBy, tableHeaders } =
    useTable(); // Dados do contexto

  return (
    <Flex
      p="4"
      bg="white"
      boxShadow="md"
      border="1px solid"
      borderColor="gray.200"
      maxH="80vh"
      overflow="auto"
    >
      <ChakraTable>
        {/* Cabeçalho da tabela */}
        <Thead>
          <Tr>
            {/* Mapeamento dos cabeçalhos */}
            {tableHeaders.map((th, i) => (
              <Th
                key={i}
                cursor="pointer"
                // Ação para definir a ordem de exibição
                onClick={() =>
                  setOrderBy({
                    key: th.key,
                    isAsc:
                      orderBy.key === th.key ? !orderBy.isAsc : orderBy.isAsc,
                  })
                }
                // Ação para definir a ordem de exibição
              >
                <Flex gap="2" align="center">
                  {th.title} {/* Título do cabeçalho */}
                  {/* Indicador da ordem de exibição */}
                  {orderBy.key === th.key ? (
                    <>{orderBy.isAsc ? <ChevronUp /> : <ChevronDown />}</>
                  ) : (
                    <></>
                  )}
                  {/* Indicador da ordem de exibição */}
                </Flex>
              </Th>
            ))}
            {/* Mapeamento dos cabeçalhos */}
          </Tr>
        </Thead>
        {/* Cabeçalho da tabela */}
        <Tbody>
          {/* Mapeamento das linhas de dados */}
          {!isLoading ? (
            dataToShow.map((people, i) => (
              <Tr key={i}>
                <Td>{people.name}</Td>
                <Td>{people.birthday}</Td>
                <Td>{people.email}</Td>
                <Td>{people.phone}</Td>
              </Tr>
            ))
          ) : (
            // Indicador de carregamento
            <Tr>
              <Td align="center" colSpan={4}>
                <Flex w="full" align="center" justify="center">
                  <CircularProgress isIndeterminate />
                </Flex>
              </Td>
            </Tr>
            // Indicador de carregamento
          )}
          {/* Mapeamento das linhas de dados */}
        </Tbody>
      </ChakraTable>
    </Flex>
  );
};
