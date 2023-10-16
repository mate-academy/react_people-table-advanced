import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[],
}

const sortFields = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sortField') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const handleClickSorting = (newSortField: string) => {
    const isFirstClick = newSortField !== sortField;
    const isSecondClick = newSortField === sortField && sortOrder !== 'desc';

    if (isFirstClick) {
      return {
        sortField: newSortField,
        sortOrder: null,
      };
    }

    if (isSecondClick) {
      return {
        sortField: newSortField,
        sortOrder: 'desc',
      };
    }

    return {
      sortField: null,
      sortOrder: null,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFields.map((field) => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {field}
                <SearchLink params={handleClickSorting(field)}>
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': sortField !== field,
                      'fa-sort-up': sortField === field && !sortOrder,
                      'fa-sort-down': sortField === field
                        && sortOrder === 'desc',
                    })}
                    />
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
        {people.map((person) => {
          const mother = people.find(({ name }) => name === person.motherName);
          const father = people.find(({ name }) => name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === personSlug,
              })}
            >
              <td>
                <Link
                  to={person.slug}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              {mother ? (
                <td>
                  <Link to={mother?.slug} className="has-text-danger">
                    {person.motherName}
                  </Link>
                </td>
              ) : (
                <td>{person.motherName || '-'}</td>
              )}

              {father ? (
                <td>
                  <Link to={father?.slug}>{person.fatherName}</Link>
                </td>
              ) : (
                <td>{person.fatherName || '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
