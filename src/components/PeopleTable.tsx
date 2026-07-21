import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string | undefined;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const changeSorting = (field: string) => {
    const params = new URLSearchParams(searchParams);

    if (currentSort !== field) {
      params.set('sort', field);
      params.set('order', 'asc');
    } else if (currentOrder === 'asc') {
      params.set('order', 'desc');
    } else {
      params.delete('order');
      params.delete('sort');
    }

    setSearchParams(params);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => changeSorting('name')}>
            Name{' '}
            <span aria-hidden="true">
              {currentSort === 'name'
                ? currentOrder === 'asc'
                  ? '▲'
                  : '▼'
                : '↕'}
            </span>
          </th>
          <th onClick={() => changeSorting('sex')}>
            Sex{' '}
            {currentSort === 'sex'
              ? currentOrder === 'asc'
                ? '▲'
                : '▼'
              : '↕'}
          </th>
          <th onClick={() => changeSorting('born')}>
            Born{' '}
            {currentSort === 'born'
              ? currentOrder === 'asc'
                ? '▲'
                : '▼'
              : '↕'}
          </th>
          <th onClick={() => changeSorting('died')}>
            Died{' '}
            {currentSort === 'died'
              ? currentOrder === 'asc'
                ? '▲'
                : '▼'
              : '↕'}
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
                person.slug === selectedSlug ? 'has-background-warning' : ''
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
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : person.fatherName ? (
                  person.fatherName
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
