import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "react-feather";
import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";

import { useTable } from "@/contexts/TableContext";

export const Pagination = () => {
  const { pagination, setPagination } = useTable(); // Dados do contexto

  return (
    <Flex align="center" gap="2">
      {/* Botão para a primeira página */}
      <Tooltip label="Primeira Página" placement="bottom">
        <IconButton
          icon={<ChevronsLeft size="1rem" />}
          aria-label="Primeira Página"
          isDisabled={pagination.actualPage === 0}
          onClick={() => setPagination({ ...pagination, actualPage: 0 })}
        />
      </Tooltip>
      {/* Botão para a primeira página */}

      {/* Botão para a página anterior */}
      <Tooltip label="Página Anterior" placement="bottom">
        <IconButton
          isDisabled={pagination.actualPage === 0}
          icon={<ChevronLeft size="1rem" />}
          aria-label="Página Anterior"
          onClick={() =>
            setPagination({
              ...pagination,
              actualPage: pagination.actualPage - 1,
            })
          }
        />
      </Tooltip>
      {/* Botão para a página anterior */}

      {/* Exibição da página atual */}
      <Text>
        {pagination.actualPage + 1} de {pagination.maxPages}
      </Text>
      {/* Exibição da página atual */}

      {/* Botão para a próxima página */}
      <Tooltip label="Próxima Página" placement="bottom">
        <IconButton
          isDisabled={pagination.maxPages === pagination.actualPage + 1}
          icon={<ChevronRight size="1rem" />}
          aria-label="Próxima Página"
          onClick={() =>
            setPagination({
              ...pagination,
              actualPage: pagination.actualPage + 1,
            })
          }
        />
      </Tooltip>
      {/* Botão para a próxima página */}

      {/* Botão para a última página */}
      <Tooltip label="Última Página" placement="bottom">
        <IconButton
          onClick={() =>
            setPagination({
              ...pagination,
              actualPage: pagination.maxPages - 1,
            })
          }
          isDisabled={pagination.maxPages === pagination.actualPage + 1}
          icon={<ChevronsRight size="1rem" />}
          aria-label="Última Página"
        />
      </Tooltip>
      {/* Botão para a última página */}
    </Flex>
  );
};
