import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isMatchSearch] = useState(false);
  const { selectedSlug } = useParams();

  useEffect(() => {
    const getPeopleList = async () => {
      setIsLoading(true);
      try {
        const dataPeopleList = await getPeople();

        if (dataPeopleList) {
          setPeopleList(dataPeopleList);
        }
      } catch {
        setIsLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPeopleList();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isLoadingError
              && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {!peopleList.length
              && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isMatchSearch && (
                <p>There are no people matching the current search criteria</p>
              )}

              <PeopleTable
                peopleList={peopleList}
                selectedSlug={selectedSlug}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
