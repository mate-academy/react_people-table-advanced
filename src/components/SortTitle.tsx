import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Sort } from '../types/Sort';
import { SearchLink } from './SearchLink';

type Props = {
  sortTitle: string;
};

export const SortTitle: React.FC<Props> = ({ sortTitle }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const lowTitle = sortTitle.toLowerCase();

  const sortBy = (title: string) => {
    if (sort === title && order) {
      return { sort: null, order: null };
    }

    return sort === title
      ? { sort: title, order: 'desc' }
      : { sort: title, order: null };
  };

  const getSortParams = (title: string) => {
    switch (title) {
      case Sort.Name:
        return sortBy(Sort.Name);

      case Sort.Sex:
        return sortBy(Sort.Sex);

      case Sort.Born:
        return sortBy(Sort.Born);

      case Sort.Died:
      default:
        return sortBy(Sort.Died);
    }
  };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {sortTitle}
        <SearchLink
          params={getSortParams(lowTitle)}
        >
          <span className="icon">
            <i className={classNames(
              'fas',
              { 'fa-sort': (sort !== lowTitle) },
              { 'fa-sort-up': (sort === lowTitle && !order) },
              { 'fa-sort-down': (sort === lowTitle && order) },
            )}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
