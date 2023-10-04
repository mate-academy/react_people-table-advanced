import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../../api';

import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleFilters } from '../PeopleFilters';

import { peopleFilter } from '../../utils/peopleFilter';
import { getSearchWith } from '../../utils/searchHelper';
import { peopleSort } from '../../utils/peopleSort';

export const PeoplePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sortType = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  const filteredPeople = useMemo(() => {
    return peopleFilter(people, query, centuries, sex);
  }, [people, query, centuries, sex]);

  const visiblePeople = useMemo(() => {
    return peopleSort(filteredPeople, sortType, isReversed);
  }, [sortType, filteredPeople, isReversed]);

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const handleSex = (newSex: string) => {
    setSearchParams(getSearchWith(searchParams, { newSex }));
  };

  const setParents = (data: Person[]) => {
    const preparedData = data.map((person) => {
      return {
        ...person,
        father: data.find((f) => f.name === person.fatherName),
        mother: data.find((m) => m.name === person.motherName),
      };
    });

    setPeople(preparedData);
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setParents)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                centuries={centuries}
                sex={sex}
                handleQuery={handleQuery}
                handleSex={handleSex}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              <PeopleTable
                people={visiblePeople}
                isError={isError}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
