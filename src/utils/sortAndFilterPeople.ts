import { Person } from '../types';
import { Sorts } from '../types/Sorts';
import { century } from './calculateCentury';

export const sortAndFilterPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const sortParams = searchParams.get('sort') as Sorts | null;
  const orderSortParams = searchParams.get('order');
  const sexParams = searchParams.get('sex');
  const queryParams = searchParams.get('query');
  const cenruriesParams = searchParams.getAll('centuries');

  let resultPeople = [...people];

  switch (sortParams) {
    case 'name':
      resultPeople.sort((a, b) =>
        orderSortParams === 'desc'
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name),
      );
      break;
    case 'sex':
      resultPeople.sort((a, b) =>
        orderSortParams === 'desc'
          ? b.sex.localeCompare(a.sex)
          : a.sex.localeCompare(b.sex),
      );
      break;
    case 'born':
      resultPeople.sort((a, b) =>
        orderSortParams === 'desc' ? b.born - a.born : a.born - b.born,
      );
      break;
    case 'died':
      resultPeople.sort((a, b) =>
        orderSortParams === 'desc' ? b.died - a.died : a.died - b.died,
      );
      break;
    default:
      break;
  }

  if (sexParams) {
    resultPeople = resultPeople.filter(({ sex }) => sex === sexParams);
  }

  if (queryParams) {
    resultPeople = resultPeople.filter(
      ({ name, motherName, fatherName }) =>
        name.toLowerCase().includes(queryParams.toLowerCase()) ||
        motherName?.toLowerCase().includes(queryParams.toLowerCase()) ||
        fatherName?.toLowerCase().includes(queryParams.toLowerCase()),
    );
  }

  if (cenruriesParams.length > 0) {
    resultPeople = resultPeople.filter(({ born }) => {
      return cenruriesParams.includes(century(born).toString());
    });
  }

  return resultPeople;
};
