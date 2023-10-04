import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { TABLE_ATTRIBUTES } from '../../utils/constants';
import { SearchLink } from '../SearchLink';
import { SearchParams } from '../../types';

export const PeopleTableHeadings: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleAddSort = (attribute: string): SearchParams => {
    const isCurrentSort = sort === attribute;

    if (isCurrentSort && order) {
      return { order: null, sort: null };
    }

    if (isCurrentSort) {
      return { order: 'desc' };
    }

    return { order: null, sort: attribute };
  };

  return (
    <thead>
      <tr>
        {TABLE_ATTRIBUTES.map(attribute => {
          if (attribute !== 'Mother' && attribute !== 'Father') {
            const normalizedAttribute = attribute.toLowerCase();
            const isSortActive = sort === normalizedAttribute;

            return (
              <th key={attribute}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {attribute}
                  <SearchLink params={handleAddSort(normalizedAttribute)}>
                    <span className="icon">
                      <i className={classNames(
                        'fas',
                        {
                          'fa-sort': !isSortActive,
                          'fa-sort-up': isSortActive && !order,
                          'fa-sort-down': isSortActive && order,
                        },
                      )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          }

          return <th key={attribute}>{attribute}</th>;
        })}
      </tr>
    </thead>
  );
};
