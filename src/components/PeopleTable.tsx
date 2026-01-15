import { PersonLink } from './PersonLink';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { Person } from '../types';

type Props = {
  personSlug: string | undefined;
  people: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ personSlug, people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortLink = (field: SortField) => {
    if (sort !== field) {
      return getSearchWith(searchParams, { sort: field, order: null });
    }

    if (order !== 'desc') {
      return getSearchWith(searchParams, { sort: field, order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: null, order: null });
  };

  const getArrowClass = (field: SortField) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {(['name', 'sex', 'born', 'died'] as SortField[]).map(field => (
            <th key={field}>
              <Link
                to={{ search: getSortLink(field) }}
                className="has-text-dark is-flex is-flex-wrap-nowrap"
              >
                {field[0].toUpperCase() + field.slice(1)}
                <span className="icon">
                  <i className={getArrowClass(field)} />
                </span>
              </Link>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          return (
            <tr
              data-cy="person"
              className={
                person.slug === personSlug ? 'has-background-warning' : ''
              }
              key={person.slug}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <PersonLink person={person.mother} />
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.father ? (
                  <PersonLink person={person.father} />
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
