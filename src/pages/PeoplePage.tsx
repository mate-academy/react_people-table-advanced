import { FC, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Errors } from '../Errors';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage: FC = () => {
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [peopleLoadingError, setPeopleLoadingError] = useState('');
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsPeopleLoading(true);
    setPeopleLoadingError('');

    getPeople()
      .then(data => {
        setPeople(data);

        if (data.length === 0) {
          setPeopleLoadingError(Errors.NoPeopleMessage);
        }
      })
      .catch(() => setPeopleLoadingError(Errors.PeopleLoadingError))
      .finally(() => setIsPeopleLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isPeopleLoading && <Loader />}

          {peopleLoadingError === Errors.PeopleLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {peopleLoadingError}
            </p>
          )}

          {peopleLoadingError === Errors.NoPeopleMessage && (
            <p data-cy="noPeopleMessage" className="has-text-info">
              {peopleLoadingError}
            </p>
          )}

          {!isPeopleLoading && !peopleLoadingError && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
