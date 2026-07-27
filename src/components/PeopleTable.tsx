import { Link, useSearchParams, useParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  allPeople: Person[];
};

export const PeopleTable = ({ people, allPeople }: Props) => {
  const [searchParams] = useSearchParams();
  const { personSlug } = useParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortLink = (field: string) => {
    let nextSort: string | null = field;
    let nextOrder: string | null = null;

    if (sort === field) {
      if (order !== 'desc') {
        nextOrder = 'desc';
      } else {
        nextSort = null;
      }
    }

    return (
      '?' + getSearchWith(searchParams, { sort: nextSort, order: nextOrder })
    );
  };

  const renderSortIcon = (field: string) => {
    if (sort !== field) {
      return <i className="fas fa-sort" color="lightgray" />;
    }

    return order === 'desc' ? (
      <i className="fas fa-sort-down" />
    ) : (
      <i className="fas fa-sort-up" />
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <Link to={getSortLink(field)} className="ml-1">
                  <span className="icon">{renderSortIcon(field)}</span>
                </Link>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => {
          const isSelected = personSlug === (person.slug || person.name);

          return (
            <tr
              key={person.slug || person.name}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <a
                  href={`#/people/${person.slug || person.name}`}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </a>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  allPeople.some(p => p.name === person.motherName) ? (
                    <a
                      href={`#/people/${allPeople.find(p => p.name === person.motherName)?.slug}`}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </a>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  allPeople.some(p => p.name === person.fatherName) ? (
                    <a
                      href={`#/people/${allPeople.find(p => p.name === person.fatherName)?.slug}`}
                    >
                      {person.fatherName}
                    </a>
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
