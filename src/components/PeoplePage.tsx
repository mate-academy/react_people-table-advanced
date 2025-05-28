import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useRef, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { debounce } from 'lodash';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peoplesList, setPeoplesList] = useState<Person[]>([]);
  const [initialList, setInitialList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchParams] = useSearchParams();

  const debouncedFilter = useRef(
    debounce((list: Person[], filterText: string) => {
      const filtered = list.filter(
        person =>
          typeof person.fatherName === 'string' &&
          person.fatherName.toLowerCase().includes(filterText.toLowerCase()),
      );

      setPeoplesList(filtered);
    }, 300),
  );

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => {
        setInitialList(response);
        setPeoplesList(response);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!initialList.length) {
      return;
    }

    const centuriesValues = searchParams.getAll('centuries');
    const sexSearchParams = searchParams.get('sex');

    const filteredBase = initialList
      .filter(p => (sexSearchParams ? p.sex === sexSearchParams : true))
      .filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuriesValues.length
          ? centuriesValues.includes(century)
          : true;
      });

    debouncedFilter.current(filteredBase, inputValue);
  }, [searchParams, initialList, inputValue]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {initialList.length > 0 && (
              <PeopleFilters
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {hasError ? (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              ) : isLoading ? (
                <Loader />
              ) : initialList.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : peoplesList.length === 0 ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable
                  initialList={initialList}
                  peoplesList={peoplesList}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
