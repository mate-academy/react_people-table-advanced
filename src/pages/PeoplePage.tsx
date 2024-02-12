import { useEffect, useState } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { NoPeopleMessage } from '../components/NoPeople';
import { Error } from '../components/Error';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0
            && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
            )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!!error
                && !isLoading
                && <Error error={error} />}

              {people.length > 0
                && !error
                && (<PeopleTable people={people} />)}

              {!people.length
                && !isLoading
                && !error
                && <NoPeopleMessage />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
