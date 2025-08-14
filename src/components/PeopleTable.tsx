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
      const currentSort = newSearchParams.get('sort');
      const currentOrder = newSearchParams.get('order');

      switch (true) {
        case currentSort !== field:
          newSearchParams.set('sort', field);
          newSearchParams.set('order', 'asc');
          break;

        case currentOrder === 'asc':
          newSearchParams.set('order', 'desc');
          break;

        case currentOrder === 'desc':
          newSearchParams.delete('sort');
          newSearchParams.delete('order');
          break;

        default:
          newSearchParams.set('sort', field);
          newSearchParams.set('order', 'asc');
          break;
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
    const lowerCaseQuery = query.toLocaleLowerCase();

    filteredItems = filteredItems.filter((item: Person) => {
      const nameMAtches = item.name
        .toLocaleLowerCase()
        .includes(lowerCaseQuery);
      const fatherNameMatches = item.fatherName
        ?.toLocaleLowerCase()
        .includes(lowerCaseQuery);
      const motherNameMatches = item.motherName
        ?.toLocaleLowerCase()
        .includes(lowerCaseQuery);

      return nameMAtches || fatherNameMatches || motherNameMatches;
    });
  }

  if (sortBy) {
    filteredItems.sort((a: Person, b: Person) => {
      const valA = a[sortBy as keyof Person];
      const valB = b[sortBy as keyof Person];

      if (valA === undefined || valB === undefined) {
        return 0;
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'desc'
          ? valB.localeCompare(valA)
          : valA.localeCompare(valB);
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'desc' ? valB - valA : valA - valB;
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
                          sortBy !== 'sex'
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
                peronObj => peronObj.name === person.motherName,
              )?.slug;
              const father = people.find(
                peronObj => peronObj.name === person.fatherName,
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
