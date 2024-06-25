import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query' || '');
  const sex = searchParams.get('sex' || null);
  const centuries = searchParams.getAll('centuries' || []);

  useEffect(() => {
    setLoading(true);
    setErrorMessage(false);
    getPeople()
      .then(fetchedPeoples =>
        fetchedPeoples.map(people => ({
          ...people,
          mother: fetchedPeoples.find(
            mother => mother.name === people.motherName,
          ),

          father: fetchedPeoples.find(
            father => father.name === people.fatherName,
          ),
        })),
      )
      .then(setPeoples)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  const preparePeople = useMemo(() => {
    let preparedPeople = [...peoples];
    const normalizedQuery = query?.trim().toLowerCase();

    if (normalizedQuery) {
      preparedPeople = preparedPeople.filter(
        person =>
          person.name.toLowerCase().includes(normalizedQuery) ||
          person.fatherName?.toLowerCase().includes(normalizedQuery) ||
          person.motherName?.toLowerCase().includes(normalizedQuery),
      );
    }

    if (sex) {
      preparedPeople = preparedPeople.filter(person => person.sex === sex);
    }

    if (!!centuries.length) {
      preparedPeople = preparedPeople.filter(person =>
        centuries.some(century => Math.ceil(person.born / 100) === +century),
      );
    }

    return preparedPeople;
  }, [centuries, query, sex, peoples]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!peoples.length && !loading && !errorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !!peoples.length && (
                <>
                  {!preparePeople.length ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable peoples={preparePeople} />
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
