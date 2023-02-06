import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { SortPeople } from '../utils/SortPeople';

export const PeoplePage:React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [didload, setLoaded] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = (searchParams.get('query') || '').toLowerCase().trim();
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const sortField = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  useEffect(() => {
    const loadPeople = async () => {
      setLoading(true);
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
        setLoaded(true);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, [getPeople]);

  const filterByQuery = (
    person: Person,
  ) => person.name.toLowerCase().includes(query)
      || person.motherName?.toLowerCase().includes(query)
      || person.fatherName?.toLowerCase().includes(query);

  const filterByCentury = (person: Person) => (
    centuries.length
      ? centuries.includes(String(Math.ceil(person.died / 100)))
      : true);

  const filterBySex = (person: Person) => (
    sex
      ? person.sex === sex
      : true
  );

  const visiblePeople = people.filter(
    person => filterByQuery(person)
    && filterByCentury(person)
    && filterBySex(person),
  );

  SortPeople(visiblePeople, sortField, order);

  const showTable = !isLoading
    && didload
    && !hasError
    && visiblePeople.length > 0;

  const noSearchResult = !isLoading
    && didload
    && !hasError
    && !visiblePeople.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {showTable && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {didload && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noSearchResult && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showTable && (
                <PeopleTable
                  people={visiblePeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
