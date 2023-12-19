import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  const { personName } = useParams();
  const selectedPerson: string = personName ?? '';

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then((list: Person[]) => {
        setPeopleList(list);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const peopleListToShow = useMemo(() => {
    const query = searchParams.get('query') || '';
    const centuries = searchParams.getAll('centuries') || [];
    const sex = searchParams.get('sex') || '';
    const sort = searchParams.get('sort') || '';
    const order = searchParams.get('order') || '';

    let newList = [...peopleList];

    if (query) {
      newList = newList.filter(person => {
        return person.name.toLowerCase().includes(query.toLowerCase())
          || person.motherName?.toLowerCase().includes(query.toLowerCase())
          || person.fatherName?.toLowerCase().includes(query.toLowerCase());
      });
    }

    if (sex) {
      newList = newList.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      newList = newList.filter(person => {
        const calculatedCentury = Math.ceil(person.born / 100);

        return centuries.includes(calculatedCentury.toString());
      });
    }

    if (sort) {
      return newList.sort((person1, person2) => {
        const value1 = person1[sort as keyof Person];
        const value2 = person2[sort as keyof Person];

        if (typeof value1 === 'number' && typeof value2 === 'number') {
          if (order) {
            return value2 - value1;
          }

          return value1 - value2;
        }

        if (typeof value1 === 'string' && typeof value2 === 'string') {
          if (order) {
            return value2.localeCompare(value1);
          }

          return value1.localeCompare(value2);
        }

        return typeof value1 === 'number' ? -1 : 1;
      });
    }

    return newList;
  }, [peopleList, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {hasError ? (
                    <p
                      data-cy="peopleLoadingError"
                      className="has-text-danger"
                    >
                      Something went wrong
                    </p>
                  ) : (
                    <PeopleTable
                      peopleList={peopleListToShow}
                      selectedPerson={selectedPerson}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
