import { useCallback, useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);

  const getPeopleFromServer = useCallback(async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
      setVisiblePeople(peopleFromServer);
    } catch (error) {
      setIsLoadingError(true);
    }
  }, []);

  const filterPeople = (sex: string, query: string, centuries: string[]) => {
    const filteredPeople = people.filter(person => {
      if (sex) {
        return person.sex === sex;
      }

      return true;
    }).filter(person => {
      if (centuries.length > 0) {
        return centuries
          .includes(Math.ceil(person.born / 100).toString());
      }

      return true;
    }).filter(person => {
      if (query) {
        const que = query.toLowerCase();

        return person.name.toLowerCase().includes(que)
          || person.fatherName?.toLowerCase().includes(que)
          || person.motherName?.toLowerCase().includes(que);
      }

      return true;
    });

    setVisiblePeople(filteredPeople);
  };

  const handleFilteredPeople = (
    sex: string,
    query: string,
    centuries: string[],
  ) => {
    filterPeople(sex, query, centuries);
  };

  const isTableVisible = !isLoadingError && people.length < 1;

  useEffect(() => {
    getPeopleFromServer();
  }, [getPeopleFromServer]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isTableVisible
              || <PeopleFilters handleFilteredPeople={handleFilteredPeople} />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoadingError ? (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              ) : (
                <PeopleTable
                  people={visiblePeople}
                  isTableVisible={isTableVisible}
                />
              )}

              <p>There are no people matching the current search criteria</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
