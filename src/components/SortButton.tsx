import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  param: string,
};

export const SortButton: React.FC<Props> = ({ param }) => {
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || '';
  const isDescending = searchParams.get('order') === 'desc';

  const sortProp = (param === sortParam && isDescending) ? null : param;
  const orderProp = (param === sortParam && !isDescending) ? 'desc' : null;

  const params = {
    sort: sortProp,
    order: orderProp,
  };

  searchParams.set('sort', param);

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i className={cn(
          'fas',
          { 'fa-sort-down': sortParam === param && isDescending },
          { 'fa-sort': sortParam !== param },
          { 'fa-sort-up': sortParam === param && !isDescending },
        )}
        />
      </span>
    </SearchLink>
  );
};
