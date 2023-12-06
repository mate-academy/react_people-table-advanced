import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PersonType } from '../types';
import { Filter } from '../types/Filter';
import { ORDER_PARAM, SORT_PARAM, Sort } from '../types/Sort';

export const PeoplePage = () => {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  function loadPeople() {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }

  useEffect(loadPeople, []);

  function getFilteredPeople(): PersonType[] | null {
    let filteredPeople = [...people];
    const sort = searchParams.get(SORT_PARAM);
    const desc = searchParams.get(ORDER_PARAM);
    const sex = searchParams.get(Filter.SEX);
    const name = searchParams.get(Filter.NAME);
    const centuries = searchParams.getAll(Filter.CENTURIES);

    if (sort) {
      switch (sort) {
        case Sort.SEX:
        case Sort.NAME:
          filteredPeople.sort((a, b) => (
            a[sort].localeCompare(b[sort])));
          break;

        case Sort.BORN:
        case Sort.DIED:
          filteredPeople.sort((a, b) => (a[sort] - b[sort]));
          break;

        default:
          break;
      }

      if (desc) {
        return filteredPeople.reverse();
      }
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (name) {
      filteredPeople = filteredPeople.filter(person => person.name.toLowerCase()
        .includes(name.toLowerCase())
        || person.fatherName?.toLowerCase().includes(name.toLowerCase())
        || person.motherName?.includes(name.toLowerCase()));
    }

    if (centuries) {
      if (centuries.length === 0) {
        return filteredPeople;
      }

      filteredPeople = filteredPeople.filter(person => centuries
        .includes(((Math.floor(person.born / 100) + 1).toString())));
    }

    return filteredPeople;
  }

  const visiblePeople = getFilteredPeople() || null;

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
              {isLoading && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(people.length === 0 && !isError && !isLoading) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeople?.length === 0 ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
