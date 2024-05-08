import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { SortTypes } from '../types/SortTypes';
import { SexFilters } from '../types/SexFilters';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  function addParents(person: Person, peopleFromServer: Person[]) {
    const mother = peopleFromServer.find(
      pers => pers.name === person.motherName,
    );
    const father = peopleFromServer.find(
      pers => pers.name === person.fatherName,
    );

    return { ...person, father, mother };
  }

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(result => {
        setPeople(result.map(person => addParents(person, result)));
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  const visiblePeople = useMemo(() => {
    let formattedPeople = [...people];

    switch (searchParams.get('sort')) {
      case SortTypes.Name:
        formattedPeople.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case SortTypes.Sex:
        formattedPeople.sort((a, b) => a.sex.localeCompare(b.sex));
        break;

      case SortTypes.Born:
        formattedPeople.sort((a, b) => a.born - b.born);
        break;

      case SortTypes.Died:
        formattedPeople.sort((a, b) => a.died - b.died);
        break;

      default:
        break;
    }

    if (searchParams.get('order') === 'desc') {
      formattedPeople.reverse();
    }

    switch (searchParams.get('sex')) {
      case SexFilters.Male:
        formattedPeople = formattedPeople.filter(person => person.sex === 'm');
        break;

      case SexFilters.Female:
        formattedPeople = formattedPeople.filter(person => person.sex === 'f');
        break;

      default:
        break;
    }

    if (query) {
      formattedPeople = formattedPeople.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries.length > 0) {
      formattedPeople = formattedPeople.filter(person =>
        centuries.includes(String(Math.floor(person.born / 100) + 1)),
      );
    }

    return formattedPeople;
  }, [people, searchParams, query, centuries]);

  const isValidToLoad =
    !isError && !isLoading && people.length > 0 && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            {isError ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            ) : (
              <div className="box table-container">
                {isLoading && !isError && <Loader />}
                {!isError && !isLoading && people.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
                {isValidToLoad ? (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                ) : (
                  <PeopleTable people={visiblePeople} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
