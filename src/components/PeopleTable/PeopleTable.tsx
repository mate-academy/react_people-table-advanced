import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

const getSortedPeople = (people: Person[], sort: string, order: string) => {
  if (!sort) {
    return people;
  }

  return [...people].sort((a, b) => {
    const field = sort as SortField;
    const direction = order === 'desc' ? -1 : 1;

    if (field === 'born' || field === 'died') {
      return (a[field] - b[field]) * direction;
    }

    return a[field].localeCompare(b[field]) * direction;
  });
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

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

  const sortedPeople = getSortedPeople(people, sort, order);

  const getSortIcon = (field: SortField) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const columns: { label: string; field: SortField }[] = [
    { label: 'Name', field: 'name' },
    { label: 'Sex', field: 'sex' },
    { label: 'Born', field: 'born' },
    { label: 'Died', field: 'died' },
  ];

  const findPerson = (name: string | null): Person | undefined => {
    if (!name) {
      return undefined;
    }

    return people.find(p => p.name === name);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(({ label, field }) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                <a
                  onClick={event => {
                    event.preventDefault();
                    handleSort(field);
                  }}
                  href="#"
                >
                  <span className="icon">
                    <i className={getSortIcon(field)} />
                  </span>
                </a>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = person.mother || findPerson(person.motherName);
          const father = person.father || findPerson(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={person.slug === slug ? 'has-background-warning' : ''}
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
