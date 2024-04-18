/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import type { Person } from '../../types';
import { TitleTableHeaders } from '../../types';
import { getFilteredPeople } from '../../utils/getFilteredPeople';
import { getPreparedPeople } from '../../utils/getPreparedPeople';
import { getSortedPeople } from '../../utils/getSortedPeople';
import { getSearchWith } from '../../utils/searchHelper';
import { Loader } from '../Loader';
import { PeopleFilters } from './PeopleFilters';
import { PersonItem } from './PersonItem';
import { SearchLink } from '../SearchLink';

const DESCENDING_ORDER = 'desc';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMatchSearch, setIsMatchSearch] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(person => {
        setPeople(person);
      })
      .catch(() => {
        setIsError(true);
        setTimeout(() => setIsError(false), 3000);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  const showTable = !isLoading && !isError && isMatchSearch;
  const showSideBar = !isLoading && !isError;
  const showPlaceHolderMatch = !isMatchSearch && !isLoading && !isError;

  const setSearchWith = (params: Record<string, string | null>) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (selectQuery: string) => {
    setSearchWith({ query: selectQuery });
  };

  const handleSexChange = (selectSex: string | null) => {
    setSearchWith({ sex: selectSex });
  };

  const toggleCenturies = (selectCentury: string) => {
    return centuries.includes(selectCentury)
      ? centuries.filter(century => century !== selectCentury)
      : [...centuries, selectCentury];
  };

  const handleSortChange = (sortBy: string) => {
    const isSelected = sortBy === sort;

    if ((!sort && !order) || !isSelected) {
      return { sort: sortBy, order: null };
    }

    if (sort && !order && isSelected) {
      return { sort: sortBy, order: DESCENDING_ORDER };
    }

    if (sort && order) {
      return { sort: null, order: null };
    }

    return { sort: null, order: null };
  };

  const preparedPeople = getPreparedPeople(people);

  const sortedPeople = useMemo(() => {
    return getSortedPeople(preparedPeople, sort, order);
  }, [order, preparedPeople, sort]);

  const visiblePeople = useMemo(() => {
    return getFilteredPeople(sortedPeople, query, sex, centuries);
  }, [centuries, query, sex, sortedPeople]);

  useEffect(() => {
    if (!visiblePeople.length) {
      setIsMatchSearch(false);
    } else {
      setIsMatchSearch(true);
    }
  }, [visiblePeople]);

  return (
    <div className="block">
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          {showSideBar && (
            <PeopleFilters
              searchState={{
                query,
                sex,
                centuries,
                handleQueryChange,
                handleSexChange,
                toggleCenturies,
              }}
            />
          )}
        </div>

        <div className="column">
          <div className="box table-container">
            {isLoading && <Loader />}

            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!people.length && !isLoading && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {showPlaceHolderMatch && (
              <p>There are no people matching the current search criteria</p>
            )}

            {showTable && (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    {Object.entries(TitleTableHeaders).map(([key, value]) => {
                      const isSortedOption =
                        value !== TitleTableHeaders.mother &&
                        value !== TitleTableHeaders.father;

                      return isSortedOption ? (
                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            {value}
                            <SearchLink params={handleSortChange(key)}>
                              <span className="icon">
                                <i
                                  className={classNames('fas', {
                                    'fa-sort': sort !== key,
                                    'fa-sort-up': !order && sort === key,
                                    'fa-sort-down': order && sort === key,
                                  })}
                                />
                              </span>
                            </SearchLink>
                          </span>
                        </th>
                      ) : (
                        <th key={key}>{value}</th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody>
                  {visiblePeople.map(person => (
                    <PersonItem key={person.slug} person={person} />
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
