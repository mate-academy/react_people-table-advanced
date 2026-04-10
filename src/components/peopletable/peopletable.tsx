import { PersonLink } from '../personlink/personlink';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { PeopleTableProps, Person } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

export const PeopleTable: React.FC<PeopleTableProps> = ({
  person,
  errorMessage,
  isLoading,
  serveAlone,
  selectedUser,
}) => {
  const peoples: Record<string, Person> = {};

  person.forEach(p => (peoples[p.name] = p));

  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort'); // pega o valor depoois de sort
  const currentOrder = searchParams.get('order'); // pega o valor desc
  const currentSex = searchParams.get('sex');
  const currentCenturies = searchParams.getAll('centuries');
  const currentQuery = searchParams.get('query') || '';

  const sorted = {
    name: 'name',
    sex: 'sex',
    born: 'born',
    died: 'died',
  };

  const normalizedQuery = currentQuery.toLowerCase().trim();

  const filteredPeople = [...person].filter(p => {
    if (currentSex && p.sex !== currentSex) {
      return false;
    }

    const personCenturie = Math.ceil(p.born / 100).toString();

    if (
      currentCenturies.length > 0 &&
      !currentCenturies.includes(personCenturie)
    ) {
      return false;
    }

    if (normalizedQuery && !p.name.toLowerCase().includes(normalizedQuery)) {
      return false;
    }

    return true;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!currentSort) {
      return 0;
    } else if (typeof a[currentSort] === 'string') {
      const result = a[currentSort].localeCompare(b[currentSort]);

      return currentOrder === 'desc' ? -result : result;
    } else {
      const result = a[currentSort] - b[currentSort];

      return currentOrder === 'desc' ? -result : result;
    }
  });

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {person.length === 0 && serveAlone && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
        <p>There are no people matching the current search criteria</p>

        {serveAlone && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <SearchLink
                      params={{
                        sort:
                          currentSort === 'name' && currentOrder === 'desc'
                            ? null
                            : 'name',
                        order:
                          currentSort === 'name' && currentOrder !== 'desc'
                            ? 'desc'
                            : null,
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': currentSort !== sorted.name,
                            'fa-sort-up':
                              currentSort === sorted.name &&
                              currentOrder !== 'desc',
                            'fa-sort-down':
                              currentSort === sorted.name &&
                              currentOrder === 'desc',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink
                      params={{
                        sort:
                          currentSort === 'sex' && currentOrder === 'desc'
                            ? null
                            : 'sex',
                        order:
                          currentSort === 'sex' && currentOrder !== 'desc'
                            ? 'desc'
                            : null,
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': currentSort !== sorted.sex,
                            'fa-sort-up':
                              currentSort === sorted.sex &&
                              currentOrder !== 'desc',
                            'fa-sort-down':
                              currentSort === sorted.sex &&
                              currentOrder === 'desc',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink
                      params={{
                        sort:
                          currentSort === 'born' && currentOrder === 'desc'
                            ? null
                            : 'born',
                        order:
                          currentSort === 'born' && currentOrder !== 'desc'
                            ? 'desc'
                            : null,
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': currentSort !== sorted.born,
                            'fa-sort-up':
                              currentSort === sorted.born &&
                              currentOrder !== 'desc',
                            'fa-sort-down':
                              currentSort === sorted.born &&
                              currentOrder === 'desc',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SearchLink
                      params={{
                        sort:
                          currentSort === 'died' && currentOrder === 'desc'
                            ? null
                            : 'died',
                        order:
                          currentSort === 'died' && currentOrder !== 'desc'
                            ? 'desc'
                            : null,
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': currentSort !== sorted.died,
                            'fa-sort-up':
                              currentSort === sorted.died &&
                              currentOrder !== 'desc',
                            'fa-sort-down':
                              currentSort === sorted.died &&
                              currentOrder === 'desc',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>
            <tbody>
              {sortedPeople.map(p => {
                const mother = peoples[p.motherName || ''];
                const father = peoples[p.fatherName || ''];

                return (
                  <tr
                    key={p.slug}
                    data-cy="person"
                    className={classNames({
                      'has-background-warning': selectedUser === p.slug,
                    })}
                  >
                    <td>
                      <PersonLink person={p} />
                    </td>
                    <td>{p.sex}</td>
                    <td>{p.born}</td>
                    <td>{p.died}</td>
                    <td>
                      <PersonLink person={mother} name={p.motherName} />
                    </td>

                    <td>
                      <PersonLink person={father} name={p.fatherName} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
