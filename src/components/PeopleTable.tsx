import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

export const PeopleTable: React.FC<{
  people: Person[];
  selectedSlug?: string;
}> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const peopleByName = people.reduce<Record<string, Person>>(
    (acc, person) => ({
      ...acc,
      [person.name]: person,
    }),
    {},
  );

  const getSortParams = (field: string) => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (currentOrder !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (field: string) => {
    if (currentSort !== field) {
      return '';
    }

    if (currentOrder === 'desc') {
      return '↓';
    }

    return '↑';
  };

  const createPersonLink = (person: Person) => {
    const currentParams = new URLSearchParams(searchParams);

    return `/people/${person.slug}?${currentParams.toString()}`;
  };

  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <SearchLink params={getSortParams('name')}>
                  Name{getSortIcon('name')}
                </SearchLink>
              </th>
              <th>
                <SearchLink params={getSortParams('sex')}>
                  Sex{getSortIcon('sex')}
                </SearchLink>
              </th>
              <th>
                <SearchLink params={getSortParams('born')}>
                  Born{getSortIcon('born')}
                </SearchLink>
              </th>
              <th>
                <SearchLink params={getSortParams('died')}>
                  Died{getSortIcon('died')}
                </SearchLink>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <tbody>
            {people.map(person => {
              const isSelected = person.slug === selectedSlug;
              const mother = person.motherName
                ? peopleByName[person.motherName]
                : undefined;
              const father = person.fatherName
                ? peopleByName[person.fatherName]
                : undefined;

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={isSelected ? 'has-background-warning' : ''}
                >
                  <td>
                    <Link
                      to={createPersonLink(person)}
                      className={person.sex === 'f' ? 'has-text-danger' : ''}
                    >
                      {person.name}
                    </Link>
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName ? (
                      <PersonLink
                        person={mother}
                        name={person.motherName}
                        searchParams={searchParams}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {person.fatherName ? (
                      <PersonLink
                        person={father}
                        name={person.fatherName}
                        searchParams={searchParams}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
