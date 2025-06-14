import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSortClick = (field: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

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

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    if (order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
      data-cy="peopleTable"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <button
                type="button"
                className="is-flex is-flex-wrap-nowrap button is-white p-0"
                onClick={() => handleSortClick(field)}
              >
                {field[0].toUpperCase() + field.slice(1)}
                <span className="icon ml-2">
                  <i className={getSortIcon(field)} />
                </span>
              </button>
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
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <SearchLink
                params={{}}
                to={`/people/${person.slug}`}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </SearchLink>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                person.mother ? (
                  <SearchLink
                    params={{}}
                    to={`/people/${person.mother.slug}`}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </SearchLink>
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                person.father ? (
                  <SearchLink params={{}} to={`/people/${person.father.slug}`}>
                    {person.fatherName}
                  </SearchLink>
                ) : (
                  person.fatherName
                )
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
