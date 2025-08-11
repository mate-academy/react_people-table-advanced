import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { useCallback, useContext, useEffect, useState } from 'react';
import { PeopleContext } from '../store/PeopleContext';
import { Loader } from '../components/Loader';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export const PeoplePage = () => {
  const { people, loadPeople } = useContext(PeopleContext);
  const { loading, isDataLoaded } = useContext(PeopleContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const gender = searchParams.get('sex') || null;

  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  const filtersPeople = useCallback(() => {
    let filtered = people;

    if (gender !== null) {
      filtered = filtered.filter(person =>
        gender === 'm'
          ? person.sex === 'm'
          : person.sex === 'f',
      );
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (query) {
      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(query)) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(query)),
      );
    }

    setFilteredPeople(filtered);
  }, [people, gender, centuries, query]);

  useEffect(() => {
    filtersPeople();
  }, [filtersPeople]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const params = new URLSearchParams(searchParams);
    params.set('query', value)

    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              query={query}
              searchParams={searchParams}
              genderFilter={gender}
              centuries={centuries}
              onQueryChange={handleQueryChange}
              resetFilters={resetFilters}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !isDataLoaded && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && isDataLoaded && people.length !== 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
