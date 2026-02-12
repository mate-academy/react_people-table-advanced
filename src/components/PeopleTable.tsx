import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

interface PeopleTableProps {
  people: Person[];
}

const findPersonByName = (
  name: string | null,
  people: Person[],
): Person | string | null => {
  return people.find(person => person.name === name) || name;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { personSlug: selectedPerson } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'sex', label: 'Sex' },
    { id: 'born', label: 'Born' },
    { id: 'died', label: 'Died' },
  ];

  return (
    <table
      data-cy="peopleTable"
      className="
                  table
                  is-striped
                  is-hoverable
                  is-narrow
                  is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(({ id, label }) => (
            <th key={id}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                <SearchLink params={getSortParams(id)}>
                  <span className="icon">
                    <i className={getSortIcon(id)} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': person.slug === selectedPerson,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                person={findPersonByName(person.motherName, people)}
              />
            </td>
            <td>
              <PersonLink
                person={findPersonByName(person.fatherName, people)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
