import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
  selectedPersonId?: string;
}

export const PeopleTable = ({ people, selectedPersonId }: Props) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

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
      return <i className="fas fa-sort"></i>;
    }

    return currentOrder === 'desc' ? (
      <i className="fas fa-sort-down"></i>
    ) : (
      <i className="fas fa-sort-up"></i>
    );
  };

  return (
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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              selectedPersonId === person.slug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person} people={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <PersonLink
                  person={
                    people.find(p => p.name === person.motherName) || null
                  }
                  people={people}
                  name={person.motherName}
                />
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <PersonLink
                  person={
                    people.find(p => p.name === person.fatherName) || null
                  }
                  people={people}
                  name={person.fatherName}
                />
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
