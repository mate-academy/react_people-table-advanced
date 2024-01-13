import { useState, useEffect } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PersonInfo } from './PersonInfo';
import { PeopleFilters } from './PeopleFilters';
import { SortTypes } from '../types/SortTypes';
import { Centuries } from '../types/Centuries';

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
  const [loadingDone, setLoadingDone] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<SortTypes>('None');
  const [sortIsReverse, setSortIsReverse] = useState(false);
  const [filterSex, setFilterSex] = useState<'All' | 'm' | 'f'>('All');
  const [filterCentury, setFilterCentury]
  = useState<Centuries[]>([]);
  const [filterQuery, setFilterQuery] = useState<string>('');

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
      setFilterSex(sex as 'All' | 'm' | 'f');
    }
  };

  const handleInput = (query: string) => {
    setFilterQuery(query);
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

  const faSortSet = (column: SortTypes) => {
    if (column === sortColumn) {
      if (sortIsReverse) {
        return 'fa-sort-down';
      }

      return 'fa-sort-up';
    }

    return 'fa-sort';
  };

  const adjustedPeople = sortAndFilter(people, sortColumn, sortIsReverse,
    filterSex, filterCentury, filterQuery);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loadingDone && <Loader />}

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
              />
            )}

          </div>
          <div className="column">

            <div className="box table-container">
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
                          <a
                            href="#/people?sort=name"
                            onClick={() => handleSortButton('Name')}
                            aria-label="sort by name"
                          >
                            <span className="icon">
                              <i className={`fas ${faSortSet('Name')}`} />
                            </span>
                          </a>
                        </span>
                      </th>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Sex
                          <a
                            href="#/people?sort=sex"
                            onClick={() => handleSortButton('Sex')}
                            aria-label="sort by name"
                          >
                            <span className="icon">
                              <i className={`fas ${faSortSet('Sex')}`} />
                            </span>
                          </a>
                        </span>
                      </th>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Born
                          <a
                            href="#/people?sort=born"
                            onClick={() => handleSortButton('Born')}
                            aria-label="sort by name"
                          >
                            <span className="icon">
                              <i className={`fas ${faSortSet('Born')}`} />
                            </span>
                          </a>
                        </span>
                      </th>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Died
                          <a
                            href="#/people?sort=died"
                            onClick={() => handleSortButton('Died')}
                            aria-label="sort by name"
                          >
                            <span className="icon">
                              <i className={`fas ${faSortSet('Died')}`} />
                            </span>
                          </a>
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
