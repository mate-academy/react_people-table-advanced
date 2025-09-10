import { Person } from '../types/Person';

export interface FilterOptions {
  query: string | null;
  centuries: string[] | null;
  sex: string | null;
}

/**
 * Calcula o século a partir do ano de nascimento
 * @param bornYear - Ano de nascimento
 * @returns Século em formato string ou null se ano inválido
 */
export const getCenturyFromYear = (bornYear: number | null): string | null => {
  if (bornYear === null || bornYear === undefined || isNaN(bornYear)) {
    return null;
  }

  return Math.ceil(bornYear / 100).toString();
};

/**
 * Filtra pessoas com base nos critérios fornecidos
 * @param people - Array de pessoas a serem filtradas
 * @param filters - Objeto com os filtros a serem aplicados
 * @returns Array de pessoas filtradas
 */
export const filterPeople = (
  people: Person[],
  filters: FilterOptions,
): Person[] => {
  const { query, centuries, sex } = filters;

  return people.filter(person => {
    // Filtro por query (nome, nome da mãe ou nome do pai)
    if (query && query.trim() !== '') {
      const searchTerm = query.toLowerCase().trim();
      const matchesName = person.name.toLowerCase().includes(searchTerm);
      const matchesMother =
        person.motherName?.toLowerCase().includes(searchTerm) || false;
      const matchesFather =
        person.fatherName?.toLowerCase().includes(searchTerm) || false;

      if (!matchesName && !matchesMother && !matchesFather) {
        return false;
      }
    }

    // Filtro por século
    if (centuries && centuries.length > 0) {
      if (person.born === null || person.born === undefined) {
        return false;
      }

      const century = getCenturyFromYear(person.born);

      if (!century || !centuries.includes(century)) {
        return false;
      }
    }

    // Filtro por sexo
    if (sex && sex !== 'any') {
      if (person.sex !== sex) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Ordena pessoas com base no campo e ordem especificados
 * @param people - Array de pessoas a serem ordenadas
 * @param sortField - Campo para ordenação ('name', 'sex', 'born', 'died')
 * @param sortOrder - Ordem de ordenação ('asc' ou 'desc')
 * @returns Array de pessoas ordenadas
 */
export const sortPeople = (
  people: Person[],
  sortField: string | null,
  sortOrder: string | null,
): Person[] => {
  if (!sortField) {
    return [...people];
  }

  // Lista de campos permitidos para ordenação
  const allowedSortFields = ['name', 'sex', 'born', 'died'];

  if (!allowedSortFields.includes(sortField)) {
    return [...people];
  }

  return [...people].sort((a, b) => {
    let valueA: string | number = a[sortField as keyof Person] as
      | string
      | number;
    let valueB: string | number = b[sortField as keyof Person] as
      | string
      | number;

    // Tratamento de valores nulos/undefined
    if (valueA === null || valueA === undefined) {
      valueA = '';
    }

    if (valueB === null || valueB === undefined) {
      valueB = '';
    }

    // Converter para números se for campo numérico
    if (sortField === 'born' || sortField === 'died') {
      valueA = Number(valueA) || 0;
      valueB = Number(valueB) || 0;
    }

    // Converter para minúsculas para ordenação de texto case-insensitive
    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') {
        valueB = valueB.toLowerCase();
      }
    }

    // Comparação para ordem ascendente
    if (valueA < valueB) {
      return sortOrder === 'desc' ? 1 : -1;
    }

    if (valueA > valueB) {
      return sortOrder === 'desc' ? -1 : 1;
    }

    return 0;
  });
};

/**
 * Extrai séculos únicos da lista de pessoas
 * @param people - Array de pessoas
 * @returns Array de séculos únicos
 */
export const getUniqueCenturies = (people: Person[]): string[] => {
  const centuries = new Set<string>();

  people.forEach(person => {
    if (person.born) {
      const century = getCenturyFromYear(person.born);

      if (century) {
        centuries.add(century);
      }
    }
  });

  return Array.from(centuries).sort((a, b) => Number(a) - Number(b));
};

/**
 * Aplica todos os filtros e ordenação em uma única operação
 * @param people - Array de pessoas
 * @param filters - Objeto com os filtros
 * @param sortField - Campo para ordenação
 * @param sortOrder - Ordem de ordenação
 * @returns Array de pessoas filtradas e ordenadas
 */
export const applyAllFilters = (
  people: Person[],
  filters: FilterOptions,
  sortField: string | null,
  sortOrder: string | null,
): Person[] => {
  const filtered = filterPeople(people, filters);

  return sortPeople(filtered, sortField, sortOrder);
};

/**
 * Valida se um campo de ordenação é permitido
 * @param sortField - Campo para validar
 * @returns Verdadeiro se o campo é permitido
 */
export const isValidSortField = (sortField: string | null): boolean => {
  const allowedSortFields = ['name', 'sex', 'born', 'died'];

  return sortField !== null && allowedSortFields.includes(sortField);
};

/**
 * Valida se uma ordem de ordenação é válida
 * @param sortOrder - Ordem para validar
 * @returns Verdadeiro se a ordem é válida
 */
export const isValidSortOrder = (sortOrder: string | null): boolean => {
  return sortOrder === null || sortOrder === 'asc' || sortOrder === 'desc';
};
