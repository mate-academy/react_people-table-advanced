/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || 'all';
  const centuries = searchParams.getAll('centuries') || [];

  function filter() {
    const preparedPeople = [...people];

    const queryFiltered = preparedPeople.filter(person =>
      person.name?.toLowerCase().includes(query),
    );

    if (sex === 'all') {
      return queryFiltered;
    } else {
      return queryFiltered.filter(person => person.sex === sex);
    }
  }

  const filteredPeople = useMemo(() => {
    return filter();
  }, [sex, people, query]);

  const sexFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sex', value);
    setSearchParams(params);
  };

  const queryFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', e.target.value);
    setSearchParams(params);
  };

  const chooseCenturies = (n: string) =>
    centuries.includes(n)
      ? centuries.filter(century => century !== n)
      : [...centuries, n];

  // console.log(centuries);

  const allCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  // const chooseCenturies = (century: string) => {
  //   const params = new URLSearchParams(searchParams);

  //   if (centuries.includes(century)) {
  //     params.delete('centuries', century);
  //   } else {
  //     params.append('centuries', century);
  //   }

  //   setSearchParams(params);
  // };

  // const [filteredPeople, setFilteredPeople] = useState(people);
  // const [query, setQuery] = useState('');
  // const [years, setYears] = useState<number[]>([]);

  // const yearsFilter = () => {
  //   if (years.length > 0) {
  //     const filtered = filteredPeople.filter(person => {
  //       const firstTwoDiget = String(person.born).slice(0, 2);

  //       return years.includes(+firstTwoDiget);
  //     });

  //     setFilteredPeople(filtered);
  //   } else {
  //     setFilteredPeople(filteredPeople);
  //   }
  // };

  // const addOrRemoveYear = (n: number) => {
  //   if (years.includes(n)) {
  //     const updatedYears = years.filter(num => num !== n);

  //     setYears(updatedYears);
  //     yearsFilter();
  //   } else {
  //     const updatedYear = [...years, n];

  //     setYears(updatedYear);
  //     yearsFilter();
  //   }
  // };

  // useEffect(() => {
  //   yearsFilter();
  // }, [years]);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              query={query}
              people={filteredPeople}
              sexFilter={sexFilter}
              queryFilter={queryFilter}
              chooseCenturies={chooseCenturies}
              allCenturies={allCenturies}
              centuries={centuries}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              <div className="box table-container">
                {loading && <Loader />}

                {error && !loading && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {error}
                  </p>
                )}

                {!people.length && !loading && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {!loading && <PeopleTable people={filteredPeople} />}
              </div>
              <p>There are no people matching the current search criteria</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
