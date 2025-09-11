import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { SortField } from '../types/SortFields';

const getPeopleWithParents = (people: Person[]): Person[] => {
  return people.map(person => ({
    ...person,
    mother: people.find(mother => mother.name === person.motherName),
    father: people.find(father => father.name === person.fatherName),
  }));
};

const getPreparedPeople = (
  people: Person[],
  sex: string | null,
  centuries: string[],
  query: string | null,
  sort: SortField | null,
  order: string | null,
) => {
  const filteredPeople = people.filter(person => {
    let matches = true;

    if (sex) {
      matches = matches && person.sex === sex;
    }

    if (centuries.length > 0 && matches) {
      const personCentury = Math.ceil(person.born / 100);
      matches = centuries.includes(String(personCentury));
    }

    if (query && matches) {
      const q = query.toLowerCase();
      matches = (person.name.toLowerCase().includes(q) ||
        person.fatherName?.toLowerCase().includes(q) ||
        person.motherName?.toLowerCase().includes(q)) as boolean;
    }

    return matches;
  });

  if (sort) {
    const dir = order ? -1 : 1;
    filteredPeople.sort((personA, personB) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return personA[sort].localeCompare(personB[sort]) * dir;
        case 'born':
        case 'died':
          return (personA[sort] - personB[sort]) * dir;
        default:
          return 0;
      }
    });
  }

  return filteredPeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  useEffect(() => {
    setError(null);
    setIsLoading(true);

    getPeople()
      .then(response => {
        return getPeopleWithParents(response);
      })
      .then(setPeople)
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedPeople: Person[] = useMemo(() => {
    return getPreparedPeople(people, sex, centuries, query, sort, order);
  }, [people, sex, centuries, query, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoading && !error && !preparedPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!isLoading &&
                !error &&
                people.length > 0 &&
                preparedPeople.length > 0 && (
                  <PeopleTable people={preparedPeople} />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
