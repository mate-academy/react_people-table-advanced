import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useRequest } from '../hooks/useRequest';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, isLoading, error] = useRequest<Person>(getPeople);

  const thereAreNoPeople = !isLoading && !error && !people.length;
  const peopleWereReceived = !isLoading && !error && people.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {peopleWereReceived && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {thereAreNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {peopleWereReceived && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
