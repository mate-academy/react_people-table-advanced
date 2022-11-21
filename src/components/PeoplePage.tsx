import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries') || [];

  useEffect(() => {
    async function fetchPeople() {
      setIsLoading(true);
      try {
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
      } catch (e) {
        setIsLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPeople();
  }, []);

  const getCenturies = (year: number) => {
    return Math.ceil(year / 100);
  };

  const fitsTheQuery = (name: string | null) => {
    if (name === null) {
      return false;
    }

    return name.toLowerCase().includes(query.toLowerCase());
  };

  const getFilteredPeople = (sortedPeople: Person[]) => {
    const filterBySex = (person: Person) => person.sex === sex || sex === null;
    const filterByQuery = (
      name: string, fatherName: string | null, motherName: string | null,
    ) => {
      return fitsTheQuery(name)
        || fitsTheQuery(fatherName)
        || fitsTheQuery(motherName);
    };

    const filterByCenturies = (born: number) => {
      return selectedCenturies.includes(`${getCenturies(born)}`)
        || !selectedCenturies.length;
    };

    return sortedPeople
      .filter(filterBySex)
      .filter(person => filterByQuery(
        person.name, person.fatherName, person.motherName,
      ))
      .filter(person => filterByCenturies(person.born));
  };

  const filteredPeople = getFilteredPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              sex={sex}
              query={query}
              selectedCenturies={selectedCenturies}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {isLoadingError ? (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  ) : (
                    <>
                      {!people.length ? (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      ) : (
                        <>
                          {!filteredPeople.length ? (
                            <p>
                              There are no people matching the
                              current search criteria
                            </p>
                          ) : (
                            <PeopleTable
                              people={filteredPeople}
                              slug={slug}
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
