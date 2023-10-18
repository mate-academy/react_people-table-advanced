import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

enum SortBy {
  name = 'name',
  sex = 'sex',
  born = 'born',
  died = 'died',
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query')?.toLowerCase() || '';

  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedPeople = () => {
    let filteredPeople = [...people];

    filteredPeople = centuries.length > 0
      ? filteredPeople.filter(person => centuries
        .includes(Math.ceil(+person.born / 100).toString()))
      : filteredPeople;

    filteredPeople = sex
      ? filteredPeople.filter(person => person.sex === sex)
      : filteredPeople;

    filteredPeople = query
      ? filteredPeople.filter(person => (
        person.name.toLowerCase().includes(query)
        || person.motherName?.toLowerCase().includes(query)
        || person.fatherName?.toLowerCase().includes(query)
      ))
      : filteredPeople;

    if (sortBy) {
      switch (sortBy) {
        case SortBy.name:
        case SortBy.sex:
          filteredPeople.sort((person1, person2) => {
            return person1[sortBy].localeCompare(person2[sortBy]);
          });
          break;

        case SortBy.born:
        case SortBy.died:
          filteredPeople.sort((person1, person2) => {
            return person1[sortBy] - person2[sortBy];
          });
          break;

        default:
          return filteredPeople;
      }
    }

    if (sortOrder) {
      filteredPeople.reverse();
    }

    return filteredPeople;
  };

  return (
    <>
      <h1 className="title">
        People Page
      </h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && people.length > 0 && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (<Loader />)}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !hasError && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && !isLoading && (
                <PeopleTable people={preparedPeople()} />
              )}

              {!preparedPeople().length && !isLoading && !hasError && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
