import { useEffect, useMemo, useState } from 'react';
import { PersonType } from '../types';
import { client } from '../utils/fetchPeople';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [getError, setGetError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];

  const sortField = searchParams.get('sort') as keyof PersonType | null;
  const sortOrder = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    const fetchPeople = async () => {
      try {
        const response = await client.get<PersonType[]>('/people.json');

        const preparedPeople = response.map(person => ({
          ...person,
          mother: response.find(mother => mother.name === person.motherName),
          father: response.find(father => father.name === person.fatherName),
          century: Math.floor(person.born / 100) + 1,
        }));

        setPeople(preparedPeople);
      } catch (error) {
        setGetError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const filteredPeople = people.filter(person => {
    const matchesQuery =
      person.name.toLowerCase().includes(query.toLowerCase());
    const matchesSex = sex === null || person.sex === sex;
    const matchesCenturies =
      centuries.length === 0 || centuries.includes(String(person.century));

    return matchesQuery && matchesSex && matchesCenturies;
  });

  const sortedPeople = useMemo(() => {
    if (!sortField) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((a, b) => {
      if (a[sortField]! < b[sortField]!) {
        return sortOrder === 'desc' ? 1 : -1;
      }

      if (a[sortField]! > b[sortField]!) {
        return sortOrder === 'desc' ? -1 : 1;
      }

      return 0;
    });
  }, [filteredPeople, sortField, sortOrder]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              setSearchParams={setSearchParams}
              searchParams={searchParams}
            />
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {getError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isLoading && !getError && !filteredPeople.length && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}
              {!isLoading && !getError && filteredPeople.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  setSearchParams={setSearchParams}
                  searchParams={searchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
