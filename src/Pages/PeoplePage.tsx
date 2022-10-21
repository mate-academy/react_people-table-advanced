import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { NoPeopleError } from '../components/NoPeopleError';
import { ConnectionError } from '../components/ConnectionError';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { slug = '' } = useParams();
  const [loading, setLoading] = useState(true);
  const [dropError, setDropError] = useState(false);

  const readyToLoad = !loading && !dropError;

  useEffect(() => {
    getPeople()
      .then(res => setPeople(res))
      .catch(() => setDropError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (dropError) {
    return <ConnectionError />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {readyToLoad && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {readyToLoad && !people.length && (
                <NoPeopleError />
              )}

              {readyToLoad && people.length && (
                <PeopleTable
                  people={people}
                  selectedPerson={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
