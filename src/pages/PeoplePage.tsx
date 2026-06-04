import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { Errors } from '../types/Errors';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.Default);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage(Errors.UnableLoad);
        setPeople([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  function getPreparedPeople(allPeople: Person[]) {
    const preparedPeople = allPeople.map(person => ({
      ...person,
      mother: allPeople.find(mother => mother.name === person.motherName),
      father: allPeople.find(father => father.name === person.fatherName),
    }));

    return preparedPeople;
  }

  function getfilteredPeople(preparedPeople: Person[]) {
    let filteredPeople = [...preparedPeople];
    const normalizedQuery = query?.toLowerCase().trim();

    filteredPeople = filteredPeople.filter(person => {
      const matchesQuery =
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery);

      const matchesSex = person.sex === sex || !sex;

      const matchesCentrury =
        centuries.length === 0 ||
        centuries.includes(Math.ceil(person.born / 100).toString());

      return matchesQuery && matchesSex && matchesCentrury;
    });

    return filteredPeople;
  }

  function getSortedPeople(peopleToSort: Person[]) {
    if (!sort) {
      return peopleToSort;
    }

    const sortFieldMap: { [key: string]: keyof Person } = {
      name: 'name',
      sex: 'sex',
      born: 'born',
      died: 'died',
    };

    const sortField = sortFieldMap[sort];

    if (!sortField) {
      return peopleToSort;
    }

    return [...peopleToSort].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue != null && bValue != null) {
        if (aValue < bValue) {
          return order === 'desc' ? 1 : -1;
        }

        if (aValue > bValue) {
          return order === 'desc' ? -1 : 1;
        }
      }

      return 0;
    });
  }

  const preparedPeople = getPreparedPeople(people);
  const filteredPeople = getfilteredPeople(preparedPeople);
  const sortedPeople = getSortedPeople(filteredPeople);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (errorMessage === Errors.UnableLoad) {
      return;
    }

    if (people.length === 0) {
      setErrorMessage(Errors.noPeopleMessage);
    } else if (filteredPeople.length === 0) {
      setErrorMessage(Errors.noFilteredPeople);
    } else {
      setErrorMessage(Errors.Default);
    }
  }, [isLoading, people.length, filteredPeople.length, errorMessage]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && errorMessage === Errors.Default && (
              <PeopleFilters sex={sex} centuries={centuries} query={query} />
            )}
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {errorMessage === Errors.UnableLoad && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {Errors.UnableLoad}
                </p>
              )}
              {errorMessage === Errors.noFilteredPeople && (
                <p data-cy="noFilteredPeople">{Errors.noFilteredPeople}</p>
              )}
              {errorMessage === Errors.noPeopleMessage && (
                <p data-cy="noPeopleMessage">{Errors.noPeopleMessage}</p>
              )}
              {!isLoading && errorMessage === Errors.Default && (
                <PeopleTable
                  filteredPeople={sortedPeople}
                  sort={sort}
                  order={order as 'asc' | 'desc' | ''}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
