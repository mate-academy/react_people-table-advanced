import { useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const selectedSlugFromUrl = location.pathname.split('/').pop();
  const sort = searchParams.get('sort') as keyof Person | null;
  const order = searchParams.get('order');

  const handleSortClick = field => {
    const newParams = new URLSearchParams(searchParams);

    if (sort !== field) {
      newParams.set('sort', field);
      newParams.delete('order');
    } else if (!order) {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  const sortedPeople = [...people];

  if (sort) {
    sortedPeople.sort((a, b) => {
      const aValue = a[sort];
      const bValue = b[sort];

      if (aValue === null || aValue === undefined) {
        return 1;
      }

      if (bValue === null || bValue === undefined) {
        return -1;
      }

      if (aValue < bValue) {
        return order === 'desc' ? 1 : -1;
      }

      if (aValue > bValue) {
        return order === 'desc' ? -1 : 1;
      }

      return 0;
    });
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th
            onClick={() => handleSortClick('name')}
            style={{ cursor: 'pointer' }}
          >
            Name
          </th>
          <th
            onClick={() => handleSortClick('sex')}
            style={{ cursor: 'pointer' }}
          >
            Sex
          </th>
          <th
            onClick={() => handleSortClick('born')}
            style={{ cursor: 'pointer' }}
          >
            Born
          </th>
          <th
            onClick={() => handleSortClick('died')}
            style={{ cursor: 'pointer' }}
          >
            Died
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = people.find(p => p.name === person.motherName) || null;
          const father = people.find(p => p.name === person.fatherName) || null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                selectedSlugFromUrl === person.slug
                  ? 'has-background-warning'
                  : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
