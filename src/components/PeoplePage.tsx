import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getCentury, getPeople, prepearPeople } from '../utils/Actions';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setPeople(null);
    getPeople()
      .then(response => {
        const prepearedPeople = prepearPeople(response);

        setPeople(prepearedPeople);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    const sexParams = searchParams.get('sex');
    const centuryParams = searchParams.getAll('centuries');
    const query = searchParams.get('query') || '';
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (people && searchParams.size > 0) {
      let copyPeople = [...people];

      if (sexParams === 'f') {
        copyPeople = copyPeople.filter(p => p.sex === 'f');
      }

      if (sexParams === 'm') {
        copyPeople = copyPeople.filter(p => p.sex === 'm');
      }

      if (centuryParams.length > 0) {
        copyPeople = copyPeople.filter(person =>
          centuryParams.includes(getCentury(person)),
        );
      }

      if (query.trim().length > 0) {
        copyPeople = copyPeople.filter(
          person =>
            person.name
              .toUpperCase()
              .trim()
              .includes(query.toUpperCase().trim()) ||
            person.fatherName
              ?.toUpperCase()
              .trim()
              .includes(query.toUpperCase().trim()) ||
            person.motherName
              ?.toUpperCase()
              .trim()
              .includes(query.toUpperCase().trim()),
        );
      }

      if (sort === 'born') {
        if (order) {
          copyPeople.sort((a, b) => b.born - a.born);
        } else {
          copyPeople.sort((a, b) => a.born - b.born);
        }
      }

      if (sort === 'name') {
        if (order) {
          copyPeople = copyPeople.sort((a, b) => b.name.localeCompare(a.name));
        } else {
          copyPeople = copyPeople.sort((a, b) => a.name.localeCompare(b.name));
        }
      }

      if (sort === 'died') {
        if (order) {
          copyPeople = copyPeople.sort((a, b) => b.died - a.died);
        } else {
          copyPeople = copyPeople.sort((a, b) => a.died - b.died);
        }
      }

      if (sort === 'sex') {
        if (order) {
          copyPeople = copyPeople.sort((a, b) => b.sex.localeCompare(a.sex));
        } else {
          copyPeople = copyPeople.sort((a, b) => a.sex.localeCompare(b.sex));
        }
      }

      return copyPeople;
    }

    return people;
  }, [searchParams, people]);

  const isTherePeople =
    people !== null &&
    people?.length > 0 &&
    visiblePeople?.length === 0 &&
    !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people !== null && !isError && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && !isLoading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people?.length === 0 && !isError && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isTherePeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {visiblePeople && visiblePeople?.length > 0 && !isLoading && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
