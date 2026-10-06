import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useDispatch, useGlobalState } from '../store/GlobalProvider';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { people, updatedPeople } = useGlobalState();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(response => {
        dispatch({ type: 'loadPeople', payload: { people: response } });
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    let processedPeople = [...people];

    const query = searchParams.get('query')?.trim().toLowerCase();
    const centuries = searchParams.getAll('centuries');
    const sex = searchParams.get('sex');

    if (query) {
      processedPeople = processedPeople.filter(person => {
        return (
          person.name.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query)
        );
      });
    }

    if (centuries.length > 0) {
      processedPeople = processedPeople.filter(person => {
        return centuries.includes(String(Math.ceil(person.born / 100)));
      });
    }

    if (sex) {
      processedPeople = processedPeople.filter(person => {
        return person.sex === sex;
      });
    }

    const sortCriteria = searchParams.get('sort');

    if (sortCriteria) {
      const order = searchParams.get('order');

      switch (sortCriteria) {
        case 'name':
        case 'sex':
          processedPeople.sort((firstPerson, secondPerson) =>
            firstPerson[sortCriteria].localeCompare(secondPerson[sortCriteria]),
          );
          break;
        case 'born':
        case 'died':
          processedPeople.sort(
            (firstPerson, secondPerson) =>
              firstPerson[sortCriteria] - secondPerson[sortCriteria],
          );
      }

      if (order) {
        processedPeople.reverse();
      }
    }

    dispatch({
      type: 'updatePeople',
      payload: { updatedPeople: processedPeople },
    });
  }, [searchParams, people, dispatch]);

  const hasNoPeople = !isLoading && people.length === 0 && !isError;
  const hasNoMatchingPeople =
    !isError && !isLoading && people.length > 0 && updatedPeople.length === 0;
  const hasPeopleTable =
    !isError && !isLoading && people.length > 0 && updatedPeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && !isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && !isLoading && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {hasNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasNoMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hasPeopleTable && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
