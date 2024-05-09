import { useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { SearchLink } from './SearchLink';
import SortIcon from './SortIcon';
import PersonField from './PersonField';

type Props = {
  data: Person[];
};

export const PeopleTable: React.FC<Props> = ({ data }) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  function handleSortField(sortField: string) {
    let newSearchParams = {};

    if (sortBy !== sortField) {
      newSearchParams = {
        sort: sortField || null,
      };
    } else if (order !== 'desc') {
      newSearchParams = {
        order: 'desc',
      };
    } else {
      newSearchParams = {
        sort: null,
        order: null,
      };
    }

    return newSearchParams;
  }

  return (
    <>
      {!!data.length && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink params={handleSortField('name')}>
                    <SortIcon columnName={'name'} />
                  </SearchLink>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink params={handleSortField('sex')}>
                    <SortIcon columnName={'sex'} />
                  </SearchLink>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink params={handleSortField('born')}>
                    <SortIcon columnName={'born'} />
                  </SearchLink>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink params={handleSortField('died')}>
                    <SortIcon columnName={'died'} />
                  </SearchLink>
                </span>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {data.map(person => {
              return <PersonField person={person} key={person.slug} />;
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
