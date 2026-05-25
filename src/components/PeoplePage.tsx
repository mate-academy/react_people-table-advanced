import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../types';

export const PeoplePage = () => {
  const { personSlug } = useParams<{ personSlug?: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    personSlug || null,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex');

  const centuriesFilter = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const filteredPeople = people
    .filter(person => !sexFilter || person.sex === sexFilter)
    .filter(person => {
      if (centuriesFilter.length === 0) {
        return true;
      }

      const personCentury = Math.ceil(person.born / 100).toString();

      return centuriesFilter.includes(personCentury);
    })
    .filter(
      person =>
        !query ||
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase()),
    );

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    const valueA = a[sortField as keyof Person];
    const valueB = b[sortField as keyof Person];
    let result = 0;

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      result = valueA - valueB;
    } else {
      result = String(valueA).localeCompare(String(valueB));
    }

    return sortOrder === 'desc' ? -result : result;
  });

  useEffect(() => {
    setTimeout(() => {
      fetch('https://mate-academy.github.io/react_people-table/api/people.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }

          return response.json();
        })
        .then(data => {
          setPeople(data);
          setErrorMessage(null);
          setIsLoading(false);
        })
        .catch(error => {
          setErrorMessage(error.message || 'Something went wrong');
          setIsLoading(false);
        });
    }, 10);
  }, []);

  useEffect(() => {
    setSelectedSlug(personSlug || null);
  }, [personSlug]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !errorMessage && people.length > 0 && (
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && (
                <>
                  {errorMessage && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {people.length === 0 && !errorMessage && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {people.length > 0 && !errorMessage && (
                    <PeopleTable
                      people={sortedPeople}
                      selectedSlug={selectedSlug}
                      onSelect={setSelectedSlug}
                    />
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
