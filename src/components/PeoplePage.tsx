import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { Person } from '../types';

export const PeoplePage = () => {
  const context = useContext(AppContext);
  const { isError, isLoading, people } = context;
  const [filteredPeople, setFilteredPeople] = useState<Person[] | null>(people);
  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters setFilteredPeople={setFilteredPeople} />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!people?.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filteredPeople === null || !filteredPeople.length ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable persons={filteredPeople} currentSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
