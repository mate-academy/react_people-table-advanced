import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [peopleInfo, setPeopleInfo] = useState<Person[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState('');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.toLowerCase();
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeopleInfo(data);
        setIsLoading(false);

        if (data.length === 0) {
          setErrorMessage('There are no people on the server');
          setErrorType('noPeopleMessage');
        }
      })
      .catch(() => {
        setIsLoading(false);
        setErrorMessage('Something went wrong');
        setErrorType('peopleLoadingError');
      });
  }, []);

  const filteredList = useMemo(() => {
    return (
      peopleInfo?.filter(person => {
        return (
          (sex ? sex === person.sex : true) &&
          (query
            ? person.name.toLowerCase().includes(query) ||
              person.motherName?.toLowerCase().includes(query) ||
              person.fatherName?.toLowerCase().includes(query)
            : true) &&
          (centuries.length > 0
            ? centuries.includes(String(Math.ceil(person.born / 100)))
            : true)
        );
      }) || []
    );
  }, [peopleInfo, centuries, query, sex]);

  const showFilterError = filteredList.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {peopleInfo && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : errorMessage ? (
                <p data-cy={errorType}>{errorMessage}</p>
              ) : showFilterError ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable people={filteredList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
