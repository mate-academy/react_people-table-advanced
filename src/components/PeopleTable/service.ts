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

export const getPeopleListToShow = (
  fullList: Person[],
  // params: URLSearchParams,
): Person[] => {
  // const sorting = params.get('sort');
  // const sortOrder = params.get('order');

  // const sort = (
  //   list: Person[],
  //   data: keyof Person | null,
  //   direction: 'esc' | 'desc',
  // ) => {
  //   const listCopy = [...list];

  //   return typeof list[0]?.[data] === 'number'
  //     ? listCopy.sort((a, b) => {
  //         const aValue = a[data] as number | undefined;
  //         const bValue = b[data] as number | undefined;

  //         return direction === 'esc'
  //           ? (aValue ?? 0) - (bValue ?? 0)
  //           : (bValue ?? 0) - (aValue ?? 0);
  //       })
  //     : listCopy.sort((a, b) => {
  //         const aValue = a[data] as string | undefined;
  //         const bValue = b[data] as string | undefined;

  //         return direction === 'esc'
  //           ? (aValue ?? '').localeCompare(bValue ?? '')
  //           : (bValue ?? '').localeCompare(aValue ?? '');
  //       });
  // };

  return fullList;
};
