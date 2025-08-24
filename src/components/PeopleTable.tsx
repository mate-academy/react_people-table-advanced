import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug: string | null;
  sort: string | null;
  order: string | null;
  onSort: (param: string) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  sort,
  order,
  onSort,
}) => (
  <div className="block">
    <div className="columns is-desktop is-flex-direction-row-reverse">
      <div className="column is-7-tablet is-narrow-desktop">
        <PeopleFilters />
      </div>
      <div className="column">
        <div className="box table-container">
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <th onClick={() => onSort('name')}>
                Name {sort === 'name' && (order === 'desc' ? '▼' : '▲')}
              </th>
              <th onClick={() => onSort('sex')}>
                Sex {sort === 'sex' && (order === 'desc' ? '▼' : '▲')}
              </th>
              <th onClick={() => onSort('born')}>
                Born {sort === 'born' && (order === 'desc' ? '▼' : '▲')}
              </th>
              <th onClick={() => onSort('died')}>
                Died {sort === 'died' && (order === 'desc' ? '▼' : '▲')}
              </th>{' '}
              <th>Mother</th>
              <th>Father</th>
            </thead>

            <tbody>
              {people.map(person => {
                const slug = `${person.name.toLowerCase().replace(/\s+/g, '-')}-${person.born}`;
                const isSelected = slug === selectedSlug;

                return (
                  <tr
                    key={slug}
                    data-cy="person"
                    className={isSelected ? 'has-background-warning' : ''}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.motherName ? (
                        <PersonLink
                          person={people.find(
                            p => p.name === person.motherName,
                          )}
                          name={person.motherName}
                        />
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      {person.fatherName ? (
                        <PersonLink
                          person={people.find(
                            p => p.name === person.fatherName,
                          )}
                          name={person.fatherName}
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
    </div>
  </div>
);
