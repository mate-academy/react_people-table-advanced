import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { peopleWithPerents } from '../utils/peopleWithParents';
import { SortBy } from '../types/SortBy';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(data => setPeople(peopleWithPerents(data)))
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
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

  const preparedPeople = preparePeople(people);

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
              {loading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !errorMessage && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {preparedPeople.length === 0 && !loading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {preparedPeople.length > 0 && !loading && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
