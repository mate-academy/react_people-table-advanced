import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import * as postService from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import debounce from 'lodash.debounce';
import { GenderFilter } from '../enums/Filters';

type Filter = GenderFilter;

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPerson, setFilteredPerson] = useState<Person[] | null>(null);

  const [genderFilter, setGenderFilter] = useState<Filter>(GenderFilter.ALL);
  const [centuryFilter, setCenturyFilter] = useState<string[]>([]);
  const [appliedQuery, setAppliedQuery] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const loadPeople = useCallback(() => {
    setLoading(true);
    setError(false);

    return postService
      .getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  const applyFilters = useCallback(() => {
    let filtered = people;

    if (genderFilter !== GenderFilter.ALL) {
      filtered = filtered.filter(person =>
        genderFilter === GenderFilter.MALE
          ? person.sex === 'm'
          : person.sex === 'f',
      );
    }

    if (centuryFilter.length > 0) {
      filtered = filtered.filter(person =>
        centuryFilter.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (appliedQuery) {
      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(appliedQuery) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(appliedQuery)) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(appliedQuery)),
      );
    }

    setFilteredPerson(filtered);
  }, [people, genderFilter, centuryFilter, appliedQuery]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (filter: Filter) => {
    setGenderFilter(filter);
  };

  const handleCenturyChange = (century: string) => {
    setCenturyFilter(prev => {
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

  const applyQuery = useCallback(debounce(setAppliedQuery, 300), []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const paramsToUpdate = value ? { query: value } : { query: '' };

    setSearchParams(paramsToUpdate);
    applyQuery(value);
  };

  const resetAllFilters = () => {
    setGenderFilter(GenderFilter.ALL);
    setCenturyFilter([]);
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
              handleQueryChange={handleQueryChange}
              handleFilterChange={handleFilterChange}
              genderFilter={genderFilter}
              handleCenturyChange={handleCenturyChange}
              searchParams={searchParams}
              centuryFilter={centuryFilter}
              resetAllFilters={resetAllFilters}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {error && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {!people.length && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  <p>
                    There are no people matching the current search criteria
                  </p>

                  <PeopleTable people={filteredPerson} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
