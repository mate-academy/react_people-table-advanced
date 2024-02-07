import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [people, setPeople] = useState<Person[] | undefined>(undefined);
  const [searchParams] = useSearchParams();

  const sortType = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredPeople = people?.filter(person => {
    const century = person.born.toFixed(2).slice(0, 2);

    const sexMatch = !sex || sex === person.sex;
    const queryMatch = !query
      || person.name.toLowerCase().includes(query)
      || person.fatherName?.toLowerCase().includes(query)
      || person.motherName?.toLowerCase().includes(query);
    const centuryMatch = !centuries.length || centuries.includes(century);

    return sexMatch && queryMatch && centuryMatch;
  });

  const getSortedPeople = () => {
    if (!sortType) {
      return filteredPeople;
    }

    if (sortType === 'name') {
      filteredPeople?.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortType === 'sex') {
      filteredPeople?.sort((a, b) => a.sex.localeCompare(b.sex));
    }

    if (sortType === 'born') {
      filteredPeople?.sort((a, b) => a.born - b.born);
    }

    if (sortType === 'died') {
      filteredPeople?.sort((a, b) => a.died - b.died);
    }

    return sortOrder === 'desc' ? filteredPeople?.reverse() : filteredPeople;
  };

  const preparePeople = getSortedPeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && people && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && (<Loader />)}

              {errorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people?.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !filteredPeople && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {!loading && preparePeople && (
                <PeopleTable people={preparePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
