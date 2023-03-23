import { useEffect, useState } from 'react';
import { Person } from '../../../types';
import { getPeople } from '../../../utils/api';
import { preparePeople } from '../../../utils/preparePeople';
import { Loader } from '../../Loader';
import { PeopleFilters } from '../../PeopleFilter/PeopleFilters';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchPeople = async () => {
    try {
      setIsError(false);
      setIsLoad(true);
      const responce = await getPeople();

      setPeople(preparePeople(responce));
    } catch {
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const isEmptyPeople = !people.length && !isLoad && !isError;

  return (
    <div className="block">
      <div className="columns is-desktop is-flex-direction-row-reverse">
        {!!people.length && (
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
        )}

        <div className="column">
          <div className="box table-container">
            {isLoad && <Loader />}

            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {isEmptyPeople && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            {!!people.length && (
              <PeopleTable people={people} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
