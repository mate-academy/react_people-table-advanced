import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  visiblePeople: Person[];
};

const tableFields = [
  { value: 'Name', param: 'name' },
  { value: 'Sex', param: 'sex' },
  { value: 'Born', param: 'born' },
  { value: 'Died', param: 'died' },
  { value: 'Mother' },
  { value: 'Father' },
];

export const PeopleTable: React.FC<Props> = ({ people, visiblePeople }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const handleSort = () => {
    if (sortField === 'name' || sortField === 'sex') {
      if (sortOrder === 'desc') {
        return [...visiblePeople].sort((a, b) =>
          b[sortField].localeCompare(a[sortField]),
        );
      }

      return [...visiblePeople].sort((a, b) =>
        a[sortField].localeCompare(b[sortField]),
      );
    } else if (sortField === 'born' || sortField === 'died') {
      if (sortOrder === 'desc') {
        return [...visiblePeople].sort((a, b) => b[sortField] - a[sortField]);
      }

      return visiblePeople.sort((a, b) => a[sortField] - b[sortField]);
    } else {
      return visiblePeople;
    }
  };

  const finalList = handleSort();

  const getPersonSlug = (name: string | null) => {
    if (!name) {
      return;
    }

    const pers = people.find(item => item.name === name);

    if (!pers) {
      return;
    }

    return pers.slug;
  };

  const { slug } = useParams();

  const sortParams = (param: string) => {
    if (sortField === param && !sortOrder) {
      return { sort: param, order: 'desc' };
    } else if (sortField !== param) {
      return { sort: param, order: null };
    }

    return { sort: null, order: null };
  };

  const getClassName = (param: string) => {
    if (sortField === param && !sortOrder) {
      return 'fas fa-sort-up';
    } else if (sortField === param && sortOrder) {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableFields.map(({ value, param }) => (
            <th key={value}>
              {param ? (
                <span className="is-flex is-flex-wrap-nowrap">
                  {value}
                  <SearchLink params={sortParams(param)}>
                    <span className="icon">
                      <i className={getClassName(param)} />
                    </span>
                  </SearchLink>
                </span>
              ) : (
                value
              )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {finalList.map(person => (
          <tr
            data-cy="person"
            className={slug === person.slug ? 'has-background-warning' : ''}
            key={person.slug}
          >
            <td>
              <Link
                to={person.slug}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {getPersonSlug(person.motherName) ? (
              <td>
                <Link
                  to={getPersonSlug(person.motherName) || '/'}
                  className="has-text-danger"
                >
                  {person.motherName}
                </Link>
              </td>
            ) : (
              <td>{person.motherName ? person.motherName : '-'}</td>
            )}

            {getPersonSlug(person.fatherName) ? (
              <td>
                <Link to={getPersonSlug(person.fatherName) || '/'}>
                  {person.fatherName}
                </Link>
              </td>
            ) : (
              <td>{person.fatherName ? person.fatherName : '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
