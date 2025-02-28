import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const [searchParams] = useSearchParams();
  const activeSlug = searchParams.get('selected');

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
              <SearchLink params={{ sort: 'name' }}>
                <span className="icon">
                  <i className="fas fa-sort"></i>
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ sort: 'sex' }}>
                <span className="icon">
                  <i className="fas fa-sort"></i>
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ sort: 'born' }}>
                <span className="icon">
                  <i className="fas fa-sort"></i>
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={{ sort: 'died' }}>
                <span className="icon">
                  <i className="fas fa-sort"></i>
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
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === activeSlug,
            })}
          >
            <td>
              <SearchLink params={{ selected: person.slug }}>
                <span
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </span>
              </SearchLink>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            {/* Мати */}
            {person.motherName ? (
              people.some(p => p.name === person.motherName) ? (
                <td>
                  <SearchLink
                    className="has-text-danger"
                    params={{ selected: person.slug }}
                  >
                    {person.motherName}
                  </SearchLink>
                </td>
              ) : (
                <td>{person.motherName}</td>
              )
            ) : (
              <td>-</td>
            )}

            {/* Батько */}
            {person.fatherName ? (
              people.some(p => p.name === person.fatherName) ? (
                <td>
                  <SearchLink params={{ selected: person.slug }}>
                    {person.fatherName}
                  </SearchLink>
                </td>
              ) : (
                <td>{person.fatherName}</td>
              )
            ) : (
              <td>-</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
