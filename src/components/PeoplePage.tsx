import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';

function getExtendedPersonList(data: Person[]): Person[] {
  return data.map(person => {
    return {
      ...person,
      mother: data.find(curPerson => person.motherName === curPerson.name),
      father: data.find(curPerson => person.fatherName === curPerson.name),
    };
  });
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
      if (person.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
        return true;
      }

      let result = false;

      if (person.motherName) {
        result = person.motherName
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase());
      }

      if (person.fatherName && !result) {
        result = person.fatherName
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase());
      }

      return result;
    });
  }

  if (centuries.length) {
    resultData = resultData.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  if (sort) {
    resultData = resultData.sort((person1, person2) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return person1[sort].localeCompare(person2[sort]);

        case 'born':
        case 'died':
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
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );
        const jsonData = await response.json();

        setData(getExtendedPersonList(jsonData));
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
              ) : hasError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : !data.length ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable data={visiblePersonList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
