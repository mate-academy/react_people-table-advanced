import { ESortBy, Person } from '../types';

interface IParams {
  sexParam: string;
  queryParam: string;
  centuriesParam: string[];
  sortBy: string;
  orderBy: string;
}

export const getPreparedPeople = (people: Person[], {
  sexParam,
  queryParam,
  centuriesParam,
  sortBy,
  orderBy,
}: IParams) => {
  if (!sexParam && !queryParam && !centuriesParam.length && !sortBy) {
    return people;
  }

  let preparedPeople = people;

  const normalizeQueryParam = queryParam.toLowerCase().trim();

  preparedPeople = preparedPeople
    .filter(({
      born,
      sex,
      name,
      motherName,
      fatherName,
    }) => {
      const peopleCentery = `${Math.ceil(born / 100)}`;

      const hasSexParam = !sexParam || sex === sexParam;
      const hasQueryParam = !queryParam
        || name.toLowerCase().includes(normalizeQueryParam)
        || motherName?.toLowerCase().includes(normalizeQueryParam)
        || fatherName?.toLowerCase().includes(normalizeQueryParam);

      const hasCenturiesParam = !centuriesParam.length
        || centuriesParam.includes(peopleCentery);

      return hasSexParam && hasQueryParam && hasCenturiesParam;
    });

  if (sortBy) {
    preparedPeople.sort((personA, personB) => {
      switch (sortBy) {
        case ESortBy.Name:
        case ESortBy.Sex:
          return personA[sortBy].localeCompare(personB[sortBy]);
        case ESortBy.Born:
        case ESortBy.Died:
          return personA[sortBy] - personB[sortBy];
        default:
          return 0;
      }
    });
  }

  if (orderBy) {
    preparedPeople.reverse();
  }

  return preparedPeople;
};
