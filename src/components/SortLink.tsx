import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, Order } from '../utils/constants';

type Props = {
  field: string;
};

export const SortLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get(SearchParams.SORT) || '';
  const isReversed = searchParams.get(SearchParams.ORDER) === Order.DESC;

  let params: Record<string, string | null> = {
    sort: field,
    order: Order.ASC,
  };

  if (field === sortField) {
    if (isReversed) {
      params = {
        sort: null,
        order: null,
      };
    } else {
      params.order = Order.DESC;
    }
  }

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': sortField !== field,
            'fa-sort-up': sortField === field && !isReversed,
            'fa-sort-down': sortField === field && isReversed,
          })}
        />
      </span>
    </SearchLink>
  );
};
