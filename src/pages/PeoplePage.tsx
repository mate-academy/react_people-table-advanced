import { useEffect, useState } from 'react';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (error) {
        setErrorMessage('Unable to load people');
      }

      setIsLoading(false);
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoading
            ? (<Loader />)
            : (
              <>
                {errorMessage && (
                  <>
                    <p
                      data-cy="peopleLoadingError"
                      className="has-text-danger"
                    >
                      Something went wrong
                    </p>
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  </>
                )}
                <div className="column is-7-tablet is-narrow-desktop">
                  <PeopleFilters />
                </div>

                <div className="column">
                  <div className="box table-container">

                    <PeopleTable people={people} />
                  </div>
                </div>
              </>
            )}

        </div>
      </div>
    </>
  );
};
