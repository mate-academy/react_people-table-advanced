import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { sortPeople } from '../../utils/sortPeople';
import { SearchLink } from '../SearchLink';
import { PersonInfo } from '../PersonInfo/PersonInfo';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort' || null);
  const sortOrder = searchParams.get('order' || null);

  const getSortIcon = (field: string | null) => {
    if (sortField === field) {
      return sortOrder === null ? 'fa-sort-up' : 'fa-sort-down';
    }

    return 'fa-sort';
  };

  const toggleSortParams = (field: string) => {
    if (sortField === field) {
      return sortOrder === null
        ? { sort: field, order: 'desc' }
        : { sort: null, order: null };
    }

    return { sort: field, order: null };
  };

  const visiblePeople = sortPeople(
    people,
    searchParams.get('sort'),
    searchParams.get('order'),
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
          <PersonInfo
            key={person.slug}
            person={person}
            people={visiblePeople}
          />
        ))}
      </tbody>
    </table>
  );
};
