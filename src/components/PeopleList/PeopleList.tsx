import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleItem } from '../PeopleItem/PeopleItem';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';
import { SearchLink } from '../SearchLink';
import { SortFields } from '../../types/sortField';
import { getFilteredPeople, sortPeople } from '../../utils/getPreparedPeople';
import cn from 'classnames';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex');
  const sortBy = searchParams.get('sort') as SortFields;
  const order = searchParams.get('order');
  const { slug } = useParams();

  const filteredSettings = {
    query,
    centuries,
    sex,
  };

  const handleChangeSort = (sortType: SortFields) => {
    if (sortType === sortBy && order) {
      return { sort: null, order: null };
    }

    if (sortType === sortBy) {
      return { sort: sortType, order: 'desc' };
    }

    return { sort: sortType, order: null };
  };

  const applyArrowStyles = (arrowValue: string) => {
    if (arrowValue === sortBy) {
      return cn('fas', {
        'fa-sort-up': !!sortBy && !order,
        'fa-sort-down': !!order,
      });
    }

    return cn('fas fa-sort');
  };

  const fatchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const peopleData = await getPeople();

      setPeople(peopleData);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fatchData();
  }, []);

  const visiblePeople = sortBy
    ? getFilteredPeople(sortPeople(people, sortBy, order), filteredSettings)
    : getFilteredPeople(people, filteredSettings);

  return (
    <div className="block">
      <div className="columns is-desktop is-flex-direction-row-reverse">
        {!isLoading && !isError && people && (
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
        )}

        <div className="column">
          <div className="box table-container">
            {isLoading && <Loader />}

            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {people.length === 0 && !isLoading && !isError && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {visiblePeople.length === 0 && isLoading && isError && (
              <p>There are no people matching the current search criteria</p>
            )}

            {!isLoading && !isError && (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Name
                        <SearchLink params={handleChangeSort(SortFields.Name)}>
                          <span className="icon">
                            <i
                              className={cn(applyArrowStyles(SortFields.Name))}
                            />
                          </span>
                        </SearchLink>
                      </span>
                    </th>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Sex
                        <SearchLink params={handleChangeSort(SortFields.Sex)}>
                          <span className="icon">
                            <i
                              className={cn(applyArrowStyles(SortFields.Sex))}
                            />
                          </span>
                        </SearchLink>
                      </span>
                    </th>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Born
                        <SearchLink params={handleChangeSort(SortFields.Born)}>
                          <span className="icon">
                            <i
                              className={cn(applyArrowStyles(SortFields.Born))}
                            />
                          </span>
                        </SearchLink>
                      </span>
                    </th>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Died
                        <SearchLink params={handleChangeSort(SortFields.Died)}>
                          <span className="icon">
                            <i
                              className={cn(applyArrowStyles(SortFields.Died))}
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
                  {visiblePeople.map(person => (
                    <PeopleItem
                      person={person}
                      key={person.slug}
                      people={people}
                      slug={slug}
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
