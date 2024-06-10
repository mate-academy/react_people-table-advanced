import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleLoadingError } from '../components/PeopleLoadingError';
import { NoPeopleMessage } from '../components/NoPeopleMessage';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => setLoadingError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {loadingError && <PeopleLoadingError />}
              {!loading && !loadingError && people.length === 0 && (
                <NoPeopleMessage />
              )}
              {people.length > 0 && (
                <PeopleTable
                  people={people}
                  selectedPerson={selectedPerson}
                  setSelectedPerson={setSelectedPerson}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
