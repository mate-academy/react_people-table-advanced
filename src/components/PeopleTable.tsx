import { Link, useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSort = (field: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort === field && order === 'desc') {
      params.delete('sort');
      params.delete('order');
    } else if (sort === field) {
      params.set('order', 'desc');
    } else {
      params.set('sort', field);
      params.set('order', 'asc');
    }

    setSearchParams(params);
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return null;
    }

    return order === 'desc' ? ' ↓' : ' ↑';
  };

  const findPersonSlug = (name: string) => {
    return people.find(person => person.name === name)?.slug;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <button
              type="button"
              className="button is-white"
              onClick={() => handleSort('name')}
            >
              Name{getSortIcon('name')}
            </button>
          </th>

          <th>
            <button
              type="button"
              className="button is-white"
              onClick={() => handleSort('sex')}
            >
              Sex{getSortIcon('sex')}
            </button>
          </th>

          <th>
            <button
              type="button"
              className="button is-white"
              onClick={() => handleSort('born')}
            >
              Born{getSortIcon('born')}
            </button>
          </th>

          <th>
            <button
              type="button"
              className="button is-white"
              onClick={() => handleSort('died')}
            >
              Died{getSortIcon('died')}
            </button>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const nameClass =
            person.sex === 'f' ? 'has-text-danger' : 'has-text-link';

          const isSelected = person.slug === selectedSlug;

          const motherSlug = person.motherName
            ? findPersonSlug(person.motherName)
            : undefined;

          const fatherSlug = person.fatherName
            ? findPersonSlug(person.fatherName)
            : undefined;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <Link to={`/people/${person.slug}`} className={nameClass}>
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>

              <td>{person.born}</td>

              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  motherSlug ? (
                    <Link
                      to={`/people/${motherSlug}`}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  fatherSlug ? (
                    <Link
                      to={`/people/${fatherSlug}`}
                      className="has-text-link"
                    >
                      {person.fatherName}
                    </Link>
                  ) : (
                    person.fatherName
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
