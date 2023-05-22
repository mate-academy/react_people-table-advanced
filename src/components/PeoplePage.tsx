import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { SexCategory } from '../types/SexCategory';

const findParent = (people: Person[], parentName: string | null) => {
  return people.find(parent => parent.name === parentName);
};

export const PeoplePage = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || SexCategory.NONE;
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const loadPeople = useCallback(async () => {
    try {
      const peopleFromServer = await getPeople();

      const formattedPeople = peopleFromServer.map(person => {
        return {
          ...person,
          mother: findParent(peopleFromServer, person.motherName),
          father: findParent(peopleFromServer, person.fatherName),
        };
      });

      setPeople(formattedPeople);
    } catch {
      setLoadingError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPeople();
    setPeople([]);
  }, []);

  const isSearchedPerson = (person: Person) => {
    const formattedQuery = query.toLowerCase();
    const formattedName = person.name.toLowerCase();
    const formattedFatherName = person.fatherName?.toLowerCase();
    const formattedMotherName = person.motherName?.toLowerCase();

    return formattedName.includes(formattedQuery)
          || formattedFatherName?.includes(formattedQuery)
          || formattedMotherName?.includes(formattedQuery);
  };

  const hasCorrectSex = (category: string) => {
    return sex === category
      || sex === SexCategory.NONE;
  };

  const getCentury = (born: number) => {
    return Math.ceil(born / 100);
  };

  const hasCorrectCentury = (born: number) => {
    return (centuries.includes(getCentury(born).toString())
      || !centuries.length);
  };

  const filteredPeople = people.filter(person => {
    return hasCorrectSex(person.sex)
        && isSearchedPerson(person)
        && hasCorrectCentury(person.born);
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {!isLoading && (
                <>
                  {loadingError && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {people.length ? (
                    <PeopleTable
                      people={filteredPeople}
                    />
                  ) : (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
