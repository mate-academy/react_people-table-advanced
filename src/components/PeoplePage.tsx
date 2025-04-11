import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { CenturyFilter, SexFilter } from '../types/FiltersParam';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sexFilterBy, setSexFilterBy] = useState<SexFilter>(SexFilter.All);
  const [query, setQuery] = useState('');
  const [centuryFilterBy, setCenturyFilterBy] = useState<CenturyFilter[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = people.filter(person => {
    switch (sexFilterBy) {
      case SexFilter.Male:
        return person.sex === 'm';
      case SexFilter.Female:
        return person.sex === 'f';
      default:
      case SexFilter.All:
        return true;
    }
  })
    .filter(person => {
      const personCentery = Math.ceil(person.born / 100);

      if (!centuryFilterBy.length) {
        return true;
      }

      return centuryFilterBy.includes(personCentery);
    })
    .filter(person => {
      const normolizeQuery = query.toLowerCase();
      if (person.name.toLowerCase().includes(normolizeQuery)) {
        return true;
      }

      if (person.motherName
        && person.motherName.toLowerCase().includes(normolizeQuery)
      ) {
        return true;
      }

      if (person.fatherName
        && person.fatherName.toLowerCase().includes(normolizeQuery)
      ) {
        return true;
      }

      return false;
    })

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters
              onSexFilterBy={setSexFilterBy}
              sexFilterBy={sexFilterBy}
              onInput={setQuery}
              query={query}
              onCenturyFilterBy={setCenturyFilterBy}
              centuryFilterBy={centuryFilterBy}
            />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">There are no people on the server</p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}

              {people
                && people.length > 0
                && <PeopleTable visiblePeople={filteredPeople} currentPeople={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
