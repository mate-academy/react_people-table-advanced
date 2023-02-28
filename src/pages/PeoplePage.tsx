import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilter';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [
    peopleFromServer,
    setPeopleFromServer,
  ] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { slug: selectedSlug = '' } = useParams();

  const isNoPeopleOnServer = !isLoading && (peopleFromServer.length === 0);
  const isFilterVsible = !isLoading && peopleFromServer;

  const loadPeople = async () => {
    try {
      setIsLoading(true);
      const loadedPeople = await getPeople();

      setPeopleFromServer(loadedPeople);
      setIsLoading(false);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  if (isError) {
    return (
      <p data-cy="peopleLoadingError">Something went wrong</p>
    );
  }

  if (isNoPeopleOnServer) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isFilterVsible && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading
                ? (<Loader />)
                : (
                  peopleFromServer && (
                    <PeopleTable
                      people={peopleFromServer}
                      selectedSlug={selectedSlug}
                    />
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
