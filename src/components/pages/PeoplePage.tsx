import { useContext, useEffect, useState } from 'react';
import { PeopleContext } from '../../store/PeopleContext';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { PeopleFilters } from '../PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { getPreparedPeople } from '../../utils/functions';

export const PeoplePage = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const [searchParams] = useSearchParams();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const peopleList = people.map(person => ({
    ...person,
    mother: people.find(personItem => personItem.name === person.motherName),
    father: people.find(personItem => personItem.name === person.fatherName),
  }));

  useEffect(() => {
    setError(false);
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [setPeople]);

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const visiblePeople = getPreparedPeople(
    peopleList,
    sex,
    query,
    centuries,
    sort,
    order,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!error && !loading && <PeopleFilters />}
          </div>
          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && !loading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !error && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!visiblePeople.length && !error && !loading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!visiblePeople.length && !error && !loading && (
                <PeopleTable visiblePeople={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
