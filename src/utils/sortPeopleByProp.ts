import { IPeople } from "@/interfaces/people.interface";

// Função responsável por ordenar a lista de pessoas com base numa prop
export const sortPeopleByProperty = (
  peopleList: IPeople[],
  property: keyof IPeople,
  isAsc: boolean
): IPeople[] =>
  peopleList.sort((a, b) =>
    isAsc
      ? a[property].localeCompare(b[property])
      : b[property].localeCompare(a[property])
  );
