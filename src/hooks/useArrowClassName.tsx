import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

export const useArrowClassName = (paramName: string) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  return classNames(
    'fas',
    { 'fa-sort': sortBy !== paramName },
    { 'fa-sort-up': sortBy === paramName && !sortOrder },
    { 'fa-sort-down': sortBy === paramName && !!sortOrder },
  );
};
