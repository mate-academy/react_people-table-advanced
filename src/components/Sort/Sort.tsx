import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { SearchLink } from '../../utils/SearchLink';
import { SortEnum } from '../../types/SortEnum';

const sortList = [
  { name: 'Name', shortName: SortEnum.NAME },
  { name: 'Sex', shortName: SortEnum.SEX },
  { name: 'Born', shortName: SortEnum.BORN },
  { name: 'Died', shortName: SortEnum.DIED },
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
