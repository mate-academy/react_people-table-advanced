/* eslint-disable @typescript-eslint/indent */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [peopleLoadingError, setPeopleLoadingError] = useState(false);
  const [searchParams] = useSearchParams();

  const activeCenturies = searchParams.getAll('centuries');
  const currQuery = searchParams.get('query') || '';
  const currSex = searchParams.get('sex');
  const sortCategory = searchParams.get('sort');
  const sortOrder = searchParams.get('order') || 'asc';

  useEffect(() => {
    setIsLoading(true);
    setPeopleLoadingError(false);
    getPeople()
      .then(setPeople)
      .catch(() => setPeopleLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getVisiblePeople = (peopleToShow: Person[]) => {
    let filtered = [...peopleToShow];

    if (currQuery) {
      const lowerQuery = currQuery.toLowerCase();

      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.motherName?.toLowerCase().includes(lowerQuery) ||
          p.fatherName?.toLowerCase().includes(lowerQuery),
      );
    }

    if (currSex) {
      filtered = filtered.filter(p => p.sex === currSex);
    }

    if (activeCenturies.length) {
      const centToNum = activeCenturies.map(Number);

      filtered = filtered.filter(p =>
        centToNum.includes(Math.ceil(p.born / 100)),
      );
    }

    if (sortCategory) {
      filtered.sort((a, b) => {
        switch (sortCategory) {
          case 'name':
            return sortOrder === 'desc'
              ? b.name.localeCompare(a.name)
              : a.name.localeCompare(b.name);
          case 'sex':
            return sortOrder === 'desc'
              ? b.sex.localeCompare(a.sex)
              : a.sex.localeCompare(b.sex);
          case 'born':
            return sortOrder === 'desc' ? b.born - a.born : a.born - b.born;
          case 'died':
            return sortOrder === 'desc' ? b.died - a.died : a.died - b.died;
          default:
            return 0;
        }
      });
    }

    return filtered;
  };

  const visiblePeople = people ? getVisiblePeople(people) : [];

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoading && !people ? (
            <div className="column">
              <div className="box table-container">
                <Loader />
              </div>
            </div>
          ) : (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
              <div className="column">
                <div className="box table-container">
                  {peopleLoadingError && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}
                  {!peopleLoadingError && people?.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  {!peopleLoadingError &&
                    visiblePeople.length === 0 &&
                    people?.length !== 0 && (
                      <p>
                        There are no people matching the current search criteria
                      </p>
                    )}
                  {visiblePeople.length !== 0 && (
                    <PeopleTable people={visiblePeople} />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
