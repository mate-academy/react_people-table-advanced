import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { SortField } from '../types/sortField';

export enum ErrorTypes {
  Api = 'Something went wrong',
  NotData = 'There are no people on the server',
  SearchError = 'There are no people matching the current search criteria',
}

type Parent = 'father' | 'mother';

type Params = {
  sex: string
  query: string
  centuries: string[]
  sortField: SortField
  sortOrder: string
};

const getParent = (
  people: Person[],
  person: Person,
  parent: Parent,
) => {
  if (parent === 'father') {
    return people.find(({ name }) => name === person.fatherName);
  }

  return people.find(({ name }) => name === person.motherName);
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorTypes | null>(null);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortField = searchParams.get('sort') as SortField || SortField.All;
  const sortOrder = searchParams.get('order') || '';

  const preparePeople = () => {
    setIsLoading(true);

    getPeople().then(res => {
      const prepared = res.map(person => ({
        ...person,
        father: getParent(res, person, 'father'),
        mother: getParent(res, person, 'mother'),
      }));

      setPeople(prepared);
    })
      .catch(() => {
        setIsLoading(true);

        if (!people) {
          setError(ErrorTypes.Api);
        }

        if (people.length === 0) {
          setError(ErrorTypes.NotData);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const filterAndSortPeople = (peoples: Person[], params: Params) => {
    let initial = peoples;

    if (params.sex) {
      initial = initial.filter(person => person.sex === params.sex);
    }

    if (params.query) {
      const normalizedQuery = params.query.toLowerCase().trim();

      initial = initial
        .filter(({ name, motherName, fatherName }) => {
          const byName = name.toLowerCase().includes(normalizedQuery);
          const byMotherName = motherName?.toLowerCase()
            .includes(normalizedQuery);
          const byFatherName = fatherName?.toLowerCase()
            .includes(normalizedQuery);

          return byName || byMotherName || byFatherName;
        });
    }

    if (params.centuries.length > 0) {
      initial = initial.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return params.centuries.includes(century);
      });
    }

    if (params.sortField) {
      const order = params.sortOrder === 'desc' ? -1 : 1;

      initial = [...initial].sort((p1, p2) => {
        switch (params.sortField) {
          case SortField.Born:
          case SortField.Died:
            return (p1[params.sortField] - p2[params.sortField]) * order;
          case SortField.Name:
          case SortField.Sex:
            return p1[params.sortField]
              .localeCompare(p2[params.sortField]) * order;
          default:
            return 0;
        }
      });
    }

    return initial;
  };

  const visiblePeople = useMemo(() => filterAndSortPeople(people,
    {
      sex,
      query,
      centuries,
      sortField,
      sortOrder,
    }), [sex, query, centuries, sortField, sortOrder]);

  useEffect(() => {
    preparePeople();
  }, [sortOrder]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading
            && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
            )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error === ErrorTypes.Api
                && (
                  <p
                    data-cy="peopleLoadingError"
                    className="has-text-danger"
                  >
                    {ErrorTypes.Api}
                  </p>
                )}

              {error === ErrorTypes.NotData
                && (
                  <p
                    data-cy="noPeopleMessage"
                    className="has-text-danger"
                  >
                    {ErrorTypes.NotData}
                  </p>
                )}

              {error === ErrorTypes.SearchError
                && (
                  <p
                    className="has-text-danger"
                  >
                    {ErrorTypes.SearchError}
                  </p>
                )}

              <PeopleTable
                persons={visiblePeople}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
