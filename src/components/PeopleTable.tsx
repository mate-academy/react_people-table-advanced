import { useSearchParams } from 'react-router-dom';
import type { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type PeopleTableProps = {
  people: Person[];
  visiblePeople: Person[];
  slug: string | undefined;
};

type SortField = 'name' | 'sex' | 'born' | 'died';

const renderParent = (people: Person[], parentName: string | null) => {
  const parent = people.find(person => person.name === parentName);

  if (parent) {
    return <PersonLink person={parent} />;
  }

  return parentName || '-';
};

export const PeopleTable = ({
  people,
  slug,
  visiblePeople,
}: PeopleTableProps) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (field: SortField) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    return order === 'desc'
      ? { sort: null, order: null }
      : { sort: field, order: 'desc' };
  };

  const getSortIcon = (field: SortField) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
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
        {visiblePeople.map(person => (
          <tr
            data-cy="person"
            className={slug === person.slug ? 'has-background-warning' : ''}
            key={person.slug}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderParent(people, person.motherName)}</td>
            <td>{renderParent(people, person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
