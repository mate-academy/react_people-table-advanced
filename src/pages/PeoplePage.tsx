import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { PeopleFilters } from '../components/PeopleFilters';

const getCentury = (year: number) => {
  if (year.toString().slice(-2) === '00') {
    return Math.floor(year / 100);
  }

  return Math.floor(year / 100) + 1;
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const { slug = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  let filteredPeople = [...people];

  const getFilteredPeople = () => {
    if (query) {
      filteredPeople = filteredPeople.filter(person => {
        return person.name.toLowerCase()
          .includes(query.toLowerCase())
            || person.motherName?.toLowerCase()
              .includes(query.toLowerCase())
            || person.fatherName?.toLowerCase()
              .includes(query.toLowerCase());
      });
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        const century = getCentury(person.born);

        return centuries.includes(century.toFixed());
      });
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => {
        switch (sex) {
          case 'm':
            return person.sex === 'm';

          case 'f':
            return person.sex === 'f';

          default:
            return filteredPeople;
        }
      });
    }

    return filteredPeople;
  };

  filteredPeople = useMemo(
    getFilteredPeople,
    [query, sex, centuries, people],
  );

  if (sort) {
    filteredPeople = filteredPeople.sort((person1, person2) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return person1[sort].localeCompare(person2[sort]);

        case 'born':
        case 'died':
          return person1[sort] - person2[sort];

        default:
          return 0;
      }
    });
  }

  if (order) {
    filteredPeople.reverse();
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">

          {!isLoading && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                sex={sex}
                centuries={centuries}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isError && !isLoading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {query && !filteredPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && filteredPeople.length > 0 && (
                <PeopleTable
                  people={people}
                  filteredPeople={filteredPeople}
                  selectedPerson={slug}
                  sort={sort}
                  order={order}
                  searchParams={searchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
