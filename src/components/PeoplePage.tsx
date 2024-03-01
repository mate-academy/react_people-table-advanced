import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person, SexFilter, Sorted } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasErrorPeople, setHasErrorPeople] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setHasErrorPeople(false);
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasErrorPeople(true))
      .finally(() => setLoading(false));
  }, []);

  const getPreparedPeople = useCallback(() => {
    const sort = searchParams.get('sort') || '';
    const order = searchParams.get('order') || '';
    const sex = searchParams.get('sex') || '';
    const query = searchParams.get('query') || '';
    const centuries = searchParams.getAll('centuries') || [];
    let preparedPeople = [...people];

    switch (sex) {
      case SexFilter.MALE:
        preparedPeople = preparedPeople.filter(
          person => person.sex === SexFilter.MALE,
        );
        break;

      case SexFilter.FEMALE:
        preparedPeople = preparedPeople.filter(
          person => person.sex === SexFilter.FEMALE,
        );
        break;

      default:
        break;
    }

    if (query) {
      preparedPeople = preparedPeople.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query),
      );
    }

    if (centuries.length) {
      const peopleOfCentury: Person[] = [];

      centuries.forEach(century => {
        preparedPeople.forEach(person => {
          if (Math.ceil(person.born / 100) === +century) {
            peopleOfCentury.push(person);
          }
        });
      });

      preparedPeople = peopleOfCentury;
    }

    if (sort) {
      preparedPeople = preparedPeople.sort((param1, param2) => {
        switch (sort) {
          case Sorted.NAME:
          case Sorted.SEX:
            return param1[sort].localeCompare(param2[sort]);
          case Sorted.BORN:
          case Sorted.DIED:
            return param1[sort] - param2[sort];
          default:
            return 0;
        }
      });
    }

    if (order) {
      preparedPeople = preparedPeople.reverse();
    }

    return preparedPeople;
  }, [people, searchParams]);

  const visiblePeople = useMemo(() => getPreparedPeople(), [getPreparedPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && !loading && !hasErrorPeople && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {hasErrorPeople && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !people.length && !hasErrorPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!visiblePeople.length && !loading && !hasErrorPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!visiblePeople.length && !loading && !hasErrorPeople && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
