import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { SearchLink } from '../../utils/SearchLink';

const sortList = [
  { name: 'Name', shortName: 'name' },
  { name: 'Sex', shortName: 'sex' },
  { name: 'Born', shortName: 'born' },
  { name: 'Died', shortName: 'died' },
];

const Sort = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const toSort = !sort && !order;
  const toReverse = sort && !order;
  const toInitial = sort && order;

  return (
    <tr>
      {sortList.map(({ name, shortName }) => (
        <th key={shortName}>
          <span className="is-flex is-flex-wrap-nowrap">
            {name}
            <SearchLink
              params={{
                sort: toSort || toReverse ? shortName : null,
                order: toReverse && shortName === sort ? 'desc' : null,
              }}
            >
              <span className="icon">
                {sort === shortName
                  ? (
                    <i className={cn(
                      'fas',
                      {
                        'fa-sort-up': toReverse,
                        'fa-sort-down': toInitial,
                      },
                    )}
                    />
                  )
                  : <i className="fas fa-sort" />}
              </span>
            </SearchLink>
          </span>
        </th>
      ))}
      <th>Mother</th>
      <th>Father</th>
    </tr>
  );
};

export default Sort;
