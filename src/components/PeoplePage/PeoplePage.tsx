import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person, Sort } from '../../types';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const getSort = searchParams.get('sort') || '';
  const getOrder = searchParams.get('order') || '';

  function getParents(peopleFromServer: Person[]) {
    const peopleWithParents = peopleFromServer.map((person) => {
      const newPerson = { ...person };

      newPerson.father = peopleFromServer.find(
        (father) => father.name === newPerson.fatherName,
      );

      newPerson.mother = peopleFromServer.find(
        (mother) => mother.name === newPerson.motherName,
      );

      return newPerson;
    });

    return peopleWithParents;
  }

  useEffect(() => {
    setIsloading(true);
    getPeople()
      .then((peopleFromServer) => {
        setPeople(getParents(peopleFromServer));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsloading(false));
  }, []);

  const preparedPeople: Person[] = useMemo(() => {
    let filteredPeople = people;
    const normalizedQuery = query.toLocaleLowerCase();

    if (sex) {
      filteredPeople = filteredPeople.filter((person) => person.sex === sex);
    }

    if (normalizedQuery) {
      filteredPeople = filteredPeople.filter(
        (person) => person.name.toLowerCase().includes(normalizedQuery)
          || person.motherName?.toLowerCase().includes(normalizedQuery)
          || person.fatherName?.toLowerCase().includes(normalizedQuery),
      );
    }

    if (centuries.length) {
      filteredPeople = filteredPeople
        .filter((person) => centuries
          .find((century) => Math.ceil(person.born / 100) === +century));
    }

    let sortedPeople;

    switch (getSort) {
      case Sort.name:
      case Sort.sex:
        sortedPeople = [...filteredPeople]
          .sort((p1, p2) => p1[getSort].localeCompare(p2[getSort]));
        break;
      case Sort.born:
      case Sort.died:
        sortedPeople = [...filteredPeople]
          .sort((p1, p2) => p1[getSort] - p2[getSort]);
        break;

      default:
        return filteredPeople;
    }

    if (getOrder) {
      sortedPeople.reverse();
    }

    return sortedPeople || filteredPeople;
  }, [searchParams, people]);

  const selectedPerson = people.find((person) => person.slug === slug);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  {isError ? (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  ) : (
                    <>
                      {!people.length ? (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      ) : (
                        <>
                          {preparedPeople.length ? (
                            <PeopleTable
                              people={preparedPeople}
                              selectedPerson={selectedPerson}
                            />
                          ) : (
                            <p>
                              There are no people matching the current search
                              criteria
                            </p>
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
      )}
    </>
  );
};
