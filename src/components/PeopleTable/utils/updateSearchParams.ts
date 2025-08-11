/* eslint-disable @typescript-eslint/indent */
import { SetURLSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/searchHelper';

export const updateSearchParams = (
  event: React.MouseEvent,
  currentParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
): void => {
  const element = event.target as HTMLElement;
  const clickedLink = element.closest('a');
  const newSortValue = clickedLink?.dataset.sorting || null;
  const newCenturyFilterValue =
    clickedLink?.dataset.century?.toString() || null;
  const newGenderFilterValue = clickedLink?.dataset.gender || null;

  const getSortParamsToUpdate = () => {
    if (!newSortValue) {
      return null;
    }

    return newSortValue === currentParams.get('sort')
      ? currentParams.get('order')
        ? { sort: null, order: null }
        : { sort: newSortValue, order: 'desc' }
      : { sort: newSortValue, order: null };
  };

  const getCenturyParamsToUpdate = () => {
    if (!newCenturyFilterValue) {
      return null;
    }

    const currentCenturyFilters = currentParams.getAll('centuries');
    const isFilterExist = currentCenturyFilters.includes(newCenturyFilterValue);

    return isFilterExist
      ? {
          centuries: currentCenturyFilters.filter(
            filter => filter !== newCenturyFilterValue,
          ),
        }
      : { centuries: [...currentCenturyFilters, newCenturyFilterValue] };
  };

  const getGenderParamsToUpdate = () => {
    if (!newGenderFilterValue) {
      return null;
    }

    return newGenderFilterValue === 'All'
      ? { sex: null }
      : { sex: newGenderFilterValue[0].toLowerCase() };
  };

  const allParamsToUpdate = {
    ...getSortParamsToUpdate(),
    ...getCenturyParamsToUpdate(),
    ...getGenderParamsToUpdate(),
  };

  const newParams = new URLSearchParams(
    getSearchWith(currentParams, allParamsToUpdate),
  );

  setSearchParams(newParams);
};
