import { useSearchParams } from 'react-router-dom';
import { FilterParamOrder } from '../../types/enums';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = {
  field: string;
};

const getNewParams = (
  currentField: string,
  newField: string,
  order: string,
) => {
  const isReversed = order === FilterParamOrder.DESC;
  const isSameField = currentField === newField;

  if (!isSameField) {
    return { sort: newField, order: null };
  }

  if (!isReversed) {
    return {
      sort: newField,
      order: FilterParamOrder.DESC,
    };
  }

  return {
    sort: null,
    order: null,
  };
};

export const SortTableLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const newSearchParams = getNewParams(sortBy, field, order);

  const isReversed = order === FilterParamOrder.DESC;

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
