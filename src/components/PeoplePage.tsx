import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters/PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useState, useEffect } from 'react';
import type { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const activeSex = searchParams.get('sex');
  const searchQuery = searchParams.get('query') || '';
  const activeCenturies = searchParams.getAll('centuries');

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredPeople = people.filter(person => {
    // Якщо обрано жіночу стать, але у людини стать інша — відсіюємо її
    if (activeSex === 'f') {
      if (person.sex !== activeSex) {
        return false;
      }
    }

    // Якщо обрано чоловічу стать, але у людини стать інша — відсіюємо її
    if (activeSex === 'm') {
      if (person.sex !== activeSex) {
        return false;
      }
    }

    if (searchQuery) {
      const normalizedQuery = searchQuery.toLocaleLowerCase();
      const nameMatches = person.name.toLowerCase().includes(normalizedQuery);
      const motherMatches = person.motherName
        ? person.motherName.toLowerCase().includes(normalizedQuery)
        : false;
      const fatherMatches = person.fatherName
        ? person.fatherName.toLowerCase().includes(normalizedQuery)
        : false;

      if (!nameMatches && !motherMatches && !fatherMatches) {
        return false;
      }
    }

    if (activeCenturies.length > 0) {
      // Визначаємо століття народження людини
      const personCentury = Math.ceil(person.born / 100).toString();

      // Якщо століття поточної людини немає серед вибраних в URL — відсіюємо її
      if (!activeCenturies.includes(personCentury)) {
        return false;
      }
    }

    // Якщо людина пройшла попередні перевірки (стать підійшла і пошук підійшов) — повертаємо true
    return true;
  });

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
                  {isError ? (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  ) : (
                    <>
                      {people.length === 0 ? (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      ) : (
                        <>
                          {filteredPeople.length === 0 ? (
                            <p>
                              There are no people matching the current search
                              criteria
                            </p>
                          ) : (
                            <PeopleTable
                              people={filteredPeople}
                              selectedSlug={slug}
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
