import {
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";

import { Search } from "react-feather";
import { useTable } from "@/contexts/TableContext";

export const SearchInput = () => {
  const { handleSearch, search, setSearch } = useTable(); // Dados do contexto
  return (
    <FormControl maxW="300px" as="form">
      <InputGroup>
        {/* Campo de busca */}
        <Input
          placeholder="Buscar pessoa..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        {/* Campo de busca */}
        <InputRightElement>
          {/* Botão de busca */}
          <IconButton
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            icon={
              <Tooltip placement="bottom" label="Buscar">
                <Search size="1rem" />
              </Tooltip>
            }
            aria-label="Pesquisar"
          />
          {/* Botão de busca */}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};
