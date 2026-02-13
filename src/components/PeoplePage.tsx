import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  // console.log(centuries)

  const visiblePeoples = useMemo(() => {
    let filtredPeoples = [...peopleList];

    if (query) {
      const lowerQuery = query.toLowerCase();

      filtredPeoples = filtredPeoples.filter(
        person =>
          person.name.toLowerCase().includes(lowerQuery) ||
          person.motherName?.toLowerCase().includes(lowerQuery) ||
          person.fatherName?.toLowerCase().includes(lowerQuery),
      );
    }

    if (sex) {
      filtredPeoples = filtredPeoples.filter(person => person.sex === sex);
    }

    if (centuries.length !== 0) {
      filtredPeoples = filtredPeoples.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (sort) {
      filtredPeoples.sort((a, b) => {
        let aValue = a[sort as keyof Person];
        let bValue = b[sort as keyof Person];

        if (aValue === null || aValue === undefined) {
          aValue = '';
        }

        if (bValue === null || bValue === undefined) {
          bValue = '';
        }

        if (aValue < bValue) {
          return order === 'desc' ? 1 : -1;
        }

        if (aValue > bValue) {
          return order === 'desc' ? -1 : 1;
        }

        return 0;
      });
    }

    return filtredPeoples;
  }, [query, peopleList, sex, centuries, sort, order]);

  // console.log(sex, query, centuries, sort, oder);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage(null);

    getPeople()
      .then(data => {
        setPeopleList(data);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {peopleList.length >= 0 && (
        <>
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <>
                {!isLoading && !errorMessage && peopleList.length > 0 && (
                  <div className="column is-7-tablet is-narrow-desktop">
                    <PeopleFilters />
                  </div>
                )}

                <div className="column">
                  <div className="box table-container">
                    {isLoading && <Loader />}
                    {errorMessage && (
                      <p data-cy="peopleLoadingError">{errorMessage}</p>
                    )}

                    {!isLoading && !errorMessage && peopleList.length === 0 && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                    {!isLoading && visiblePeoples.length === 0 && (
                      <p>
                        There are no people matching the current search criteria
                      </p>
                    )}

                    <PeopleTable visiblePeoples={visiblePeoples} />
                  </div>
                </div>
              </>
            </div>
          </div>
        </>
      )}
    </>
  );
};
