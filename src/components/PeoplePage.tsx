/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const filterBySex = searchParams.get('sex') || null;
  const centuriesOption = searchParams.getAll('centuries') || [];
  const sortByUrl = searchParams.get('sort') || null;
  const sortByOrder = searchParams.get('order') || null;
  const { personSlug } = useParams();

  let filteredPeople = [...people];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getPeopleFromServer = await getPeople();

        const peopleFromServer = getPeopleFromServer.map(person => {
          const mother = getPeopleFromServer.find(p => p.name === person.motherName);
          const father = getPeopleFromServer.find(p => p.name === person.fatherName);

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(peopleFromServer);
      } catch {
        setIsError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (filterBySex) {
    filteredPeople = filteredPeople.filter(person => person.sex === filterBySex);
  }

  useEffect(() => {
    if (!query) {
      const updatedSearchParams = getSearchWith(searchParams, { query: null });

      setSearchParams(updatedSearchParams);
    }
  }, [query, searchParams, setSearchParams]);

  const normiliseQuery = (personParentName: string) => {
    return personParentName.toLowerCase().includes(query.toLowerCase());
  };

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      return normiliseQuery(person.name)
        || (person.motherName && normiliseQuery(person.motherName))
        || (person.fatherName && normiliseQuery(person.fatherName));
    });
  }

  if (centuriesOption.length > 0) {
    filteredPeople = filteredPeople.filter((person) => {
      const alivePeriod = Math.ceil(person.born / 100);

      return centuriesOption.includes(alivePeriod.toString());
    });
  }

  if (sortByUrl) {
    filteredPeople = filteredPeople.sort((a, b) => {
      switch (sortByUrl) {
        case 'name': return a.name.localeCompare(b.name);

        case 'sex': return a.sex.localeCompare(b.sex);

        case 'born': return a.born - b.born;

        default: return a.died - b.died;
      }
    });

    if (sortByOrder) {
      filteredPeople.reverse();
    }
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            {!isLoading && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters
                  query={query}
                  filterBySex={filterBySex}
                  centuriesOption={centuriesOption}
                />
              </div>
            )}

            <div className="column">
              <div className="box table-container">
                {filteredPeople.length > 0
                  ? (
                    <PeopleTable
                      slug={personSlug}
                      people={filteredPeople}
                      searchParams={searchParams}
                    />
                  )
                  : (
                    <>
                      {isLoading && <Loader />}
                      {isError && (
                        <p data-cy="peopleLoadingError" className="has-text-danger">
                          {isError}
                        </p>
                      )}
                      {(!isError && people.length === 0 && !isLoading) && (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>

                      )}
                      {(filteredPeople.length === 0 && !isLoading) && (
                        <p>There are no people matching the current search criteria</p>
                      )}
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
