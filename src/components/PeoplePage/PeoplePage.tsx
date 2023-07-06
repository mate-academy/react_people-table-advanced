import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { ErrorTypes } from '../../enum/ErrorTypes';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { getFilteredPeople } from '../../utils/getFilteredPeople';
import { getSortedPeople } from '../../utils/getSortedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorTypes>(ErrorTypes.None);
  const [showTable, setShowTable] = useState(false);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const loadPeople = async () => {
    try {
      setLoading(true);
      setError(ErrorTypes.None);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer.map(person => ({
        ...person,
        mother: peopleFromServer.find(
          mother => mother.name === person.motherName,
        ),
        father: peopleFromServer.find(
          father => father.name === person.fatherName,
        ),
      })));

      if (!peopleFromServer) {
        setError(ErrorTypes.Empty);
      }

      setShowTable(true);
    } catch {
      setError(ErrorTypes.Load);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const filteredPeople = getFilteredPeople(people, searchParams);
  const sortedPeople = getSortedPeople(filteredPeople, searchParams);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showTable && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error === ErrorTypes.Load && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {error === ErrorTypes.Empty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showTable && (sortedPeople.length
                ? (
                  <PeopleTable
                    people={sortedPeople}
                    sort={sort}
                    order={order}
                  />
                )
                : (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
