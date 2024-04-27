import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import PersonLink from './PersonLink';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { sortPeople } from '../utils/sortPeople';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const getSortIcon = (field: string | null) => {
    const sortField = searchParams.get('sort' || null);
    const sortOrder = searchParams.get('order' || null);

    if (sortField === field) {
      return sortOrder === null ? 'fa-sort-up' : 'fa-sort-down';
    }

    return 'fa-sort';
  };

  const toggleSortParams = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort === field) {
      return currentOrder === null
        ? { sort: field, order: 'desc' }
        : { sort: null, order: null };
    }

    return { sort: field, order: null };
  };

  const visiblePeople = sortPeople(
    people,
    searchParams.get('sort'),
    searchParams.get('order') as 'desc',
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <SearchLink params={toggleSortParams(field)}>
                  <span className="icon">
                    <i className={classNames('fas', getSortIcon(field))} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            people={visiblePeople}
          />
        ))}
      </tbody>
    </table>
  );
};
