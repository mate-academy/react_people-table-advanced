import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { useCallback, useContext, useEffect, useState } from 'react';
import { PeopleContext } from '../store/PeopleContext';
import { Loader } from '../components/Loader';
import { useLocation, useSearchParams } from 'react-router-dom';
import { GenderFilter } from '../types/GenderFilter';
import { Person } from '../types';

export const PeoplePage = () => {
  const { people, loadPeople } = useContext(PeopleContext);
  const { loading, isDataLoaded } = useContext(PeopleContext);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [filteredPeople, setFilteredPeople] = useState<Person[]>([])
  const [genderFilter, setGenderFilter] = useState<GenderFilter>(GenderFilter.All);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [appliedCentury, setAppliedCentury] = useState<string[]>([]);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  const filtersPeople = useCallback(() => {
    let filtered = people;

    if (genderFilter !== GenderFilter.All) {
      filtered = filtered.filter(person => 
        genderFilter === GenderFilter.Male
          ? person.sex === 'm'
          : person.sex === 'f'
      );
    }

    if (appliedCentury.length > 0) {
      filtered = filtered.filter(person =>
        appliedCentury.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (appliedQuery) {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(appliedQuery)
        || (person.motherName && person.motherName.toLowerCase().includes(appliedQuery))
        || (person.fatherName && person.fatherName.toLowerCase().includes(appliedQuery))
      );
    }

    setFilteredPeople(filtered);

  }, [people, genderFilter, appliedCentury, appliedQuery]);

  useEffect(() => {
    filtersPeople();
  }, [filtersPeople]);

  const handleGenderFilterChange = (filter: GenderFilter) => {
    setGenderFilter(filter);
  }

  const handleCenturyChange = (century: string) => {
    setAppliedCentury(prev => {
      let newCenturies: string[];

      if (century === 'all') {
        newCenturies = [];
      } else {
        newCenturies = prev.includes(century)
          ? prev.filter(c => c !== century)
          : [...prev, century];
      }

      const params = new URLSearchParams(searchParams.toString());

      params.delete('centuries');
      newCenturies.forEach(c => params.append('centuries', c));
      setSearchParams(params);

      return newCenturies;
    });
  };
  
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const paramsToUpdate = value ? { query: value } : { query: '' };

    setSearchParams(paramsToUpdate);
    setAppliedQuery(value);
  };

  const resetFilters = () => {
    setGenderFilter(GenderFilter.All);
    setAppliedCentury([]);
    setAppliedQuery('');
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
              genderFilter={genderFilter}
              appliedCentury={appliedCentury}
              onGenderChange={handleGenderFilterChange}
              onCenturyChange={handleCenturyChange}
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
