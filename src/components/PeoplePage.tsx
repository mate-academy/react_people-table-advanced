import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader/';
import { Person } from '../types/Person';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../types/SortBy';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparePeople = (filteredArr: Person[]) => {
    let filteredPeople = [...filteredArr];

    if (query) {
      filteredPeople = filteredPeople.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query),
      );
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (sortBy) {
      filteredPeople.sort((pers1, pers2) => {
        switch (sortBy) {
          case SortBy.name:
          case SortBy.sex:
            return pers1[sortBy].localeCompare(pers2[sortBy]);

          case SortBy.born:
          case SortBy.died:
            return pers1[sortBy] - pers2[sortBy];

          default:
            return 0;
        }
      });
    }

    if (sortOrder) {
      filteredPeople.reverse();
    }

    return filteredPeople;
  };

  const preparedPeople = preparePeople(peopleFromServer);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && peopleFromServer.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!peopleFromServer.length && !hasError && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!preparedPeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!preparedPeople.length && !isLoading && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
