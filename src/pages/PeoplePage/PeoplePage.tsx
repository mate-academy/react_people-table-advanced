import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { filterPeople } from '../../utils/filterPeople';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilters';

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
      .catch(() => setHasLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = people.map(person => {
    const mother = people.find(p => p.name === person.motherName);
    const father = people.find(p => p.name === person.fatherName);

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
      <div className="columns">
        <div className="column">
          <div className="box table-container">
            {isLoading && <Loader />}
            {hasLoadingError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
            {!!people.length && (
              <PeopleTable people={filteredPeople} data-cy="peopleTable" />
            )}
            {isErrorShowing && (
              <p data-cy="noPeopleMessage">
                There are no people matching the current search criteria
              </p>
            )}
          </div>
        </div>

        <div className="column is-4">
          {!!people.length && <PeopleFilters />}
        </div>
      </div>
    </>
  );
};
