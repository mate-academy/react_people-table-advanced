import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [isErrorMessageShow, setIsErrorMessageShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    setIsErrorMessageShow(false);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsErrorMessageShow(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {isErrorMessageShow && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isErrorMessageShow && !loading && !!people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length !== 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
