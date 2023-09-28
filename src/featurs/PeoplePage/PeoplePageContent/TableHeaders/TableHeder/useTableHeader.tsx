import { SortField } from '../../../../../context/types';

export const useTableHeader = () => {
  const getHref = (name: string, isReversed: boolean) => {
    const lowerCaseName = name.toLocaleLowerCase();

    if (isReversed) {
      return `#/people?sort=${lowerCaseName}&order=desc`;
    }

    if (!isReversed) {
      return `#/people?sort=${lowerCaseName}&order=asc`;
    }

    return `#/people?sort=${lowerCaseName}`;
  };

  const sortIcon = (
    name: string,
    sortFiled: SortField | null,
    isReversed: boolean,
  ) => {
    if (sortFiled === name.toLocaleLowerCase() && !isReversed) {
      return 'fas fa-sort-up';
    }

    if (sortFiled === name.toLocaleLowerCase()
      && isReversed) {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  };

  return { sortIcon, getHref };
};
