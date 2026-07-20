/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const SORT_FIELDS = ['name', 'sex', 'born', 'died'];

const getPersonLinkClassName = (person: Person) =>
  person.sex === 'f' ? 'has-text-danger' : undefined;

const renderRelative = (
  peopleByName: Map<string, Person>,
  personName: string | null,
  search: string,
) => {
  if (!personName) {
    return '-';
  }

  const relative = peopleByName.get(personName);

  if (!relative) {
    return personName;
  }

  return (
    <Link
      className={getPersonLinkClassName(relative)}
      to={{ pathname: `/people/${relative.slug}`, search }}
    >
      {relative.name}
    </Link>
  );
};

const getSortIconClass = (
  field: string,
  sort: string | null,
  order: string | null,
) => {
  if (sort !== field) {
    return 'fa-sort';
  }

  return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
};

const getSortParams = (
  field: string,
  sort: string | null,
  order: string | null,
) => {
  if (sort !== field) {
    return { sort: field, order: null };
  }

  if (!order) {
    return { sort: field, order: 'desc' };
  }

  return { sort: null, order: null };
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const peopleByName = new Map(people.map(person => [person.name, person]));
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const search = searchParams.toString();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map((label, index) => {
            const field = SORT_FIELDS[index];

            return (
              <th key={field}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {label}
                  <SearchLink params={getSortParams(field, sort, order)}>
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          getSortIconClass(field, sort, order),
                        )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

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
                className={getPersonLinkClassName(person)}
                to={{ pathname: `/people/${person.slug}`, search }}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderRelative(peopleByName, person.motherName, search)}</td>
            <td>{renderRelative(peopleByName, person.fatherName, search)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
