import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { filterPeople } from '../../utils/FirtererPeople';
import { PersonSex } from '../../enums';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const showEmptyTable = people.length === 0 && !isLoaded;
  const showNoPeopleMessage = isLoaded && !errorMessage && people.length === 0;
  const showErrorMessage = errorMessage && people.length === 0;

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') as PersonSex;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const filteredPeople = useMemo(() => {
    return filterPeople(people, {
      sex, query, centuries, sort, order,
    });
  }, [people, searchParams]);

  const showEmptyMessage = filteredPeople.length === 0;

  function getPeopleFromServer() {
    return getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoaded(true));
  }

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {showEmptyTable && <Loader />}
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!showEmptyTable && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {people.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}

              {showErrorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {showNoPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {showEmptyMessage && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
