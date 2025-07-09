import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';
import { SlugContext } from './SlugContext';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((People: Person[]) => {
        setPeople(People);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <SlugContext.Provider value={slug || ''}>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isLoading ||
                (!people.length && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ))}
              {!isLoading && !errorMessage && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </SlugContext.Provider>
  );
};
