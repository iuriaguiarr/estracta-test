import { Flex, IconButton, Tooltip } from "@chakra-ui/react";

import { Pagination } from "./Pagination";
import { RefreshCw } from "react-feather";
import { SearchInput } from "./SearchInput";
import { useTable } from "@/contexts/TableContext";

export const Topbar = () => {
  const { getData } = useTable(); // Dados do contexto

  const RefreshButton = () => (
    <Tooltip placement="bottom" label="Atualizar">
      <IconButton
        onClick={getData}
        icon={<RefreshCw size="1rem" />}
        aria-label="Atualizar"
      />
    </Tooltip>
  );

  return (
    <Flex
      justify="space-between"
      align="center"
      gap="4"
      p="4"
      bg="white"
      boxShadow="md"
      border="1px solid"
      borderColor="gray.200"
    >
      <Flex gap="2">
        <RefreshButton /> {/* Botão para atualizar */}
        <SearchInput /> {/* Campo de busca */}
      </Flex>
      <Pagination /> {/* Paginação */}
    </Flex>
  );
};
