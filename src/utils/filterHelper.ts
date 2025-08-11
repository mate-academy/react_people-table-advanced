import { Person } from '../types';
import { SearchParamsType } from '../types';

export const filteredBySex = (
  array: Person[],
  paramValue: SearchParamsType['sex'],
) => {
  return array.filter(person => {
    return person.sex === paramValue;
  });
};

export const filteredByCenturies = (
  array: Person[],
  paramValue: SearchParamsType['centuries'],
) => {
  return array.filter(person => {
    const transformCenturies = Math.ceil(person.born / 100);

    return paramValue.includes(String(transformCenturies));
  });
};

export const filterByQuery = (
  array: Person[],
  paramValue: SearchParamsType['query'],
) => {
  return array.filter(person => {
    return (
      person.name.includes(paramValue) ||
      person.motherName?.includes(paramValue) ||
      person.fatherName?.includes(paramValue)
    );
  });
};

export const sortByParams = (
  array: Person[],
  paramValue: SearchParamsType['sort'],
) => {
  return [...array].sort((a, b) => {
    const param = paramValue as keyof Person;

    if (typeof a[param] === 'number' && typeof b[param] === 'number') {
      return a[param] - b[param];
    }

    if (typeof a[param] === 'string' && typeof b[param] === 'string') {
      return a[param].localeCompare(b[param]);
    }

    return 0;
  });
};
