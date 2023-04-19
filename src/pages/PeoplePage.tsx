import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

import { ErrorType } from '../types/ErrorTypes';
import { Person } from '../types';
import { FilterBySex } from '../types/typesFilters/FilterBySex';
import { SortByPersonInfo } from '../types/typesSorts/SortByPersonInfo';

import {
  getFilterBySex,
  getVisiblePeople,
} from '../utils/filterHelpers';
import { getSortType } from '../utils/sortHelpers';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<ErrorType>(ErrorType.NONE);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const sex = searchParams.get('sex') || FilterBySex.ALL;
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || SortByPersonInfo.NONE;
  const order = searchParams.get('order') || '';

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);

        const fetchedPeople = await getPeople();
        const peopleWithParents = fetchedPeople.map(person => {
          const copyPerson = { ...person };

          if (person.motherName) {
            copyPerson.mother
              = fetchedPeople.find(mother => mother.name === person.motherName);
          }

          if (person.fatherName) {
            copyPerson.father
              = fetchedPeople.find(father => father.name === person.fatherName);
          }

          return copyPerson;
        });

        if (peopleWithParents.length === 0) {
          setErrorMessage(ErrorType.NOPEOPLE);

          return;
        }

        setPeople(peopleWithParents);
        setErrorMessage(ErrorType.NONE);
      } catch {
        setErrorMessage(ErrorType.LOAD);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const visiblePeople = useMemo(() => {
    return getVisiblePeople(
      people,
      query,
      getFilterBySex(sex),
      centuries.map(centry => +centry),
      getSortType(sort),
      order,
    );
  }, [people, query, sex, centuries, sort, order]);

  const isLoadError = errorMessage === ErrorType.LOAD;
  const areNotPeopleError = errorMessage === ErrorType.NOPEOPLE;
  const areNotPeopleMatching = !visiblePeople.length && !isLoading;
  const showPeopleTable = !errorMessage && visiblePeople[0];
  const showPeopleFilters = !errorMessage && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showPeopleFilters && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoadError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {areNotPeopleError && (
                <p data-cy="noPeopleMessage">
                  {errorMessage}
                </p>
              )}

              {areNotPeopleMatching && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isLoading ? (
                <Loader />
              ) : (showPeopleTable && (
                <PeopleTable people={visiblePeople} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
