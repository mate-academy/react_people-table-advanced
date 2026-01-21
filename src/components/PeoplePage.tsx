import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setPeople(null);
    setErrorMessage(null);

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(response => {
        if (!response.ok) {
          setErrorMessage('Something went wrong');
          throw new Error();
        }

        return response.json();
      })
      .then(data => setPeople(data))
      .catch(error => {
        if (error instanceof TypeError) {
          setErrorMessage('Something went wrong');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  let visiblePeople = [...(people || [])];

  if (query) {
    const normalizedQuery = query.toLowerCase();

    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        (person.motherName?.toLowerCase().includes(normalizedQuery) ?? false) ||
        (person.fatherName?.toLowerCase().includes(normalizedQuery) ?? false),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (selectedCenturies.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return selectedCenturies.includes(century.toString());
    });
  }

  if (sortBy) {
    visiblePeople.sort((a, b) => {
      const key = sortBy as keyof Person;
      let result = 0;

      if (sortBy === 'name' || sortBy === 'sex') {
        result = (a[key] as string).localeCompare(b[key] as string);
      } else if (sortBy === 'born' || sortBy === 'died') {
        result = (a[key] as number) - (b[key] as number);
      }

      return order === 'desc' ? -result : result;
    });
  }

  const isDataReady = !loading && !errorMessage && people !== null;

  const isServerEmpty = isDataReady && people.length === 0;

  const noResultsFound =
    isDataReady && people.length > 0 && visiblePeople.length === 0;

  const hasVisiblePeople = isDataReady && visiblePeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people !== null && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {isServerEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noResultsFound && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hasVisiblePeople && (
                <PeopleTable people={visiblePeople} allPeople={people || []} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
