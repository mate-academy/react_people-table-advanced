import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilter';
import { PeopleTable } from '../PeopleTable';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const filteredPeople = people.filter(person => {
    const personCentury = +person.born.toString().slice(0, 2) + 1;

    if (sex && person.sex !== sex) {
      return false;
    }

    if (centuries.length && !centuries.includes(personCentury.toString())) {
      return false;
    }

    if (
      query &&
      !person.name.toLowerCase().includes(query.toLowerCase()) &&
      !person.fatherName?.toLowerCase().includes(query.toLowerCase()) &&
      !person.motherName?.toLowerCase().includes(query.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!!filteredPeople.length && (
                <PeopleTable people={filteredPeople} />
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPeople.length && people.length > 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
