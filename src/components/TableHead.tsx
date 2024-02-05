import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Filter } from '../types/Filter';
import { getSortClass, getSortParams } from '../utils/filterHelper';

export const TableHead = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <thead>
      <tr>
        {(Object
          .keys(Filter) as (keyof typeof Filter)[])
          .map((key) => {
            const currentFilter = Filter[key];
            const filterValue = currentFilter.toLowerCase();

            return (
              <th key={currentFilter}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {currentFilter}
                  <SearchLink params={getSortParams(filterValue, sort, order)}>
                    <span className="icon">
                      <i className={getSortClass(filterValue, sort, order)} />
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
