import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  title: string
};

export const SortTypeLink: React.FC<Props> = ({ title }) => {
  const [searchParams] = useSearchParams();
  const sortByField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  const params = {
    sort: (sortByField === title && isReversed) ? null : title,
    order: (sortByField === title && isReversed) ? null : 'desc',
  };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <SearchLink params={params}>
          <span className="icon">
            <i className={classNames(
              'fas fa-sort',
              { 'fa-sort': sortByField !== title },
              { 'fa-sort-up': sortByField === title && !isReversed },
              { 'fa-sort-down': sortByField === title && isReversed },
            )}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
