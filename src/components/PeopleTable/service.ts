/* eslint-disable @typescript-eslint/indent */
import { Person } from '../../types';
import { PeopleStateType } from '../PeoplePage';
import { Columns } from './types';

export const columnsList: Array<keyof typeof Columns> = Object.values(
  Columns,
).filter(x => typeof x === 'string') as Array<keyof typeof Columns>;

export const getPersonByName = (name: string, list: Person[]) =>
  list.find(per => name === per.name);

export const getPeopleListFromDB = (
  getPeople: () => Promise<Person[]>,
  setPeopleList: React.Dispatch<React.SetStateAction<[] | Person[]>>,
  peopleState: PeopleStateType,
  setPeopleState: React.Dispatch<React.SetStateAction<PeopleStateType>>,
) => {
  getPeople()
    .then(list => {
      setPeopleList(list);

      setPeopleState({
        ...peopleState,
        isLoading: false,
        error: list.length ? null : 'empty',
      });
    })
    .catch(() => {
      setPeopleState({
        ...peopleState,
        isLoading: false,
        error: 'unloaded',
      });
    });
};

export const getSortingClassName = (
  searchParams: URLSearchParams,
  link: keyof typeof Columns,
) => {
  const isSortParamExist = searchParams.has('sort');
  const isOrderParamExist = searchParams.has('order');
  const sortParam = searchParams.get('sort');
  const columnName = link;

  if (isSortParamExist && columnName === sortParam) {
    return isOrderParamExist ? 'fa-sort-down' : 'fa-sort-up';
  }

  return 'fa-sort';
};

const getSortedList = (
  list: Person[],
  sortBy: keyof Person | null,
  isDESC?: boolean,
) => {
  const listCopy = [...list];

  if (!sortBy) {
    return listCopy;
  }

  return sortBy === 'born' || sortBy === 'died'
    ? listCopy.sort((a, b) => {
        const aValue = a[sortBy] as number | undefined;
        const bValue = b[sortBy] as number | undefined;

        return isDESC
          ? (bValue ?? 0) - (aValue ?? 0)
          : (aValue ?? 0) - (bValue ?? 0);
      })
    : listCopy.sort((a, b) => {
        const aValue = a[sortBy] as string | undefined;
        const bValue = b[sortBy] as string | undefined;

        return isDESC
          ? (bValue ?? '').localeCompare(aValue ?? '')
          : (aValue ?? '').localeCompare(bValue ?? '');
      });
};

export const getPeopleListToShow = (
  fullList: Person[],
  params: URLSearchParams,
): Person[] => {
  const sortByParam = params.get('sort');
  const sortBy: keyof Person | null =
    sortByParam && sortByParam in fullList[0]
      ? (sortByParam as keyof Person)
      : null;
  const isDesc: boolean = params.has('order');

  return getSortedList(fullList, sortBy, isDesc);
};
