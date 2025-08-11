import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';
import { FilterOrder } from '../../types/FilterParamOrder';
import { SortParams } from '../../types/SortParams';

type Props = {
  field: SortParams;
};

const getNewParams = (
  currentField: SortParams,
  newField: SortParams,
  order: FilterOrder,
) => {
  const isReversed = order === FilterOrder.DESC;
  const isSameField = currentField === newField;

  if (!isSameField) {
    return { sort: newField, order: null };
  }

  if (!isReversed) {
    return {
      sort: newField,
      order: FilterOrder.DESC,
    };
  }

  return {
    sort: null,
    order: null,
  };
};

export const TableSortLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const newSearchParams = getNewParams(
    sortBy as SortParams,
    field,
    order as FilterOrder,
  );

  const isReversed = order === FilterOrder.DESC;

  return (
    <SearchLink params={newSearchParams}>
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': sortBy !== field,
            'fa-sort-up': sortBy === field && !isReversed,
            'fa-sort-down': sortBy === field && isReversed,
          })}
        />
      </span>
    </SearchLink>
  );
};
