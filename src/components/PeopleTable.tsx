/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Person } from '../types/Person'; // Не забудь імпортувати тип!

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const getSortParams = (field: string) => {
    if (sortField !== field) {
      return { sort: field, order: null };
    }

    if (sortOrder !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return 'fas fa-sort';
    }

    return sortOrder === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr key={person.slug} data-cy="person">
            <td>
              <a
                href={`#/people/${person.slug}`}
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
                <a
                  href={`#/people/${person.motherName.toLowerCase().replace(/ /g, '-')}`}
                >
                  {person.motherName}
                </a>
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <a
                  href={`#/people/${person.fatherName.toLowerCase().replace(/ /g, '-')}`}
                >
                  {person.fatherName}
                </a>
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
