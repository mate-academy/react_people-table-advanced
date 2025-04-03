/* eslint-disable @typescript-eslint/indent */
import { SetURLSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { ContextDataType } from '../../utils/context/types';
import { getSearchWith } from '../../utils/searchHelper';
import { Columns, FetchDBParams } from './types';
import { getPeople } from '../../api';

export const columnsList: Array<keyof typeof Columns> = Object.values(
  Columns,
).filter(x => typeof x === 'string') as Array<keyof typeof Columns>;

export const updatePeopleListFromDB = (params: FetchDBParams) => {
  const {
    contextData: { setContextData, context },
    setPeoplePageState,
    peoplePageState,
  } = params;

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

const getListToShow = (list: Person[], params: URLSearchParams) => {
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

export const updateListToShow = (
  contextDat: ContextDataType,
  searchParams: URLSearchParams,
): void => {
  const { context, setContextData } = contextDat;

  setContextData({
    ...context,
    listToShow: getListToShow(context.fullList, searchParams),
  });
};

export const updateSortParams = (
  event: React.MouseEvent,
  params: URLSearchParams,
  setSearchParams: SetURLSearchParams,
): void => {
  const element = event.target as HTMLElement;
  const newSortValue = element.closest('a')?.dataset.sorting || '';

  const updatedParams =
    newSortValue === params.get('sort')
      ? params.get('order')
        ? { sort: null, order: null }
        : { sort: newSortValue, order: 'desc' }
      : { sort: newSortValue, order: null };

  const newParams = new URLSearchParams(getSearchWith(params, updatedParams));

  setSearchParams(newParams);
};
