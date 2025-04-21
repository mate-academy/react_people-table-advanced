import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { InfoBlock } from '../components/InfoBlock';
import { useEffect, useState } from 'react';
import { connectParents } from '../utils/connectParents';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { filter } from '../utils/filters';

export const PeoplePage = () => {
  const [peopleFromApi, setPeopleFromApi] = useState<Person[]>([]);
  const [shownPeople, setShownPeople] = useState<Person[]>([]);
  const [hasError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const params = useSearchParams()[0];

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(people => {
        setPeopleFromApi(people.map(connectParents));
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setShownPeople(filter(peopleFromApi, params));
  }, [peopleFromApi, params]);

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
              <InfoBlock
                isLoading={isLoading}
                hasError={hasError}
                isEmpty={peopleFromApi.length === 0}
                isFilteredOut={
                  shownPeople.length === 0 && peopleFromApi.length !== 0
                }
              />
              {shownPeople.length !== 0 && <PeopleTable people={shownPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
