import {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);
  const [search] = useSearchParams();
  const searchSex = search.get('sex');
  const query = search.get('query') || '';
  const choiceCenturies = search.getAll('centuries');
  const sort = search.get('sort');
  const order = search.get('order');

  const loadPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setIsLoadError(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadPeople();
  }, []);

  const visiblePeople = useMemo(() => people.filter(({
    name, sex, born,
  }) => {
    const filterSex = searchSex === sex || searchSex === null;

    const lowerName = name.toLowerCase();
    const lowerQuery = query.toLowerCase().trim();
    const filterName = lowerName.includes(lowerQuery);

    const personCenturies = Math.round(born / 100).toString();
    const filterCenturies = choiceCenturies.length === 0
      || choiceCenturies.includes(personCenturies);

    return filterSex && filterName && filterCenturies;
  }), [searchSex, query, choiceCenturies]);

  if (sort) {
    visiblePeople.sort((person1, person2) => {
      switch (sort) {
        case 'born':
          return person1[sort] - person2[sort];
        case 'died':
          return person1[sort] - person2[sort];
        case 'name':
          return person1[sort].localeCompare(person2[sort]);
        case 'sex':
          return person1[sort].localeCompare(person2[sort]);
        default:
          return 0;
      }
    });
  }

  if (order) {
    visiblePeople.reverse();
  }

  const arePeople = people.length > 0;
  const areVisiblePeople = visiblePeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && isLoadError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !arePeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !areVisiblePeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && areVisiblePeople && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
