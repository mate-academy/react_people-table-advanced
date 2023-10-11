import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);

  const showLoader = !people && !isError;
  const peopleLoaded = !!people?.length;

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true));
  }, []);

  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleLoaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {showLoader && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {peopleLoaded && (
                <PeopleTable people={people} clickedPersonSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
