import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const orderDirection = order ? -1 : 1;

  const showingList = useMemo(() => {
    let peopleToShow = [...people];

    if (sex) {
      peopleToShow = peopleToShow.filter(person => person.sex === sex);
    }

    if (query) {
      peopleToShow = peopleToShow.filter(person =>
        person.name.toLowerCase().includes(query.trim().toLowerCase()),
      );
    }

    if (centuries.length > 0) {
      peopleToShow = peopleToShow.filter(person =>
        centuries.some(
          century => `${person.born}`.slice(0, 2) === `${+century - 1}`,
        ),
      );
    }

    switch (sort) {
      case 'name':
      case 'sex':
        peopleToShow.sort(
          (p1, p2) => p1[sort].localeCompare(p2[sort]) * orderDirection,
        );
        break;

      case 'born':
      case 'died':
        peopleToShow.sort((p1, p2) => (p1[sort] - p2[sort]) * orderDirection);
        break;
    }

    return peopleToShow;
  }, [people, sex, query, centuries, sort, orderDirection]);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const noMatchesMessage = `There are no people matching the current search criteria`;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!error && !loading && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !error && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading &&
                !error &&
                people.length > 0 &&
                showingList.length === 0 && <p>{noMatchesMessage}</p>}

              {!!showingList.length && !error && !loading && (
                <PeopleTable people={showingList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
