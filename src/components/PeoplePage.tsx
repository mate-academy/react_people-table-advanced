/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Message } from '../enums/Message';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setError(false);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const query = searchParams.get('query')?.toLowerCase();
    const theSex = searchParams.get('sex');
    const theCenturies = searchParams.getAll('centuries');

    const genderFilter = theSex ? people.filter(p => p.sex === theSex) : people;

    const queryFilter = query
      ? genderFilter.filter(p =>
            p.name?.toLowerCase().includes(query) ||
            p.motherName?.toLowerCase().includes(query) ||
            p.fatherName?.toLowerCase().includes(query),
        )
      : genderFilter;

    const centuriesFilter = theCenturies.length
      ? queryFilter.filter(p => {
          const centuryBorn = (Math.floor(p.born / 100) + 1).toString();

          return theCenturies.includes(centuryBorn);
        })
      : queryFilter;

    setFilteredPeople(centuriesFilter);
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && <p data-cy="peopleLoadingError">{Message.Error}</p>}

              {!isLoading && !error && !people.length && (
                <p data-cy="noPeopleMessage">{Message.NoPeople}</p>
              )}

              {!isLoading && !error && !filteredPeople.length && (
                <p>{Message.Missmatch}</p>
              )}

              {!isLoading && !error && !!filteredPeople.length && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
