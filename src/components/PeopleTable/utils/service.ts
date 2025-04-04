/* eslint-disable @typescript-eslint/indent */
import { Person } from '../../../types';
import { Columns } from '../types';
import { getPeople } from '../../../api';
import { ContextDataType } from '../../../context/types';

export const columnsList: Array<keyof typeof Columns> = Object.values(
  Columns,
).filter(x => typeof x === 'string') as Array<keyof typeof Columns>;

export const loadPeopleListFromDB = (contextData: ContextDataType) => {
  const { setContextData, context } = contextData;

  getPeople()
    .then(list => {
      setContextData({
        ...context,
        fullList: list,
        listToShow: list,
        isLoading: false,
        error: list.length ? null : 'empty',
      });
    })
    .catch(() => {
      setContextData({
        ...context,
        isLoading: false,
        error: 'unloaded',
      });
    });
};

export const getPersonByName = (name: string, list: Person[]) =>
  list.find(per => name === per.name);

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

const getSortedPeopleList = (list: Person[], params: URLSearchParams) => {
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

const getFiltredPeopleList = (list: Person[], params: URLSearchParams) => {
  let finalPeopleList = [...list];
  const gender: string | null = params.get('sex');
  const search: string | null = params.get('query');
  const centuries: string[] = params.getAll('centuries');

  const isFilterExist = !!gender || !!search || !!centuries.length;

  if (!isFilterExist) {
    return finalPeopleList;
  }

  if (!!gender) {
    finalPeopleList = [...finalPeopleList].filter(per => per.sex === gender);
  }

  if (!!search) {
    finalPeopleList = [...finalPeopleList].filter(per => {
      const motherName = per.motherName
        ? per.motherName.toLowerCase().includes(search)
        : false;
      const fatherName = per.fatherName
        ? per.fatherName.toLowerCase().includes(search)
        : false;

      return (
        per.name.toLowerCase().includes(search) || motherName || fatherName
      );
    });
  }

  if (!!centuries.length) {
    finalPeopleList = [...finalPeopleList].filter(per =>
      centuries.some(cen => +cen - 1 <= per.born / 100),
    );
  }

  return finalPeopleList;
};

export const updatePeopleList = (
  contextData: ContextDataType,
  searchParams: URLSearchParams,
): void => {
  const { context, setContextData } = contextData;

  const filtredPeopleList: Person[] = getFiltredPeopleList(
    context.fullList,
    searchParams,
  );

  const sortedPeopleList: Person[] = getSortedPeopleList(
    filtredPeopleList,
    searchParams,
  );

  setContextData({
    ...context,
    listToShow: sortedPeopleList,
  });
};
