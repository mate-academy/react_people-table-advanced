/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PeopleLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  peoples: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peoples }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const getSortParams = (field: string) => {
    if (sortField !== field) {
      return { sort: field, order: null };
    } else if (!sortOrder) {
      return { sort: field, order: 'desc' };
    } else {
      return { sort: null, order: null };
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return 'fas fa-sort';
    }

    return sortOrder === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peoples.map((person: Person) => (
          <PeopleLink person={person} peoples={peoples} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
