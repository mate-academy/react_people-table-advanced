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

      if (!result.length) {
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
  const sex = searchParams.get('sex') || '';
  const checkSex = (person: Person) => person.sex === sex;
  const checkCentury = (person: Person) => {
    return centuries.includes(String(Math.ceil(person.born / 100)));
  };

  const checkName = (person: Person) => {
    return person.name.toLowerCase().includes(searchInput.toLowerCase());
  };

  const filterSearch = () => {
    const sortedPeople = [...people];

    return sortedPeople.filter(
      (person: Person) => {
        if (centuries.length > 0) {
          if (sex) {
            return checkCentury(person)
            && checkSex(person)
            && checkName(person);
          }

          return checkCentury(person)
          && checkName(person);
        }

        if (sex) {
          return checkSex(person)
          && checkName(person);
        }

        return person
        && checkName(person);
      },
    );
  };

  let result = filterSearch();
  const [visiblePeople, setVisiblePeople] = useState<Person[]>(result);

  useEffect(() => {
    result = filterSearch();
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
                setSearchInput={setSearchInput}
                searchInput={searchInput}
                setVisiblePeople={setVisiblePeople}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!isLoading && isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>)}

              {isListEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!result.length && !isLoading && !isError
                && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              { !!result.length
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
