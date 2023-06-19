import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable';
import { filtersPeople } from '../../utils/filtersPeople';
import { sortPeople } from '../../utils/sortPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [noPeopleMsg, setNoPeopleMsg] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const centuryList = ['16', '17', '18', '19', '20'];

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const filteredPeople = useMemo(() => {
    return filtersPeople(people, query, centuries, sex);
  }, [people, query, centuries, sex]);

  const sortedPeople = useMemo(() => {
    return sortPeople(filteredPeople, order, sort);
  }, [filteredPeople, sort, order]);

  const loadPeople = async () => {
    try {
      setLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer.map(prev => ({
        ...prev,
        motherName: prev.motherName || '-',
        fatherName: prev.fatherName || '-',
        mother: peopleFromServer.find(
          person => person.name === prev.motherName,
        ),
        father: peopleFromServer.find(
          person => person.name === prev.fatherName,
        ),
      })));

      if (!peopleFromServer) {
        setNoPeopleMsg(true);
      }

      setShowTable(true);
    } catch {
      setErrorMsg(true);
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
          {!!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                sex={sex}
                centuries={centuries}
                centuryList={centuryList}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {errorMsg && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {noPeopleMsg && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {(!people.length && !errorMsg && !loading) && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {showTable && (
                <PeopleTable
                  people={sortedPeople}
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
