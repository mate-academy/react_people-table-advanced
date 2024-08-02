import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const orderMultiplier = order ? -1 : 1;

  const displayedPeople = useMemo(() => {
    let peopleToDisplay = [...people];

    if (sex) {
      peopleToDisplay = peopleToDisplay.filter(person => person.sex === sex);
    }

    if (query) {
      peopleToDisplay = peopleToDisplay.filter(person =>
        person.name.toLowerCase().includes(query.trim().toLowerCase()),
      );
    }

    if (centuries.length !== 0) {
      peopleToDisplay = peopleToDisplay.filter(person =>
        centuries.some(
          century => `${person.born}`.slice(0, 2) === `${+century - 1}`,
        ),
      );
    }

    switch (sort) {
      case 'name':
      case 'sex':
        peopleToDisplay.sort(
          (person1, person2) =>
            person1[sort].localeCompare(person2[sort]) * orderMultiplier,
        );
        break;

      case 'born':
      case 'died':
        peopleToDisplay.sort(
          (person1, person2) =>
            (person1[sort] - person2[sort]) * orderMultiplier,
        );
        break;
    }

    return peopleToDisplay;
  }, [people, sex, query, centuries, sort, orderMultiplier]);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !people.length && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !!people.length && !displayedPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !!displayedPeople.length && (
                <PeopleTable people={displayedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <p>There are no people matching the current search criteria</p> */
}
