import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person, SortBy } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

type Filter = {
  query: string | null;
  sex: string | null;
  centuries: string[];
};

type Sort = {
  sortName: string | null;
  order: string | null;
};

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const filterParams: Filter = {
    query: searchParams.get('query') || null,
    sex: searchParams.get('sex') || null,
    centuries: searchParams.getAll('centuries') || [],
  };

  const sortParams: Sort = {
    sortName: searchParams.get('sort') || null,
    order: searchParams.get('order') || null,
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const people: Person[] = peopleFromServer.map(person => ({
    ...person,
    mother: peopleFromServer.find(p => p.name === person.motherName),
    father: peopleFromServer.find(p => p.name === person.fatherName),
  }));

  const getPrepearedPeople = (
    peopleTable: Person[],
    filter: Filter,
    sort: Sort,
  ) => {
    let prepearedPeople = [...peopleTable];
    const { query, sex, centuries } = filter;
    const { sortName, order } = sort;

    if (query) {
      prepearedPeople = prepearedPeople.filter(
        p =>
          p.name.toLowerCase().includes(query.trim().toLowerCase()) ||
          p.motherName?.toLowerCase().includes(query.trim().toLowerCase()) ||
          p.fatherName?.toLowerCase().includes(query.trim().toLowerCase()),
      );
    }

    if (sex) {
      prepearedPeople = prepearedPeople.filter(p => p.sex === sex);
    }

    if (centuries.length > 0) {
      prepearedPeople = prepearedPeople.filter(p =>
        centuries.includes(String(Math.ceil(p.born / 100))),
      );
    }

    if (sortName) {
      prepearedPeople.sort((a, b) => {
        switch (sortName) {
          case SortBy.name:
          case SortBy.sex:
            return a[sortName].localeCompare(b[sortName]);

          case SortBy.born:
          case SortBy.died:
            return a[sortName] - b[sortName];

          default:
            return 0;
        }
      });
    }

    if (order) {
      return prepearedPeople.reverse();
    }

    return prepearedPeople;
  };

  const isNoPeopleMessage = !error && !people.length && !isLoading;
  const isShowPeopleTable = !isLoading && !error && !people.length;

  const handleGetPeople = getPrepearedPeople(people, filterParams, sortParams);

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
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {handleGetPeople.length && !isShowPeopleTable ? (
                <PeopleTable people={handleGetPeople} />
              ) : (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
