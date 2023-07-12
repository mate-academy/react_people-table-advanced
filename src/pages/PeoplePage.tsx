import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { getVisiblePeople } from '../helpers/helpers';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>('');
  const [gender, setGender] = useState('all');

  const handleGenderFilter = (sex: string) => {
    setGender(sex);
    if (gender !== 'all') {
      searchParams.append('sex', gender);
    } else {
      searchParams.delete('sex');
    }

    setSearchParams(searchParams);
  };

  const handleQueryChange = (newQuery: string) => {
    const normalizedQuery = newQuery.toLowerCase();

    if (normalizedQuery) {
      searchParams.set('query', normalizedQuery);
    } else {
      searchParams.delete('sex');
    }

    setQuery(normalizedQuery);
    setSearchParams(searchParams);
  };

  const resetAllFilters = () => {
    setQuery('');
  };

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);

      try {
        const response = await getPeople();

        setPeople(response);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(`Something went wrong: ${error.message}`);
        }
      }

      setIsLoading(false);
    };

    fetchPeople();
  }, []);

  const peopleWithParents = getVisiblePeople(people);
  const visiblePeople = peopleWithParents
    .filter(person => {
      if (gender !== 'all') {
        return person.sex === gender;
      }

      return person;
    })
    .filter(person => {
      const { name, fatherName, motherName } = person;

      return name.toLowerCase().includes(query)
        || fatherName?.toLowerCase().includes(query)
        || motherName?.toLowerCase().includes(query);
    });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              query={query}
              setQuery={handleQueryChange}
              onReset={resetAllFilters}
              gender={gender}
              handleGenderFilter={handleGenderFilter}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {!isLoading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeople.length === 0 ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
