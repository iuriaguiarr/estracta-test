import { createContext, useContext, useEffect, useState } from "react";

import { IPeople } from "@/interfaces/people.interface";
import axios from "axios";
import { sortPeopleByProperty } from "@/utils/sortPeopleByProp";
import { useToast } from "@chakra-ui/react";

interface IPagination {
  actualPage: number;
  limit: number;
  maxPages: number;
}

interface IOrderBy {
  key: keyof IPeople;
  isAsc: boolean;
}

// Definindo o formato dos dados que o contexto irá armazenar
interface TableContextData {
  getData: () => void;
  handleSearch: () => void;
  setSearch: (key: string) => void;
  search: string;
  pagination: IPagination;
  setPagination: (key: IPagination) => void;
  orderBy: IOrderBy;
  setOrderBy: (key: IOrderBy) => void;
  dataToShow: IPeople[];
  isLoading: boolean;
  tableHeaders: { title: string; key: keyof IPeople }[];
}

// Criando o contexto
const TableContext = createContext<TableContextData>({} as TableContextData);

// Criando o componente provedor que será usado para envolver os componentes e disponibilizar o contexto
export function TableProvider({ children }: any) {
  const [data, setData] = useState<IPeople[]>([]); // Variável de dados brutos
  const [filteredData, setFilteredData] = useState<IPeople[]>([]); // Variável de dados com filtros aplicados
  const [dataToShow, setDataToShow] = useState<IPeople[]>([]); // Variável de dados filtrados e reduzidos
  const [search, setSearch] = useState(""); // Variável de filtro para busca
  const [orderBy, setOrderBy] = useState<IOrderBy>({
    // Variável de ordenação por propriedade
    key: "name",
    isAsc: true,
  });

  const [pagination, setPagination] = useState({
    // Variável de regras da paginação
    actualPage: 0,
    limit: 25,
    maxPages: 0,
  });

  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento dos dados

  const toast = useToast(); // Pop-up de notificação em tela

  // Função responsável por buscar os dados:
  const getData = async () => {
    setIsLoading(true); // Define o estado de carregamento para verdadeiro
    await axios
      .request({
        url: "/api/peoples",
      })
      .then((res) => setData(res.data)) // Define os dados coletados na variável de dados brutos
      .catch(() => {
        // Em caso de erro, é exibida uma mensagem em tela
        toast({
          title: "Falha ao buscar dados.",
          description:
            "Ocorreu um erro durante a busca dos dados. Tente novamente.",
          status: "error",
        });
      });
    setIsLoading(false); // Define o estado de carregamento para falso
  };

  // Função responsável por buscar um item nos dados brutos
  const handleSearch = () => {
    setPagination({ ...pagination, actualPage: 0, maxPages: 0 }); // Reseta o estado de paginação

    // Filtra e ordena os dados com base nas regras aplicadas pelo usuário
    const filtered = sortPeopleByProperty(
      data.filter((people) =>
        search
          ? people.name.includes(search) ||
            people.birthday.includes(search) ||
            people.email.includes(search) ||
            people.phone.includes(search)
          : true
      ),
      orderBy.key,
      orderBy.isAsc
    );

    setFilteredData(filtered); // Define os dados filtrados

    // Define os dados a serem exibidos baseados no limite de apresentação
    setDataToShow(
      filtered.slice(pagination.actualPage * pagination.limit, pagination.limit)
    );
  };

  // Efeito colateral ao iniciar a página, para buscar os primeiros dados
  useEffect(() => {
    !data.length && getData();
  }, [getData]);

  // Efeito colateral ao ordenar ou alterar os dados brutos
  useEffect(() => {
    handleSearch(); // Aplica os filtros na nova disposição dos dados
  }, [data, orderBy]);

  // Efeito colateral ao alterar os dados filtrados para alterar o estado de paginação
  useEffect(() => {
    setPagination({
      ...pagination,
      maxPages: Math.ceil(filteredData.length / pagination.limit),
    });
  }, [filteredData]);

  // Efeito colateral ao alterar o estado de paginação
  useEffect(() => {
    // Define os novos itens a serem exibidos em tela com base na página atual
    setDataToShow(
      structuredClone(filteredData).slice(
        pagination.actualPage * pagination.limit,
        pagination.limit * (pagination.actualPage + 1)
      )
    );
  }, [pagination]);

  // Cabeçalhos da tabela e suas respectivas chaves para ordenação
  const tableHeaders: { title: string; key: keyof IPeople }[] = [
    { title: "Nome", key: "name" },
    { title: "Nascimento", key: "birthday" },
    { title: "E-mail", key: "email" },
    { title: "Telefone", key: "phone" },
  ];

  // Forneça os valores do contexto
  return (
    <TableContext.Provider
      value={{
        dataToShow,
        getData,
        handleSearch,
        isLoading,
        orderBy,
        pagination,
        search,
        setOrderBy,
        setPagination,
        setSearch,
        tableHeaders,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

// Criar um hook personalizado para facilitar o acesso ao contexto em outros componentes
export function useTable() {
  return useContext(TableContext);
}
