/* eslint-disable @typescript-eslint/indent */
import { Person } from '../../types';
import { Lists } from '../../utils/context/types';
import { PeoplePageStateType } from '../PeoplePage';
import { Columns } from './types';

export const columnsList: Array<keyof typeof Columns> = Object.values(
  Columns,
).filter(x => typeof x === 'string') as Array<keyof typeof Columns>;

export const getPersonByName = (name: string, list: Person[]) =>
  list.find(per => name === per.name);

export const getPeopleListFromDB = (
  getPeople: () => Promise<Person[]>,
  context: Lists,
  setContextData: React.Dispatch<React.SetStateAction<Lists>>,
  peoplePageState: PeoplePageStateType,
  setPeoplePageState: React.Dispatch<React.SetStateAction<PeoplePageStateType>>,
) => {
  getPeople()
    .then(list => {
      setContextData({
        ...context,
        fullList: list,
        listToShow: list,
      });

      setPeoplePageState({
        ...peoplePageState,
        isLoading: false,
        error: list.length ? null : 'empty',
      });
    })
    .catch(() => {
      setPeoplePageState({
        ...peoplePageState,
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

export const getSortedList = (list: Person[], params: URLSearchParams) => {
  const listCopy = [...list];
  const sortBy = params.get('sort');
  const isDESC = params.has('order');

  if (!sortBy) {
    return listCopy;
  }

  return sortBy === 'born' || sortBy === 'died'
    ? listCopy.sort((a, b) => {
        const aValue = a[sortBy as keyof Person] as number | undefined;
        const bValue = b[sortBy as keyof Person] as number | undefined;

        return isDESC
          ? (bValue ?? 0) - (aValue ?? 0)
          : (aValue ?? 0) - (bValue ?? 0);
      })
    : listCopy.sort((a, b) => {
        const aValue = a[sortBy as keyof Person] as 'name' | 'sex';
        const bValue = b[sortBy as keyof Person] as 'name' | 'sex';

        return isDESC
          ? (bValue ?? '').localeCompare(aValue ?? '')
          : (aValue ?? '').localeCompare(bValue ?? '');
      });
};
