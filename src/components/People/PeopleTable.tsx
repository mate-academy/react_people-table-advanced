/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import type { Person } from '../../types';
import { TitleTableHeaders } from '../../types';
import { getPreparedPeople } from '../../utils/getPreparedPeople';
import { getSearchWith } from '../../utils/searchHelper';
import { Loader } from '../Loader';
import { PeopleFilters } from './PeopleFilters';
import { PersonItem } from './PersonItem';
import { SearchLink } from '../SearchLink';

const DESCENDING_ORDER = 'desc';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
  const centuries = searchParams.getAll('centuries') || [];

  const showTable = !isLoading && !isError;
  const showSideBar = !isLoading && !isError;

  const setSearchWith = (params: any) => {
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

  const getSortedPeople = () => {
    let sortedPeople = [...preparedPeople];

    if (sort) {
      const normalizedSort = sort.charAt(0).toUpperCase() + sort.slice(1);

      switch (normalizedSort) {
        case TitleTableHeaders.name:
        case TitleTableHeaders.sex:
          sortedPeople = sortedPeople.sort((person1, person2) =>
            person1[sort].localeCompare(person2[sort]),
          );
          break;
        case TitleTableHeaders.born:
        case TitleTableHeaders.died:
          sortedPeople = sortedPeople.sort(
            (person1, person2) => person1.born - person2.born,
          );
          break;
        default:
          break;
      }
    }

    if (order) {
      sortedPeople = sortedPeople.reverse();
    }

    return [...sortedPeople];
  };

  const sortedPeople = getSortedPeople();

  const getFilteredPeople = () => {
    let filteredPeople = [...sortedPeople];

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      filteredPeople = filteredPeople.filter(person => {
        const normalizedName = person.name.toLowerCase().trim();
        const normalizedFatherName = person.fatherName?.toLowerCase().trim();
        const normalizedMotherName = person.motherName?.toLowerCase().trim();

        return (
          normalizedName.includes(normalizedQuery) ||
          normalizedFatherName?.includes(normalizedQuery) ||
          normalizedMotherName?.includes(normalizedQuery)
        );
      });
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (!!centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      });
    }

    return filteredPeople;
  };

  const visiblePeople = getFilteredPeople();

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
