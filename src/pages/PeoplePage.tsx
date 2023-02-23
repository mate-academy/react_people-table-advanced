import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [isErorrOnLoadPeople, setIsErorrOnLoadPeople] = useState(false);
  const [isNoPeopleOnServer, setIsNoPeopleOnServer] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const centurias = searchParams.getAll('centuries');
  const query = searchParams.get('query');

  const loadPeople = async () => {
    setIsloading(true);

    try {
      setIsErorrOnLoadPeople(false);

      const result = await getPeople();

      const personWithParents = result.map(person => {
        const mother = result.find(m => m.name === person.motherName);
        const father = result.find(f => f.name === person.fatherName);

        return { ...person, mother, father };
      });

      if (result.length !== 0) {
        setPeoples(personWithParents);
      } else {
        setIsNoPeopleOnServer(true);
      }
    } catch {
      setIsErorrOnLoadPeople(true);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const visiblePeople = peoples.filter(people => {
    const isSexFilter = sex
      ? people.sex === sex
      : true;

    const isCenturyFilter = centurias?.length
      ? centurias.includes(String(Math.floor(people.born / 100) + 1))
      : true;

    const isQueryFilter = query
      ? people.name.toLowerCase().includes(query.toLowerCase())
          || people.motherName?.toLowerCase().includes(query.toLowerCase())
          || people.fatherName?.toLowerCase().includes(query.toLowerCase())
      : true;

    return isSexFilter && isCenturyFilter && isQueryFilter;
  });

  const isNoPeopleMatchingSearchCriteria = visiblePeople.length === 0
    && !isLoading && !isErorrOnLoadPeople;

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

              {isErorrOnLoadPeople && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoPeopleMatchingSearchCriteria && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && (
                <PeopleTable
                  persons={visiblePeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
