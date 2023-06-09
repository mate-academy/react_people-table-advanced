import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { filtersPeople } from '../../utils/filtersPeople';
import { sortPeople } from '../../utils/sortPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isShowTable, setShowTableAndFilter] = useState(false);
  const [isErrorLoading, setErrorLoading] = useState(false);
  const [IsNoPeopleMessage, setNoPeopleMessage] = useState(false);

  const [serchParams] = useSearchParams();

  const query = serchParams.get('query') || '';
  const centuries = serchParams.getAll('centuries') || [];
  const sex = serchParams.get('sex') || null;
  const sort = serchParams.get('sort') || null;
  const order = serchParams.get('order') || null;

  const filteredPeople = useMemo(() => {
    return filtersPeople(people, query, centuries, sex);
  }, [people, query, centuries, sex]);

  const sortedPeople = useMemo(() => {
    return sortPeople(filteredPeople, order, sort);
  }, [sort, order, filteredPeople]);

  const visibilitePeople = sortedPeople;

  const findPerson = (personName: string | null, peopleData: Person[]) => {
    return peopleData.find(person => person.name === personName);
  };

  const loadPeople = async () => {
    try {
      setLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer.map((prev) => ({
        ...prev,
        motherName: prev.motherName || '-',
        fatherName: prev.fatherName || '-',
        mother: findPerson(prev.motherName, peopleFromServer),
        father: findPerson(prev.fatherName, peopleFromServer),
      })));

      if (!peopleFromServer) {
        setNoPeopleMessage(true);
      }

      setShowTableAndFilter(true);
    } catch {
      setErrorLoading(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {(people.length !== 0) && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                centuries={centuries}
                sex={sex}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isErrorLoading && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {IsNoPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(people.length === 0 && !isErrorLoading
                && !isLoading) && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {(isShowTable && filteredPeople.length !== 0)
                && (
                  <PeopleTable
                    people={visibilitePeople}
                    sort={sort}
                    order={order}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
