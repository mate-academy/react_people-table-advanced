import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Filter } from '../utils/filter';
import { Gender } from '../utils/sex';

type Props = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
};

export const PeoplePage: React.FC<Props> = ({ people, setPeople }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [IsLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const handleQChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const queryValue = event.target.value.trim();

    setQuery(queryValue);

    const params = new URLSearchParams(searchParams);

    if (queryValue) {
      params.set('query', queryValue);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const searchPerson = people.filter(person =>
    person.name.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [setPeople]);

  const filteredPeople = useMemo(() => {
    const selectedCenturies = searchParams.getAll('centuries').map(Number);

    return searchPerson.filter(person => {
      const personCentury = Math.ceil(person.born / 100);

      const filterMatches =
        filter === Filter.male
          ? person.sex === Gender.Male
          : filter === Filter.female
            ? person.sex === Gender.Female
            : true;

      const centuryMatches =
        selectedCenturies.length === 0 ||
        selectedCenturies.includes(personCentury);

      return filterMatches && centuryMatches;
    });
  }, [searchPerson, filter, searchParams]);

  return (
    <>
      {IsLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="title">People Page</h1>
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters
                  onFilterChange={setFilter}
                  filter={filter}
                  handleQChange={handleQChange}
                  query={query}
                />
              </div>
              <div className="column">
                <div className="box table-container">
                  {error && <p data-cy="peopleLoadingError">{error}</p>}

                  {!error && people.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  {!error && filteredPeople.length === 0 && query && (
                    <p data-cy="noMatchingPeopleMessage">
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {!error && filteredPeople.length > 0 && (
                    <PeopleTable people={filteredPeople} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
