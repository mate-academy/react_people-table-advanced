import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';

import { Person } from '../types';

import { getPeople } from '../api';

import { SexFilterType } from '../enums/SexFilterType';
import { SortType } from '../enums/SortType';

import { findPerson } from '../helpers/findPerson';
import { getSexFilterType } from '../helpers/getSexFilterType';
import { getSortType } from '../helpers/getSortType';
import { getVisiblePeople } from '../helpers/getVisiblePeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [hasNoDataError, setHasNoDataError] = useState(false);

  const [searchParams] = useSearchParams();

  const sexFilter = getSexFilterType(
    searchParams.get('sex') || SexFilterType.All,
  );
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortType = getSortType(searchParams.get('sort') || SortType.None);
  const order = searchParams.get('order') || '';

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const fetchedPeople = await getPeople();
        const isEmptyResponse = !fetchedPeople.length;

        if (isEmptyResponse !== hasNoDataError) {
          setHasNoDataError(isEmptyResponse);
        }

        setPeople(
          fetchedPeople.map((person) => {
            const currentPerson = { ...person };
            const { fatherName, motherName } = person;

            if (motherName) {
              currentPerson.mother = findPerson(fetchedPeople, motherName);
            }

            if (fatherName) {
              currentPerson.father = findPerson(fetchedPeople, fatherName);
            }

            return currentPerson;
          }),
        );
      } catch (err) {
        setHasLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const visiblePeople = useMemo(() => {
    return getVisiblePeople(
      people,
      sexFilter,
      query,
      centuries.map((century) => Number(century)),
      sortType,
      order,
    );
  }, [people, sexFilter, query, centuries.length, sortType, order]);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasLoadingError && !hasNoDataError && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {hasLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {hasNoDataError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isLoading ? (
                <Loader />
              ) : (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
