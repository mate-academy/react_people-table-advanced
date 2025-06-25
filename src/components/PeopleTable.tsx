/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll('centuries');
  const selectedSex = searchParams.get('sex');
  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order');
  const query: string | null = searchParams.get('query');

  const handleSort = (field: string) => {
    setSearchParams(prevSearchParams => {
      const newSearchParams = new URLSearchParams(prevSearchParams.toString());

      if (sortBy !== field) {
        newSearchParams.delete('sort');
        newSearchParams.delete('order');
        newSearchParams.set('sort', field);
      } else if (!sortOrder) {
        newSearchParams.set('order', 'desc');
      } else {
        newSearchParams.delete('sort');
        newSearchParams.delete('order');
      }

      return newSearchParams;
    });
  };

  let filteredItems: Person[] = JSON.parse(JSON.stringify(people));

  if (selectedCenturies.length > 0) {
    filteredItems = filteredItems.filter((item: Person) => {
      const personCentury = String(Math.ceil(item.born / 100));

      return selectedCenturies.includes(personCentury);
    });
  }

  if (selectedSex) {
    filteredItems = filteredItems.filter(
      (item: Person) => item.sex === selectedSex,
    );
  }

  if (query) {
    const lowerCaseQuery = query.toLowerCase();

    filteredItems = filteredItems.filter((item: Person) => {
      const nameMatches = item.name.toLowerCase().includes(lowerCaseQuery);
      const fatherNameMatches = item.fatherName
        ?.toLowerCase()
        .includes(lowerCaseQuery);
      const motherNameMatches = item.motherName
        ?.toLowerCase()
        .includes(lowerCaseQuery);

      return nameMatches || fatherNameMatches || motherNameMatches;
    });
  }

  if (sortBy) {
    filteredItems.sort((a: Person, b: Person) => {
      const valueA = a[sortBy as keyof Person];
      const valueB = b[sortBy as keyof Person];

      if (valueA === undefined || valueB === undefined) {
        return 0;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder === 'desc'
          ? valueB.localeCompare(valueA)
          : valueA.localeCompare(valueB);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
      }

      return 0;
    });
  }

  return (
    <>
      {filteredItems.length === 0 ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <a>
                    <span
                      className="icon"
                      onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
                        event.preventDefault();
                        handleSort('name');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <i
                        className={
                          sortBy !== 'name'
                            ? 'fas fa-sort'
                            : sortOrder === 'desc'
                              ? 'fas fa-sort-down'
                              : 'fas fa-sort-up'
                        }
                      />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <a>
                    <span
                      className="icon"
                      onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
                        event.preventDefault();
                        handleSort('sex');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <i
                        className={
                          sortBy !== 'sex' // або інша колонка
                            ? 'fas fa-sort'
                            : sortOrder === 'desc'
                              ? 'fas fa-sort-down'
                              : 'fas fa-sort-up'
                        }
                      />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <a>
                    <span
                      className="icon"
                      onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
                        event.preventDefault();
                        handleSort('born');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <i
                        className={
                          sortBy !== 'born'
                            ? 'fas fa-sort'
                            : sortOrder === 'desc'
                              ? 'fas fa-sort-down'
                              : 'fas fa-sort-up'
                        }
                      />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <a>
                    <span
                      className="icon"
                      onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
                        event.preventDefault();
                        handleSort('died');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <i
                        className={
                          sortBy !== 'died'
                            ? 'fas fa-sort'
                            : sortOrder === 'desc'
                              ? 'fas fa-sort-down'
                              : 'fas fa-sort-up'
                        }
                      />
                    </span>
                  </a>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map(person => {
              const mother = people.find(
                personObj => personObj.name === person.motherName,
              )?.slug;
              const father = people.find(
                personObj => personObj.name === person.fatherName,
              )?.slug;

              return (
                <PersonLink
                  key={person.slug}
                  person={person}
                  mother={mother}
                  father={father}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
