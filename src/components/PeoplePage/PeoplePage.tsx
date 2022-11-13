import { useEffect, useState, useCallback } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { groupedPeopleData } from '../../utils/groupedPeopleData';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { debounce } from '../../utils/debounce';

export const PeoplePage = () => {
  const [dataPeople, setDataPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorFromServer, setErrorFromServer] = useState(false);
  const [debounceQuery, setDebounceQuery] = useState('');

  const loadPeopleDataFromServer = async () => {
    try {
      const dataFromServer = await getPeople();

      setDataPeople(groupedPeopleData(dataFromServer));
    } catch (error) {
      setErrorFromServer(true);

      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeopleDataFromServer();
  }, []);

  const debounceInputTitle = useCallback(
    debounce(setDebounceQuery, 500),
    [],
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !errorFromServer && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                debounceInputTitle={debounceInputTitle}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorFromServer && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !dataPeople.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !errorFromServer && dataPeople.length && (
                <PeopleTable
                  dataPeople={dataPeople}
                  debounceQuery={debounceQuery}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
