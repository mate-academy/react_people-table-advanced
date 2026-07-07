/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

export const PeopleTable = ({ list }: { list: Person[] }) => {
  const path = useLocation().pathname;
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries');
  const currentOrder = searchParams.get('order');

  type SortField = 'name' | 'sex' | 'born' | 'died';
  const sortFields: SortField[] = ['name', 'sex', 'born', 'died'];
  const sortParam = searchParams.get('sort');

  const currentSort: SortField | null =
    sortParam && sortFields.includes(sortParam as SortField)
      ? (sortParam as SortField)
      : null;

  const getSortParams = (param: string): SearchParams => {
    if (currentSort !== param) {
      return { sort: param, order: null };
    }

    if (currentOrder === null) {
      return { sort: param, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (param: string) => {
    if (currentSort !== param) {
      return 'fas fa-sort';
    }

    if (currentOrder === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  const sortPeople = (a: Person, b: Person): number => {
    if (currentSort === null) {
      return 0;
    }

    if (currentSort === 'sex' || currentSort === 'name') {
      const valueA = a[currentSort];
      const valueB = b[currentSort];

      if (currentOrder === 'desc') {
        return valueB.localeCompare(valueA);
      }

      return valueA.localeCompare(valueB);
    }

    const valueA = a[currentSort];
    const valueB = b[currentSort];

    if (currentOrder === 'desc') {
      return valueB - valueA;
    }

    return valueA - valueB;
  };

  const inputFilter = (person: Person) => {
    const item = searchParams.get('query')?.toLowerCase().trim();

    if (item === undefined) {
      return true;
    }

    return (
      person.name.toLowerCase().includes(item) ||
      (person.fatherName !== null &&
        person.fatherName.toLowerCase().includes(item)) ||
      (person.motherName !== null &&
        person.motherName.toLowerCase().includes(item))
    );
  };

  const PersonLink = ({ person }: { person: Person }) => {
    return (
      <td>
        <Link
          className={person.sex === 'f' ? 'has-text-danger' : ''}
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString()
              ? `?${searchParams.toString()}`
              : '',
          }}
        >
          {person.name}
        </Link>
      </td>
    );
  };

  return (
    <div className="block">
      <div className="columns">
        <div className="column">
          <div className="box table-container">
            <table
              data-cy="peopleTable"
              // eslint-disable-next-line max-len
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
                {list
                  .filter(person => !sex || person.sex === sex)
                  .filter(inputFilter)
                  .filter(person => {
                    const personCentury = Math.ceil(person.born / 100);

                    return (
                      centuries.length === 0 ||
                      centuries.includes(String(personCentury))
                    );
                  })
                  .sort(sortPeople)
                  .map(person => {
                    const mother = list.find(p => p.name === person.motherName);
                    const father = list.find(p => p.name === person.fatherName);

                    return (
                      <tr
                        data-cy="person"
                        key={person.name}
                        className={
                          path.includes(person.slug)
                            ? 'has-background-warning'
                            : ''
                        }
                      >
                        <td>
                          <Link
                            className={
                              person.sex === 'f' ? 'has-text-danger' : ''
                            }
                            to={{
                              pathname: `/people/${person.slug}`,
                              search: searchParams.toString()
                                ? `?${searchParams.toString()}`
                                : '',
                            }}
                          >
                            {person.name}
                          </Link>
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        {mother ? (
                          <PersonLink person={mother} />
                        ) : (
                          <td>{person.motherName || '-'}</td>
                        )}
                        {father ? (
                          <PersonLink person={father} />
                        ) : (
                          <td>{person.fatherName || '-'}</td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
