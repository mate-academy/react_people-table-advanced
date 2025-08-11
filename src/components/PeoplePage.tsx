import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { filterPeople } from '../utils/filterPeopl';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const isErrorShowing = !people.length && !isLoading && !hasLoadingError;

  useEffect(() => {
    setIsLoading(true);
    setHasLoadingError(false);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasLoadingError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = people.map(person => {
    const mother = people.find(someone => someone.name === person.motherName);
    const father = people.find(someone => someone.name === person.fatherName);

    return { ...person, mother, father };
  });

  const filteredPeople = filterPeople({
    preparedPeople,
    query,
    sex,
    centuries,
    sort,
    order,
  });

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
              {hasLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!!people.length && <PeopleTable people={filteredPeople} />}

              {isErrorShowing && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
