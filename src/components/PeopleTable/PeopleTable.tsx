import { useEffect, useMemo, useState } from 'react';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PersonRow } from '../PersonRow';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';
import { useFilters } from '../../context/FiltersContext';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';
import { getPreparedPeople } from '../../utils/preparedPeople';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const { searchParams } = useFilters();
  const currentSort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(result => {
        setPeople(result);
        setInitialLoad(false);
      })
      .catch(() => {
        setError(true);
        setInitialLoad(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    const options = {
      query: searchParams.get('query') || '',
      sex: searchParams.get('sex') || '',
      centuries: searchParams.getAll('century'),
      sort: searchParams.get('sort') || '',
      order: searchParams.get('order') || '',
    };

    return getPreparedPeople(people, options);
  }, [people, searchParams]);

  const getSortOption = (sortOption: string) => {
    if (sortOption !== currentSort) {
      return { sort: sortOption, order: null };
    }

    if (sortOption === currentSort && !order) {
      return { sort: sortOption, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortClass = (sortOption: string) => {
    return cn('fas', {
      'fa-sort': sortOption !== currentSort,
      'fa-sort-up': sortOption == currentSort && !order,
      'fa-sort-down': sortOption == currentSort && !!order,
    });
  };

  const { slug } = useParams();

  return (
    <div className="block">
      <div className="columns is-desktop is-flex-direction-row-reverse">
        {!loading && !error && people.length > 0 && (
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
        )}

        <div className="column">
          <div className="box table-container">
            {loading && <Loader />}

            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!error && !loading && !initialLoad && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!error &&
              !loading &&
              !initialLoad &&
              visiblePeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

            {!error && !loading && visiblePeople.length > 0 && (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Name
                        <SearchLink params={getSortOption('name')}>
                          <span className="icon">
                            <i className={getSortClass('name')} />
                          </span>
                        </SearchLink>
                      </span>
                    </th>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Sex
                        <SearchLink params={getSortOption('sex')}>
                          <span className="icon">
                            <i className={getSortClass('sex')} />
                          </span>
                        </SearchLink>
                      </span>
                    </th>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Born
                        <SearchLink params={getSortOption('born')}>
                          <span className="icon">
                            <i className={getSortClass('born')} />
                          </span>
                        </SearchLink>
                      </span>
                    </th>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Died
                        <SearchLink params={getSortOption('died')}>
                          <span className="icon">
                            <i className={getSortClass('died')} />
                          </span>
                        </SearchLink>
                      </span>
                    </th>
                    <th>Mother</th>
                    <th>Father</th>
                  </tr>
                </thead>

                <tbody>
                  {visiblePeople.map(person => (
                    <PersonRow
                      key={person.slug}
                      person={person}
                      slug={slug}
                      people={people}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
