import { Link, useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
}

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams);

    if (sort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (!order) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const getSortIcon = (field: SortField) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
      data-cy="peopleTable"
    >
      <thead>
        <tr>
          <th>
            Name
            <button
              type="button"
              className="button is-white is-small"
              aria-label="Sort by name"
              onClick={() => handleSort('name')}
            >
              <span className={`icon fas ${getSortIcon('name')}`} />
            </button>
          </th>

          <th>
            Sex
            <button
              type="button"
              className="button is-white is-small"
              aria-label="Sort by sex"
              onClick={() => handleSort('sex')}
            >
              <span className={`icon fas ${getSortIcon('sex')}`} />
            </button>
          </th>

          <th>
            Born
            <button
              type="button"
              className="button is-white is-small"
              aria-label="Sort by born"
              onClick={() => handleSort('born')}
            >
              <span className={`icon fas ${getSortIcon('born')}`} />
            </button>
          </th>

          <th>
            Died
            <button
              type="button"
              className="button is-white is-small"
              aria-label="Sort by died"
              onClick={() => handleSort('died')}
            >
              <span className={`icon fas ${getSortIcon('died')}`} />
            </button>
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
            className={person.slug === slug ? 'has-background-warning' : ''}
          >
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: searchParams.toString()
                    ? `?${searchParams.toString()}`
                    : '',
                }}
                className={
                  person.sex === 'f' ? 'has-text-danger' : 'has-text-link'
                }
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              <PersonLink name={person.motherName} people={people} />
            </td>

            <td>
              <PersonLink name={person.fatherName} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
