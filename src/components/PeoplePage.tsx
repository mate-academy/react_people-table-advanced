import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getPeople()
      .then(data => {
        const peopleWithRelations = data.map(person => ({
          ...person,
          mother: data.find(p => p.name === person.motherName),
          father: data.find(p => p.name === person.fatherName),
        }));

        setPeople(peopleWithRelations);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleFilterByQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleFilterBySex = (value: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sex', value);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  };

  const handleFilterByCenturies = (ch: string) => {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(ch)
      ? centuries.filter(century => century !== ch)
      : [...centuries, ch];

    params.delete('centuries');

    newCenturies.forEach(century => params.append('centuries', century));

    setSearchParams(params);
  };

  const handleClearCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  const handleClearAllFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    params.delete('sex');
    params.delete('query');
    setSearchParams(params);
  };

  const handleSort = (field: string) => {
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    if (currentSort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (currentOrder !== 'desc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const filteredPeople = people.filter(person => {
    const filteredByQuery =
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.toLowerCase());

    const sexFilter = searchParams.get('sex');
    const filteredBySex = sexFilter ? person.sex === sexFilter : true;

    const personCenturyFilter = Math.ceil(person.born / 100);
    const filteredByCenturies = centuries.length
      ? centuries.includes(personCenturyFilter.toString())
      : true;

    return filteredByQuery && filteredBySex && filteredByCenturies;
  });

  const sortedPeople = React.useMemo(() => {
    const sortField = searchParams.get('sort');
    const order = searchParams.get('order') === 'desc' ? -1 : 1;

    if (!sortField) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((a, b) => {
      switch (sortField) {
        case 'name':
          return a.name.localeCompare(b.name) * order;
        case 'sex':
          return a.sex.localeCompare(b.sex) * order;
        case 'born':
          return (a.born - b.born) * order;
        case 'died':
          return (a.died - b.died) * order;
        default:
          return 0;
      }
    });
  }, [filteredPeople, searchParams]);


  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && people.length > 0 && (
              <PeopleFilters
                query={query}
                centuries={centuries}
                handleFilterByQuery={handleFilterByQuery}
                handleFilterBySex={handleFilterBySex}
                handleFilterByCenturies={handleFilterByCenturies}
                searchParams={searchParams}
                handleClearCenturies={handleClearCenturies}
                handleClearAllFilters={handleClearAllFilters}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}

              {!isLoading && !error && people.length > 0 && (
                <PeopleTable people={sortedPeople} handleSort={handleSort} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
