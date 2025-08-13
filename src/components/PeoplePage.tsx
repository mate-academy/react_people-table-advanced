import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { PeopleContext } from '../context/PeopleContext';

export const PeoplePage = () => {
  const { slug } = useParams();
  const { people, visiblePeople, isLoading, hasLoadingError } =
    useContext(PeopleContext);
  const selectedPerson =
    (slug && people.find(person => person.slug === slug)) || null;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasLoadingError && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasLoadingError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasLoadingError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading &&
                !hasLoadingError &&
                !!people.length &&
                ((!visiblePeople.length && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )) || <PeopleTable selectedPerson={selectedPerson} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
