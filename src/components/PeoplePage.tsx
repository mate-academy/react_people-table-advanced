import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getPeople()
      .then((res: Person[]) => {
        setPeople(res);
        setIsLoading(false);
        if (res.length === 0) {
          setErrorMessage('There are no people on the server');
        }
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
        setIsLoading(false);
      });
  }, []);

  const visiblePeople = React.useMemo(() => {
    let filtered = [...people];

    const name = searchParams.get('query')?.toLowerCase().trim();
    const centuries = searchParams.getAll('centuries');
    const sex = searchParams.get('sex');

    if (name) {
      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(name) ||
          person.fatherName?.toLowerCase().includes(name) ||
          person.motherName?.toLowerCase().includes(name),
      );
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const personCentury = Math.ceil(person.born / 100);

        return centuries.includes(String(personCentury));
      });
    }

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    return filtered;
  }, [people, searchParams]);

  const peopleExist = people !== undefined && people.length !== 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleExist && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {errorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && errorMessage && !peopleExist && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoading && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && visiblePeople.length > 0 && (
                <PeopleTable
                  selectedSlug={slug}
                  visiblePeople={visiblePeople}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
