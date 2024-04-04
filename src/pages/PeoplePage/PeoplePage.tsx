import { useEffect, useState } from 'react';

import PeopleFilters from '../../components/PeopleFilter/PeopleFilters';
import PeopleTable from '../../components/PeopleTable/PeopleTable';
import { Loader } from '../../components/Loader';

import { getPreparedPeople } from '../../utils/getPreparedPeople';
import { getPeople } from '../../api';
import { Person } from '../../types';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);

    const fetchPeople = async () => {
      try {
        const response = await getPeople();

        setPeople(response);
      } catch {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const preparedPeople = getPreparedPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !!people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!!people.length && <PeopleTable people={preparedPeople} />}

              {!people.length && !isLoading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
