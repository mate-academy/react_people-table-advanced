import { Link, useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Person } from '../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const search = searchParams.toString();

  // ---------- SORTING ----------
  const getSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (!order) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getIcon = (field: string) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  // ---------- NAME COLOR ----------
  const getNameClass = (person: Person) => {
    if (person.sex === 'f') {
      return 'has-text-danger';
    }

    return '';
  };

  // ---------- RELATIVES ----------
  const renderRelative = (name?: string) => {
    if (!name) {
      return '-';
    }

    const relative = people.find(p => p.name === name);

    if (!relative) {
      return <span>{name}</span>;
    }

    return (
      <Link
        to={`/people/${relative.slug}${search ? `?${search}` : ''}`}
        className={getNameClass(relative)}
      >
        {relative.name}
      </Link>
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
                {field[0].toUpperCase() + field.slice(1)}
                <SearchLink params={getSortParams(field)}>
                  <span className="icon">
                    <i className={getIcon(field)} />
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
            className={slug === person.slug ? 'has-background-warning' : ''}
          >
            <td>
              <Link
                to={`/people/${person.slug}${search ? `?${search}` : ''}`}
                className={getNameClass(person)}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>{renderRelative(person.motherName || undefined)}</td>
            <td>{renderRelative(person.fatherName || undefined)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
