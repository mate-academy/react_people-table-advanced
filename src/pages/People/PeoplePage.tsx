import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFIlters';

const getVisiblePeople = (
  people: Person[],
  query: string,
  centuries: string[],
  sex: string,
) => {
  let visiblePeople = [...people];

  if (centuries.length) {
    visiblePeople = visiblePeople
      .filter(
        person => centuries.map(Number).includes(Math.ceil(person.born / 100)),
      );
  }

  if (sex) {
    visiblePeople = visiblePeople
      .filter(person => person.sex === sex);
  }

  if (query.trim()) {
    visiblePeople = visiblePeople.filter(person => {
      const { name, fatherName, motherName } = person;
      const names = [name, fatherName, motherName];

      const lowerQuery = query.toLowerCase();

      return names
        .some(personName => personName?.toLowerCase().includes(lowerQuery));
    });
  }

  return visiblePeople;
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorOnLoad, setErrorOnLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { slug = '' } = useParams();

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries') || [];

  const visiblePeople = getVisiblePeople(people, query, centuries, sex);

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setErrorOnLoad(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

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
              {isLoading && <Loader />}

              {errorOnLoad && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(!people.length && !errorOnLoad && !isLoading)
                ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <PeopleTable
                    people={visiblePeople}
                    selectedPersonSlug={slug}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

    </>

  );
};
