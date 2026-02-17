/* eslint-disable jsx-a11y/control-has-associated-label */
import { PersonLink } from './PersonLink';
import { Person } from '../types/Person';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type SortField = 'name' | 'sex' | 'born' | 'died';

type Props = {
  people: Person[];
  selectedPerson?: string;
};

type SortParams = {
  sort: SortField | null;
  order: 'desc' | null;
};

export const PeopleTable = ({ people, selectedPerson }: Props) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order') || 'asc';

  const getNextSort = (field: SortField): SortParams => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order === 'asc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getIcon = (field: string) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    return order === 'asc' ? 'fa-sort-down' : 'fa-sort-up';
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
              <SearchLink params={getNextSort('name')}>
                <span className="icon">
                  <i className={`fas ${getIcon('name')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextSort('sex')}>
                <span className="icon">
                  <i className={`fas ${getIcon('sex')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextSort('born')}>
                <span className="icon">
                  <i className={`fas ${getIcon('born')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextSort('died')}>
                <span className="icon">
                  <i className={`fas ${getIcon('died')}`} />
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

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                selectedPerson === person.slug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died || '-'}</td>

              <td>
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    <span>{person.motherName}</span>
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  father ? (
                    <PersonLink person={father} />
                  ) : (
                    <span>{person.fatherName}</span>
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
