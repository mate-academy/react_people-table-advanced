import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilter/PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable/PeopleTable';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isListEmpty, setIsListEmpty] = useState(false);
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');

  const getPeople = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        'https://mate-academy.github.io/react_people-table/api/people.json', {
          method: 'GET',
        },
      );

      setIsLoading(false);
      const result = await response.json();

      setPeople(result);
      setIsError(false);

      if (result.length === 0) {
        setIsListEmpty(true);
      } else {
        setIsListEmpty(false);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || [];

  const filterCentury = () => {
    const sortedPeople = [...people];

    return sortedPeople.filter(
      (person: Person) => {
        if (centuries.length > 0) {
          if (sex !== 'all') {
            return centuries.includes(String(Math.ceil(person.born / 100)))
            && person.sex === sex
            && person.name.toLowerCase().includes(searchInput.toLowerCase());
          }

          return centuries.includes(String(Math.ceil(person.born / 100)))
           && person.name.toLowerCase().includes(searchInput.toLowerCase());
        }

        if (sex === 'f' || sex === 'm') {
          return person.sex === sex
          && person.name.toLowerCase().includes(searchInput.toLowerCase());
        }

        return person
        && person.name.toLowerCase().includes(searchInput.toLowerCase());
      },
    );
  };

  let result = filterCentury();
  const [visiblePeople, setVisiblePeople] = useState(result);

  useEffect(() => {
    result = filterCentury();
  }, [visiblePeople]);

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && (
              <PeopleFilters
                people={people}
                setVisiblePeople={setVisiblePeople}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!isLoading && isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>)}

              {
                isListEmpty && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )
              }

              {
                !visiblePeople.length && !isLoading && !isError
                && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )
              }

              { !!visiblePeople.length
              && !isLoading
              && !isListEmpty
              && (
                <PeopleTable
                  visiblePeople={result}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
