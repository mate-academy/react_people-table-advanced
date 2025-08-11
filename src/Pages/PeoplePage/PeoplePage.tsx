import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { PeopleList } from '../../components/PeopleList';
import { Person } from '../../types';

const addParentReferences = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(human => human.name === person.motherName);
    const father = people.find(human => human.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

const filteredPeople = (visiblesPeople: Person[], query: string) => {
  return visiblesPeople.filter(
    person =>
      person.name.toLowerCase().includes(query.trim().toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.trim().toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.trim().toLowerCase()),
  );
};

const filterVisiblePeople = (
  people: Person[],
  query: string,
  sex: string | null,
  centuries: string[],
) => {
  let visiblePeople = [...people];

  if (query) {
    visiblePeople = filteredPeople(visiblePeople, query);
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(personSex => personSex.sex === sex);
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person =>
      centuries.some(centery => Math.ceil(person.born / 100) === +centery),
    );
  }

  return visiblePeople;
};

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];

  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const visiblesPeople = filterVisiblePeople(people, query, sex, centuries);

  const { personId = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(rawPeople => {
        const updatePeople = addParentReferences(rawPeople);

        setPeople(updatePeople);
      })
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
            {!isLoading && <PeopleFilters />}
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
