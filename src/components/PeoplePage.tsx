/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { SortField } from '../types/sortField';
import { Person } from '../types/Person';

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
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortField = searchParams.get('sort') as SortField || SortField.All;
  const sortOrder = searchParams.get('order') || '';

  const preparePeople = () => {
    setIsPending(true);

    getPeople().then(result => {
      const prepared = result.map(person => ({
        ...person,
        father: getParent(result, person, 'father'),
        mother: getParent(result, person, 'mother'),
      }));

      setPeople(prepared);
    })
      .catch(() => setIsError(true))
      .finally(() => setIsPending(false));
  };

  const filterAndSortPeople = (people: Person[], params: Params) => {
    let initial = people;

    if (params.sex) {
      initial = initial.filter(person => person.sex === params.sex);
    }

    if (params.query) {
      const normalizedQuery = params.query.toLowerCase();

      initial = initial
        .filter(({ name, motherName, fatherName }) => {
          const byName = name.toLowerCase().includes(normalizedQuery);
          const byMotherName = motherName?.toLowerCase().includes(normalizedQuery);
          const byFatherName = fatherName?.toLowerCase().includes(normalizedQuery);

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
      const order = params.sortOrder ? -1 : 1;

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
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        {isPending
          ? <Loader />
          : (
            <>
              <div className="columns is-desktop is-flex-direction-row-reverse">
                <div className="column is-7-tablet is-narrow-desktop">
                  <PeopleFilters />
                </div>
                <div className="column">
                  <div className="box table-container">
                    <PeopleTable
                      onError={isError}
                      people={visiblePeople}
                    />

                    {isError && (
                      <p
                        data-cy="peopleLoadingError"
                        className="has-text-danger"
                      >
                        Something went wrong
                      </p>
                    )}
                  </div>
                </div>
              </div>

            </>
          )}
      </div>
    </>
  );
};
