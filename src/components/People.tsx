import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PersonInfo } from './PersonInfo';
import { PeopleFilters } from './PeopleFilters';
import { SortTypes } from '../types/SortTypes';
import { Centuries } from '../types/Centuries';
import { SearchLink } from './SearchLink';
import { Sex } from '../types/Sex';

function sortAndFilter(
  people: Person[],
  sortColumn: SortTypes,
  sortIsReverse: boolean,
  filterSex: string,
  filterCentury: string[],
  filterQuery: string,
) {
  const newPeople = people
    .filter((p) => (p.sex === filterSex || filterSex === 'All')
    && (filterCentury
      .includes(Math.ceil(p.born / 100).toString())
      || filterCentury.length === 0)
    && (p.name.toLowerCase().includes(filterQuery.toLowerCase())
    || p.motherName?.toLowerCase().includes(filterQuery.toLowerCase())
    || p.fatherName?.toLowerCase().includes(filterQuery.toLowerCase())));

  switch (sortColumn) {
    case 'Name':
      newPeople.sort((p1, p2) => p1.name.localeCompare(p2.name));
      break;
    case 'Sex':
      newPeople.sort((p1, p2) => p1.sex.localeCompare(p2.sex));
      break;
    case 'Born':
      newPeople.sort((p1, p2) => p1.born - p2.born);
      break;
    case 'Died':
      newPeople.sort((p1, p2) => p1.died - p2.died);
      break;
    default:
      break;
  }

  if (sortIsReverse === true) {
    newPeople.reverse();
  }

  return newPeople;
}

export const People = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loadingDone, setLoadingDone] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<SortTypes>('None');
  const [sortIsReverse, setSortIsReverse] = useState(searchParams
    .get('order') === 'desc');
  const [filterSex, setFilterSex] = useState<Sex>(searchParams
    .get('sex') as Sex || 'All');
  const [filterCentury, setFilterCentury]
  = useState<Centuries[]>(searchParams
    .getAll('centuries') as Centuries[] || []);
  const [filterQuery, setFilterQuery] = useState<string>(searchParams
    .get('query') || '');

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        const newPeople = peopleFromServer.map(person => {
          const newPerson = { ...person };

          newPerson.mother = peopleFromServer
            .find(p => p.name === person.motherName);

          newPerson.father = peopleFromServer
            .find(p => p.name === person.fatherName);

          return newPerson;
        });

        setPeople(newPeople);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoadingDone(true));
  }, []);

  const handleCenturyButton = (century:string) => {
    if (century === 'All') {
      setFilterCentury([]);
    } else if (filterCentury.includes(century as Centuries)) {
      setFilterCentury((prev) => prev.filter(c => c !== century));
    } else {
      setFilterCentury((prev) => [...prev, century as Centuries]);
    }
  };

  const handleSexLink = (sex:string) => {
    if (sex !== filterSex) {
      setFilterSex(sex as Sex);
    }
  };

  const handleInput = (queryString: string) => {
    setFilterQuery(queryString);
    const search = getSearchWith(searchParams, { query: queryString || null });

    setSearchParams(search);
  };

  const handleSortButton = (column: SortTypes) => {
    if (column === sortColumn) {
      if (sortIsReverse) {
        setSortIsReverse(false);
        setSortColumn('None');
      } else {
        setSortIsReverse(true);
      }
    } else {
      setSortColumn(column);
      setSortIsReverse(false);
    }
  };

  const handleResetButton = () => {
    setSortColumn('None');
    setSortIsReverse(false);
    setFilterSex('All');
    setFilterCentury([]);
    setFilterQuery('');
  };

  const faSortSet = (column: SortTypes) => {
    if (column === sortColumn) {
      if (sortIsReverse) {
        return 'fa-sort-down';
      }

      return 'fa-sort-up';
    }

    return 'fa-sort';
  };

  const getSortParam = (column: string) => {
    if (column === sortColumn.toLowerCase()) {
      if (sortIsReverse) {
        return null;
      }

      return column;
    }

    return column;
  };

  const getOrderParam = (column: string) => {
    if (column === sortColumn.toLowerCase()) {
      if (sortIsReverse) {
        return null;
      }

      return 'desc';
    }

    return null;
  };

  const adjustedPeople = sortAndFilter(people, sortColumn, sortIsReverse,
    filterSex, filterCentury, filterQuery);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {(loadingDone && people.length > 0)
            && (
              <PeopleFilters
                handleCenturyButton={handleCenturyButton}
                filterCentury={filterCentury}
                handleSexLink={handleSexLink}
                filterSex={filterSex}
                handleInput={handleInput}
                filterQuery={filterQuery}
                handleResetButton={handleResetButton}
              />
            )}

          </div>
          <div className="column">

            <div className="box table-container">
              {!loadingDone && <Loader />}
              {errorMessage
              && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {(loadingDone && people.length === 0) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(loadingDone && adjustedPeople.length === 0
              && people.length > 0) && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {(loadingDone && adjustedPeople.length > 0) && (
                <table
                  data-cy="peopleTable"
                  className="table is-striped
                  is-hoverable is-narrow is-fullwidth"
                >
                  <thead>
                    <tr>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Name
                          <SearchLink
                            params={{
                              sort: getSortParam('name'),
                              order: getOrderParam('name'),
                            }}
                            onClick={() => handleSortButton('Name')}
                            aria-label="sort by name"
                          >
                            <span className="icon">
                              <i className={`fas ${faSortSet('Name')}`} />
                            </span>
                          </SearchLink>
                        </span>
                      </th>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Sex
                          <SearchLink
                            params={{
                              sort: getSortParam('sex'),
                              order: getOrderParam('sex'),
                            }}
                            onClick={() => handleSortButton('Sex')}
                            aria-label="sort by name"
                          >
                            <span className="icon">
                              <i className={`fas ${faSortSet('Sex')}`} />
                            </span>
                          </SearchLink>
                        </span>
                      </th>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Born
                          <SearchLink
                            params={{
                              sort: getSortParam('born'),
                              order: getOrderParam('born'),
                            }}
                            onClick={() => handleSortButton('Born')}
                            aria-label="sort by name"
                          >
                            <span className="icon">
                              <i className={`fas ${faSortSet('Born')}`} />
                            </span>
                          </SearchLink>
                        </span>
                      </th>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Died
                          <SearchLink
                            params={{
                              sort: getSortParam('died'),
                              order: getOrderParam('died'),
                            }}
                            onClick={() => handleSortButton('Died')}
                            aria-label="sort by name"
                          >
                            <span className="icon">
                              <i className={`fas ${faSortSet('Died')}`} />
                            </span>
                          </SearchLink>
                        </span>
                      </th>
                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adjustedPeople.map(person => {
                      return (
                        <PersonInfo
                          person={person}
                          key={person.slug}
                        />
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
