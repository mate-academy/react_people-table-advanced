import { sortableColumns } from './sortConfig';
import { usePeopleSortParams } from '../hooks/usePeopleSortParams';
import { SearchLink } from '../../../components/SearchLink';

export const PeopleTableHead = () => {
  const { toggleSort, getSortIconClass } = usePeopleSortParams();

  return (
    <thead>
      <tr>
        {sortableColumns.map(({ title, key }) => (
          <th key={key}>
            <span className="is-flex is-flex-wrap-nowrap">
              {title}
              <SearchLink params={toggleSort(key)}>
                <span className="icon">
                  <i className={getSortIconClass(key)} />
                </span>
              </SearchLink>
            </span>
          </th>
        ))}

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
