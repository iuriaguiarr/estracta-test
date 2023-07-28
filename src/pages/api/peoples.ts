import type { NextApiRequest, NextApiResponse } from "next";
import { emailProviders, firstNames, lastNames } from "@/lib/globals";

import { IPeople } from "@/interfaces/people.interface";

const generatedNames: Set<string> = new Set();

// Função principal, responsável por mapear as 100 pessoas aleatórias:
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res
    .status(200)
    .send(
      await Promise.all(
        Array.from({ length: 100 }).map(async () => generateRandomPerson())
      )
    );
};

// Função responsável por gerar nomes aleatoriamente
const generateRandomName = () => {
  let randomName;
  do {
    const randomFirstName =
      firstNames[Math.floor(Math.random() * firstNames.length)]; // Primeiro nome aleatório
    const randomLastName =
      lastNames[Math.floor(Math.random() * lastNames.length)]; // Sobrenome aleatório

    randomName = `${randomFirstName} ${randomLastName}`; // Definindo variável para comparação
  } while (generatedNames.has(randomName)); // Repete enquanto o nome já existir na lista
  generatedNames.add(randomName); // Ao final, adiciona na lista de nomes gerados
  return randomName; // E retorna
};

// Função responsável por gerar uma data de aniversário aleatória entre duas datas
const generateRandomBirthday = () => {
  const start = new Date(1980, 0, 1);
  const end = new Date(2005, 11, 31);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

// Função responsável por somar o nome e o sobrenome com um provedor de email aleatório
const generateRandomEmail = (name: string) => {
  const randomProvider =
    emailProviders[Math.floor(Math.random() * emailProviders.length)];
  const nameWithoutSpace = name.replace(/\s/g, "").toLowerCase();
  return `${nameWithoutSpace}@${randomProvider}`;
};

// Função responsável por gerar um número de telefone aleatório no padrão americano
const generateRandomPhone = () => {
  const areaCode = Math.floor(Math.random() * 800) + 200;
  const firstPart = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  const secondPart = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `(${areaCode}) ${firstPart}-${secondPart}`;
};

// Função responsável por concatenar a execução das demais funções e efetivamente retornar uma pessoa
const generateRandomPerson = () => {
  const people: IPeople = {
    name: generateRandomName(),
    birthday: generateRandomBirthday().toISOString().slice(0, 10),
    email: "",
    phone: generateRandomPhone(),
  };

  people.email = generateRandomEmail(people.name);

  return people;
};

export default handler;
