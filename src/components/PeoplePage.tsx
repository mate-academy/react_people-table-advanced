import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext, useEffect } from 'react';
import { ContextPeople } from '../PeopleContext';
import { getPeople } from '../api';

export const PeoplePage = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [err, setErr] = useState(false);
  const { people, setPeople, isLoading, setIsLoading, err, setErr } =
    useContext(ContextPeople);

  // @-dev load and setPeople
  useEffect(() => {
    const loadPeople = async () => {
      try {
        setIsLoading(true);
        await getPeople().then(setPeople);
      } catch {
        setErr(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {err && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !people?.length && !err && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              {!!people?.length && !isLoading && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
