import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  selectedPerson: string | undefined;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const [searchParams] = useSearchParams();
  const sortValue = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

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
              <SearchLink
                params={{
                  sort: sortOrder === 'desc' && sortValue === 'name'
                    ? null
                    : 'name',
                  order: sortValue === 'name' && sortOrder !== 'desc'
                    ? 'desc'
                    : null,
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: sortOrder === 'desc' && sortValue === 'sex'
                    ? null
                    : 'sex',
                  order: sortValue === 'sex' && sortOrder !== 'desc'
                    ? 'desc'
                    : null,
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: sortOrder === 'desc' && sortValue === 'born'
                    ? null
                    : 'born',
                  order: sortValue === 'born' && sortOrder !== 'desc'
                    ? 'desc'
                    : null,
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: sortOrder === 'desc' && sortValue === 'died'
                    ? null
                    : 'died',
                  order: sortValue === 'died' && sortOrder !== 'desc'
                    ? 'desc'
                    : null,
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);
          const fullPerson = {
            ...person,
            mother,
            father,
          };

          return (
            <PersonItem
              person={fullPerson}
              selectedPerson={selectedPerson}
              key={person.name}
            />
          );
        })}
      </tbody>
    </table>
  );
};
