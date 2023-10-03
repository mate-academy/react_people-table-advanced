import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchParam, SortOrder } from '../types';
import { SearchParams } from '../utils';
import { SearchLink } from './SearchLink';

type Props = {
  field: string;
};

export const SortLink: React.FC<Props> = memo(({ field }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(SearchParam.Sort) ?? '';
  const order = searchParams.get(SearchParam.Order) ?? '';

  const params: SearchParams = {
    sort: null,
    order: null,
  };

  let iconClass = 'fa-sort-down';

  if (sort !== field) {
    params.sort = field;

    iconClass = 'fa-sort';
  } else if (sort === field && !order) {
    params.sort = field;
    params.order = SortOrder.Desc;

    iconClass = 'fa-sort-up';
  }

  return (
    <SearchLink
      params={params}
    >
      <span className="icon">
        <i className={classNames('fas', iconClass)} />
      </span>
    </SearchLink>
  );
});
