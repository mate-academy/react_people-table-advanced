import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [werePeopleLoaded, setWerePeopleLoaded] = useState(false);
  const [arePeopleLoading, setArePeopleLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchInputChange
  = (searchedPhrase: string) => {
    setSearchParams(getSearchWith(searchParams,
      { query: searchedPhrase || null }));
  };

  useEffect(() => {
    setArePeopleLoading(true);
    getPeople()
      .then((loadedPeople) => {
        setPeople(loadedPeople);
        setWerePeopleLoaded(true);
      })
      .finally(() => setArePeopleLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');
    const query = searchParams.get('query');
    let newPeople = [...people];

    if (sex) {
      newPeople = newPeople.filter(newPerson => newPerson.sex === sex);
    }

    if (centuries.length) {
      newPeople = newPeople.filter(newPerson => {
        const bornCentury = Math.ceil(newPerson.born / 100);

        return centuries
          .some(century => bornCentury === +century);
      });
    }

    if (query) {
      newPeople = newPeople
        .filter(newPerson => {
          const personName = newPerson.name.toLowerCase();
          const fatherName = newPerson.fatherName?.toLowerCase();
          const motherName = newPerson.motherName?.toLowerCase();
          const queryLowered = query.toLowerCase().trim();

          return personName.includes(queryLowered)
            || fatherName?.includes(queryLowered)
            || motherName?.includes(queryLowered);
        });
    }

    return newPeople;
  }, [searchParams, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              searchParams={searchParams}
              onSearchInputChange={handleSearchInputChange}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {arePeopleLoading && <Loader />}

              {!werePeopleLoaded && !arePeopleLoading
              && <p data-cy="peopleLoadingError">Something went wrong</p>}

              {werePeopleLoaded && Boolean(!people.length) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!filteredPeople.length
                && Boolean(people.length)
                && (
                  <p>
                    There are no people matching
                    the current search criteria
                  </p>
                )}

              {werePeopleLoaded && Boolean(filteredPeople.length)
                && (
                  <PeopleTable
                    people={filteredPeople}
                    searchParams={searchParams}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
