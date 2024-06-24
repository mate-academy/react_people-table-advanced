import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useContext, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleContext } from '../Contexts/PeopleContext';
import { useSearchParams } from 'react-router-dom';
import { getFiterPerson } from '../utils/filterParams';

export const PeoplePage = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  useEffect(() => {
    if (people.length === 0) {
      setLoading(true);
      getPeople()
        .then(data => {
          setPeople(data);
        })
        .catch(() => setErrorMessage('Something went wrong'))
        .finally(() => setLoading(false));
    }
  }, [people, setPeople]);

  const peopleList = people.map(person => ({
    ...person,
    mother: people.find(personItem => personItem.name === person.motherName),
    father: people.find(personItem => personItem.name === person.fatherName),
  }));

  const visiblePerson = getFiterPerson(peopleList, query, centuries, sex);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !errorMessage && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && !errorMessage && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !!people.length && (
                <PeopleTable people={visiblePerson} />
              )}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
