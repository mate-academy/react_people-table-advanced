import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [wasLoaded, setWasLoaded] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(people => {
        setPeopleFromServer(people);
        setWasLoaded(true);
      })
      .catch(() => setHasLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredSex = searchParams.get('sex');
  const filteredCenturies = searchParams.getAll('centuries');
  const filteredQuery = searchParams.get('query');

  const filteredByGender = filteredSex
    ? peopleFromServer.filter(({ sex }) => sex === filteredSex)
    : peopleFromServer;

  const filteredByCentury = filteredCenturies.length
    ? filteredByGender.filter(({ born }) => {
      const century = Math.ceil(born / 100);

      return filteredCenturies.includes(String(century));
    })
    : filteredByGender;

  const filteredByQuery = filteredQuery
    ? filteredByCentury.filter(({ name }) => name.toLocaleLowerCase()
      .includes(filteredQuery.toLowerCase().trim()))
    : filteredByCentury;

  const sort = searchParams.get('sort');
  const isReversed = searchParams.get('order');

  const sortedPeople = filteredByQuery.sort((a, b) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return a[sort].localeCompare(b[sort]);
      case 'born':
      case 'died':
        return a[sort] - b[sort];

      default:
        return 0;
    }
  });

  const displayedPeople = isReversed ? sortedPeople.reverse() : sortedPeople;

  const hasNoPeople = wasLoaded && peopleFromServer.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">

              <PeopleTable
                isLoading={isLoading}
                hasNoPeople={hasNoPeople}
                hasLoadingError={hasLoadingError}
                displayedPeople={displayedPeople}
              />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
