import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { getExtendedPersonList } from '../utils/getExtendedPersonList';

const SortType = {
  NAME: 'name',
  SEX: 'sex',
  BORN: 'born',
  DIED: 'died',
};

function getNameMatches(name: string, query: string) {
  return name.toLocaleLowerCase().includes(query);
}

function getFilteredPersonList(
  data: Person[],
  query: string | null,
  filterStatus: string,
  centuries: string[],
  sort: string,
  order: string,
) {
  let resultData = [...data];

  if (filterStatus) {
    resultData = resultData.filter(person => person.sex === filterStatus);
  }

  if (query) {
    resultData = resultData.filter(person => {
      const { name, motherName, fatherName } = person;
      const lowerQuery = query.toLocaleLowerCase();
      const nameMatches = getNameMatches(name, lowerQuery);
      const motherNameMatches =
        motherName && getNameMatches(motherName, lowerQuery);
      const fatherNameMatches =
        fatherName && getNameMatches(fatherName, lowerQuery);

      return nameMatches || motherNameMatches || fatherNameMatches;
    });
  }

  if (centuries.length) {
    resultData = resultData.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  if (sort && Object.values(SortType).includes(sort)) {
    resultData = resultData.sort((person1, person2) => {
      switch (sort) {
        case SortType.NAME:
        case SortType.SEX:
          return person1[sort].localeCompare(person2[sort]);

        case SortType.DIED:
        case SortType.BORN:
          return person1[sort] - person2[sort];

        default:
          return 0;
      }
    });
  }

  if (order === 'desc') {
    resultData.reverse();
  }

  return resultData;
}

export const PeoplePage = () => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  const currentQuery = searchParams.get('query');
  const currentFilter = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const visiblePersonList = getFilteredPersonList(
    data,
    currentQuery,
    currentFilter,
    selectedCenturies,
    sortBy,
    order,
  );

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => setData(getExtendedPersonList(response)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isEmptyList = !data.length && !hasError;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader></Loader>
              ) : (
                <>
                  {hasError && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {isEmptyList && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!isEmptyList && <PeopleTable data={visiblePersonList} />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
