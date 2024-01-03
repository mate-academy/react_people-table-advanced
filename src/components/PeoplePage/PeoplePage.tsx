import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { filterPeople } from '../../utils/filterPeople';
import { sortPeople } from '../../utils/sortPeople';

export const PeoplePage = () => {
  const [
    peopleFromServer,
    setPeopleFromServer,
  ] = useState<Person[] | null>(null);
  const [searchParams] = useSearchParams();

  const sexFilter = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const sortBy = searchParams.get('sort') as keyof Person;
  const sortOrder = searchParams.get('order');

  const [isRequestFailed, setIsRequestFailed] = useState(false);
  const isLoading = !isRequestFailed && !peopleFromServer;

  let preparedPeople = filterPeople(
    peopleFromServer,
    centuries,
    sexFilter,
    query,
  );

  if (sortBy) {
    preparedPeople = sortPeople(preparedPeople, sortBy, sortOrder);
  }

  const noMatchMsg = 'There are no people matching the current search criteria';

  const shownFilteredPeople = preparedPeople && preparedPeople.length ? (
    <PeopleTable people={preparedPeople} />
  ) : (
    <p>
      {noMatchMsg}
    </p>
  );

  const shownLoadedPeople = (peopleFromServer || []).length ? (
    shownFilteredPeople
  ) : (
    <p data-cy="noPeopleMessage">
      There are no people on the server
    </p>
  );

  useEffect(
    () => {
      getPeople()
        .then(people => {
          setPeopleFromServer(people.map(person => ({
            ...person,
            mother: people.find(
              possibleMother => (possibleMother.name === person.motherName),
            ),
            father: people.find(
              possibleFather => (possibleFather.name === person.fatherName),
            ),
          })));
        })
        .catch(() => {
          setIsRequestFailed(true);
        });
    },
    [],
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleFromServer && peopleFromServer.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isRequestFailed && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {peopleFromServer && (
                shownLoadedPeople
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
