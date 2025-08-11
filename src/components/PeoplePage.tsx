import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useMemo } from 'react';

export const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [peoples, setPeoples] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [errorType, setErrorType] = useState(false);

  const sortOrder = searchParams.get('order') || null;
  const sortBy = searchParams.get('sort') || null;
  const genderFilter = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = useMemo(() => {
    return searchParams.getAll('centuries').map(Number);
  }, [searchParams]);

  const sortedPeople = useMemo(() => {
    let filtered = [...peoples];

    if (genderFilter === 'm') {
      filtered = filtered.filter(person => person.sex === 'm');
    } else if (genderFilter === 'f') {
      filtered = filtered.filter(person => person.sex === 'f');
    }

    if (query.length >= 0) {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      );
    }


    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const century = Math.ceil(person.born / 100);

        return centuries.includes(century);
      });
    }


    if (sortBy && sortOrder) {
      filtered.sort((a, b) => {
        let result = 0;

        if (sortBy === 'name') {
          result = a.name.localeCompare(b.name);
        } else if (sortBy === 'sex') {
          result = a.sex.localeCompare(b.sex);
        } else if (sortBy === 'born') {
          result = a.born - b.born;
        } else if (sortBy === 'died') {
          result = a.died - b.died;
        }

        return sortOrder === 'asc' ? result : -result;
      });
    }

    return filtered;
  }, [peoples, sortBy, sortOrder, genderFilter, query, centuries]);

  useEffect(() => {
    setErrorType(false);
    setIsloading(true);
    getPeople()
      .then(data => {
        const cleaned = data.map(person => ({
          ...person,
          name: person.name.trim(),
          motherName: person.motherName?.trim(),
          fatherName: person.fatherName?.trim(),
        }));

        setPeoples(cleaned);
      })
      .catch(() => {
        setErrorType(true);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <h1 className="title">People Page</h1>

          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                {!isLoading && (
                  <PeopleFilters
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    genderFilter={genderFilter}
                    centuries={centuries}
                    query={query}
                  />
                )}
              </div>

              <div className="column">
                <div className="box table-container">
                  {isLoading && <Loader />}

                  {errorType && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {peoples.length === 0 && !isLoading && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {query.length !== 0 && sortedPeople.length === 0 && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}
                  {!isLoading && sortedPeople.length > 0 && (
                    <PeopleTable
                      searchParams={searchParams}
                      setSearchParams={setSearchParams}
                      sortBy={sortBy}
                      peoples={peoples}
                      sortOrder={sortOrder}
                      sortPeople={sortedPeople}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
