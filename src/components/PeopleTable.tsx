import { Person } from '../types/Person';
import { Loader } from '../components/Loader/Loader';
import { PersonLink } from '../components/PersonLink';
import { useLocation, useSearchParams } from 'react-router-dom';
import { filterPeople } from '../utils/getFilteredPeople';
import { SearchLink } from './SearchLink';
import { getSortedPeople } from '../utils/getSortedPeople';
import classNames from 'classnames';

interface Props {
  people: Person[];
  isLoading: boolean;
  hasError: boolean;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  hasError,
}) => {
  const { search } = useLocation();
  const [searchParams] = useSearchParams(search);

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortToggle = (sortBy: string) => {
    if (sortBy === sort && order) {
      return {
        sort: null,
        order: null,
      };
    }

    if (sortBy === sort) {
      return {
        sort: sortBy,
        order: 'desc',
      };
    }

    return {
      sort: sortBy,
      order: null,
    };
  };

  const filteredPeople = filterPeople(people, searchParams);

  const visiblePeople = getSortedPeople(filteredPeople, searchParams);

  return (
    <div className="column">
      <div className="box table-container">
        {isLoading && <Loader />}
        {hasError && !isLoading && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people.length === 0 && !isLoading && !hasError && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {visiblePeople.length === 0 && !isLoading && (
          <p>There are no people matching the current search criteria</p>
        )}

        {visiblePeople.length !== 0 && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <SearchLink params={sortToggle('name')}>
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sort !== 'name',
                            'fa-sort-up': sort === 'name' && !order,
                            'fa-sort-down': sort === 'name' && order === 'desc',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink params={sortToggle('sex')}>
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sort !== 'sex',
                            'fa-sort-up': sort === 'sex' && !order,
                            'fa-sort-down': sort === 'sex' && order === 'desc',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink params={sortToggle('born')}>
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sort !== 'born',
                            'fa-sort-up': sort === 'born' && !order,
                            'fa-sort-down': sort === 'born' && order === 'desc',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SearchLink params={sortToggle('died')}>
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort': sort !== 'died',
                            'fa-sort-up': sort === 'died' && !order,
                            'fa-sort-down': sort === 'died' && order === 'desc',
                          })}
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
              {visiblePeople.map((person: Person) => {
                return (
                  <PersonLink
                    person={person}
                    people={people}
                    key={person.slug}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
