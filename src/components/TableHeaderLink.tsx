import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

export const TableHeaderLink = ({ fieldName }: { fieldName: string }) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  const toggleSort = (): SearchParams => {
    if (currentSort !== fieldName) {
      return { sort: fieldName, order: null };
    }

    if (currentSort === fieldName && currentOrder !== 'desc') {
      return { order: 'desc' };
    }

    if (currentSort === fieldName && currentOrder === 'desc') {
      return { sort: null, order: null };
    }

    return {};
  };

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
      <SearchLink params={toggleSort()}>
        <span className="icon">
          <i
            className={classNames('fas', {
              'fa-sort': currentSort !== fieldName,
              'fa-sort-down': currentSort === fieldName
                && currentOrder === 'desc',
              'fa-sort-up': currentSort === fieldName
                && currentOrder !== 'desc',
            })}
          />
        </span>
      </SearchLink>
    </span>
  );
};
