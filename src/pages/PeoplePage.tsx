import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import PeopleTable from '../components/PeopleTable';
import { Person, SortField } from '../types';
import { filterAndSortPeople } from '../utils/filterPeople';

type Parent = 'father' | 'mother';

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

const PeoplePage: React.FC = () => {
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

export default PeoplePage;
