import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleFilters } from '../../components/People/PeopleFilters';
import { PeopleList } from '../../components/People/PeopleList';
import { useParams, useSearchParams } from 'react-router-dom';

const peopleFilter = (visiblesPeople: Person[], query: string) => {
  return visiblesPeople.filter(
    person =>
      person.name.toLowerCase().includes(query.trim().toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.trim().toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.trim().toLowerCase()),
  );
};

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];

  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  let visiblesPeople = [...people];

  if (query) {
    visiblesPeople = peopleFilter(visiblesPeople, query);
  }

  if (sex) {
    visiblesPeople = visiblesPeople.filter(personSex => personSex.sex === sex);
  }

  if (centuries.length > 0) {
    visiblesPeople = visiblesPeople.filter(person =>
      centuries.some(centery => Math.ceil(person.born / 100) === +centery),
    );
  }

  const { personId = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(error => {
        setErrorMessage(`Something went wrong: ${error.message}`);
      })
      .finally(() => setIsLoading(false));
  }, [errorMessage]);

  const getFather = (name: string | null) =>
    visiblesPeople.find(person => person.name === name);

  const getMother = (name: string | null) =>
    visiblesPeople.find(person => person.name === name);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {errorMessage && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      {errorMessage}
                    </p>
                  )}

                  {!people?.length && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                </>
              )}

              {!!people.length && (
                <PeopleList
                  people={visiblesPeople}
                  personId={personId}
                  getFather={getFather}
                  getMother={getMother}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
