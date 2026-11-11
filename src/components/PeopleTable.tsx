/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonComponent } from './Person';

type Props = {
  people: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

const sortFields: SortField[] = ['name', 'sex', 'born', 'died'];

export const PeopleTable = ({ people }: Props) => {
  const [searchParams] = useSearchParams();

  const sortedPeople = [...people];
  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams);

    if (sort !== field) {
      params.set('sort', field);
      params.set('order', 'asc');
    } else if (order === 'asc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    return `/people?${params.toString()}`;
  };

  if (
    sort &&
    sortFields.includes(sort) &&
    (order === 'asc' || order === 'desc')
  ) {
    sortedPeople.sort((a, b) => {
      const first = a[sort];
      const second = b[sort];

      let result: number;

      if (typeof first === 'number' && typeof second === 'number') {
        result = first - second;
      } else {
        result = String(first ?? '').localeCompare(String(second ?? ''));
      }

      return order === 'desc' ? -result : result;
    });
  }

  const getSortLabel = (field: SortField) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    return order === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFields.map(field => (
            <th key={field}>
              <Link to={handleSort(field)}>
                {field.charAt(0).toUpperCase() + field.slice(1)}

                <span className="icon">
                  <i className={`fas ${getSortLabel(field)}`}></i>
                </span>
              </Link>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople?.map(person => (
          <PersonComponent
            key={person.slug}
            person={person}
            people={sortedPeople}
          />
        ))}
      </tbody>
    </table>
  );
};
