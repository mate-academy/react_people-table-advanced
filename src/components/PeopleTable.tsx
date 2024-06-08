/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  preparedPeople: Person[];
  sortedBy: string;
};

enum Sort {
  name = 'name',
  sex = 'sex',
  born = 'born',
  died = 'died',
}

export const PeopleTable: React.FC<Props> = ({ preparedPeople, sortedBy }) => {
  const { slug } = useParams();

  const handleSorting = (options: Sort) => {
    switch (options) {
      case Sort.name:
        if (sortedBy === 'name') {
          return 'nameRev';
        }

        if (sortedBy === 'nameRev') {
          return '';
        }

        return 'name';

      case Sort.sex:
        if (sortedBy === 'sex') {
          return 'sexRev';
        }

        if (sortedBy === 'sexRev') {
          return '';
        }

        return 'sex';

      case Sort.born:
        if (sortedBy === 'born') {
          return 'bornRev';
        }

        if (sortedBy === 'bornRev') {
          return '';
        }

        return 'born';

      case Sort.died:
        if (sortedBy === 'died') {
          return 'diedRev';
        }

        if (sortedBy === 'diedRev') {
          return '';
        }

        return 'died';
    }
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
              <SearchLink params={{ sortedBy: handleSorting(Sort.name) }}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortedBy !== 'name' && sortedBy !== 'nameRev',
                      'fa-sort-up': sortedBy === 'name',
                      'fa-sort-down': sortedBy === 'nameRev',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ sortedBy: handleSorting(Sort.sex) }}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortedBy !== 'sex' && sortedBy !== 'sexRev',
                      'fa-sort-up': sortedBy === 'sex',
                      'fa-sort-down': sortedBy === 'sexRev',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ sortedBy: handleSorting(Sort.born) }}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortedBy !== 'born' && sortedBy !== 'bornRev',
                      'fa-sort-up': sortedBy === 'born',
                      'fa-sort-down': sortedBy === 'bornRev',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={{ sortedBy: handleSorting(Sort.died) }}>
                <i
                  className={classNames('fas', {
                    'fa-sort': sortedBy !== 'died' && sortedBy !== 'diedRev',
                    'fa-sort-up': sortedBy === 'died',
                    'fa-sort-down': sortedBy === 'diedRev',
                  })}
                />
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
            key={person.slug}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
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

            <td>
              {person.mother ? (
                <Link
                  to={`/people/${person.mother.slug}`}
                  className="has-text-danger"
                >
                  {person.motherName}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.father ? (
                <Link to={`/people/${person.father.slug}`}>
                  {person.fatherName}
                </Link>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
