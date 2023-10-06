import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { SORT_PEOPLE } from '../../utils/variablesHelpers';

export const SortComponent: React.FC = () => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getSortParams = (category: string) => {
    if (sort !== category) {
      return { sort: category, order: null };
    }

    if (sort === category && !order) {
      return { sort: category, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <thead>
      <tr>
        {SORT_PEOPLE.map(category => {
          const preparedCategory = category.toLowerCase();
          const isActiveSort = sort === preparedCategory;

          return (
            <th key={category}>
              <span className="is-flex is-flex-wrap-nowrap">
                {category}
                <SearchLink
                  params={getSortParams(preparedCategory)}
                >
                  <span className="icon">
                    <i
                      className={cn('fas', 'fa-sort', {
                        'fa-sort-up': isActiveSort && !order,
                        'fa-sort-down': isActiveSort && order,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          );
        })}

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
