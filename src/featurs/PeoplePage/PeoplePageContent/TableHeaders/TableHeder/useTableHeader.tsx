import { useSearchParams } from 'react-router-dom';

export const useTableHeader = () => {
  const [searchParams] = useSearchParams();

  const sortFilter = searchParams.get('sort');
  const orderFilter = searchParams.get('order');

  const isSortName = (name: string) => {
    const lowerCaseName = name.toLocaleLowerCase();

    if ((sortFilter === null || sortFilter === lowerCaseName)
      && orderFilter === null) {
      return lowerCaseName;
    }

    if (sortFilter !== lowerCaseName) {
      return lowerCaseName;
    }

    return null;
  };

  const isOrder = (name: string) => {
    const lowerCaseName = name.toLocaleLowerCase();

    if (sortFilter === null && orderFilter === null) {
      return null;
    }

    if (sortFilter === lowerCaseName && orderFilter === null) {
      return 'desc';
    }

    return null;
  };

  const sortIcon = (name: string) => {
    const lowerCaseName = name.toLocaleLowerCase();

    if (sortFilter === lowerCaseName && orderFilter) {
      return 'fas fa-sort-down';
    }

    if (sortFilter === lowerCaseName) {
      return 'fas fa-sort-up';
    }

    return 'fas fa-sort';
  };

  return { isSortName, isOrder, sortIcon };
};
