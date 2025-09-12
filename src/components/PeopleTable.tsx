import { useLocation } from 'react-router-dom';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

interface PeopleTableProps {
  people: Person[];
  isLoading: boolean;
  error: boolean;
  isFiltered: boolean;
  sort: string;
  order: string | null;
}

type SortKey = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  isLoading,
  error,
  isFiltered,
  sort,
  order,
}) => {
  const location = useLocation();

  const getSortParams = (key: SortKey) => {
    if (sort !== key) {
      return { sort: key, order: null };
    }

    if (order === null) {
      return { sort: key, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getIconClass = (key: SortKey) => {
    if (sort !== key) {
      return 'fa-sort';
    }

    if (order === 'desc') {
      return 'fa-sort-down';
    }

    return 'fa-sort-up';
  };

  return (
    <div className="block">
      <div className="box table-container">
        {!isLoading && !error && people.length === 0 && isFiltered && (
          <p data-cy="noSearchResults">
            There are no people matching the current search criteria
          </p>
        )}

        {!isLoading && !error && people.length === 0 && !isFiltered && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {isLoading ? (
          <Loader />
        ) : (
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
                        <i
                          className={classNames('fas', getIconClass('name'))}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink params={getSortParams('sex')}>
                      <span className="icon">
                        <i className={classNames('fas', getIconClass('sex'))} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink params={getSortParams('born')}>
                      <span className="icon">
                        <i
                          className={classNames('fas', getIconClass('born'))}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SearchLink params={getSortParams('died')}>
                      <span className="icon">
                        <i
                          className={classNames('fas', getIconClass('died'))}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {people.map(person => {
                const mother =
                  people.find(p => p.name === person.motherName) || null;
                const father =
                  people.find(p => p.name === person.fatherName) || null;

                return (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={classNames({
                      'has-background-warning':
                        location.pathname === `/people/${person.slug}`,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.motherName ? (
                        mother ? (
                          <PersonLink person={mother} />
                        ) : (
                          <span>{person.motherName}</span>
                        )
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td>
                      {person.fatherName ? (
                        father ? (
                          <PersonLink person={father} />
                        ) : (
                          <span>{person.fatherName}</span>
                        )
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
