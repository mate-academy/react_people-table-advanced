import { Person } from '../types';
import { Parents } from '../types/Parents';
import { Sex } from '../types/Sex';
import { SortTypes } from '../types/SortTypes';
import { SearchParams } from './searchHelper';

type FindParentFunction = (
  peoples: Person[],
  person: Person,
  parent: Parents
) => Person | undefined;

export const findParent: FindParentFunction = (peoples, person, parent) => {
  const { fatherName, motherName } = person;

  switch (parent) {
    case Parents.Mother:
      return peoples.find(({ name }) => name === motherName);

    case Parents.Father:
      return peoples.find(({ name }) => name === fatherName);
    default:
      return undefined;
  }
};

export const getSexOptionsText = (option: Sex) => {
  switch (option) {
    case Sex.All:
      return 'All';

    case Sex.Male:
      return 'Male';

    case Sex.Female:
      return 'Female';

    default:
      return 'All';
  }
};

export const filterBySex = (peoples: Person[], value: string) => {
  if (value) {
    return peoples.filter(({ sex }) => sex === value);
  }

  return peoples;
};

const filterByQueryCallback = (person: Person, query: string) => {
  const { motherName, fatherName, name } = person;

  const formattedValue = query.toLowerCase();
  const formattedMotherName = motherName?.toLowerCase();
  const formattedFatherName = fatherName?.toLowerCase();
  const formattedName = name.toLowerCase();

  const isMomFound = formattedMotherName?.includes(formattedValue);
  const isDadFound = formattedFatherName?.includes(query);
  const isPersonFound = formattedName.includes(query);

  return isMomFound || isDadFound || isPersonFound;
};

export const filterByQuery = (peoples: Person[], query: string) => {
  return peoples.filter(person => filterByQueryCallback(person, query));
};

export const filterByCenturyCallback = (
  person: Person,
  centuries : string[],
) => {
  const { born } = person;
  const bornCentury = Math.ceil(born / 100);

  return centuries.includes(String(bornCentury));
};

export const filterByCentury = (peoples: Person[], centuries : string[]) => {
  return peoples.filter(person => filterByCenturyCallback(person, centuries));
};

export const handleSortParams = (
  hasSort:boolean,
  hasOrder: boolean,
  option: SortTypes,
): SearchParams => {
  if (hasSort && !hasOrder) {
    return { order: 'desc' };
  }

  if (hasSort && hasOrder) {
    return { order: null, sort: null };
  }

  return { sort: option.toLowerCase() };
};

const sortByNameCallback = (first: Person, second: Person) => {
  return first.name.localeCompare(second.name);
};

const sortBySexCallback = (first: Person, second: Person) => {
  if (first.sex === 'f' && second.sex === 'm') {
    return -1;
  }

  if (first.sex === 'm' && second.sex === 'f') {
    return 1;
  }

  return 0;
};

const sortByBornCallback = (first: Person, second: Person) => {
  return first.born - second.born;
};

const sortByDiedCallback = (first: Person, second: Person) => {
  return first.died - second.died;
};

export const handleSort = (peoples: Person[], sortType: string) => {
  switch (sortType) {
    case SortTypes.Name.toLowerCase():
      return peoples.sort(sortByNameCallback);

    case SortTypes.Sex.toLowerCase():
      return peoples.sort(sortBySexCallback);

    case SortTypes.Born.toLowerCase():
      return peoples.sort(sortByBornCallback);

    case SortTypes.Died.toLowerCase():
      return peoples.sort(sortByDiedCallback);

    default:
      return peoples;
  }
};

export const formatArrayOfPeoples = (
  peoples: Person[],
  searchParams: URLSearchParams,
) => {
  let filteredArray = [...peoples];

  if (!peoples) {
    return peoples;
  }

  if (searchParams.has('sex')) {
    filteredArray = filterBySex(filteredArray, searchParams.get('sex') || '');
  }

  if (searchParams.has('query')) {
    filteredArray = filterByQuery(
      filteredArray,
      searchParams.get('query') || '',
    );
  }

  if (searchParams.has('centuries')) {
    filteredArray = filterByCentury(
      filteredArray,
      searchParams.getAll('centuries'),
    );
  }

  if (searchParams.has('sort')) {
    filteredArray = handleSort(filteredArray, searchParams.get('sort') || '');

    if (searchParams.has('order')) {
      filteredArray.reverse();
    }
  }

  return filteredArray;
};
