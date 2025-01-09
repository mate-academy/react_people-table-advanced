import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { SORT_BY } from '../types/Sort';

function getFilteredPeople(people: Person[], searchParams: URLSearchParams) {
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const order = searchParams.get('order') || '';
  const sort = (searchParams.get('sort') as keyof Person | '') || '';
  let copy = [...people];

  if (sort) {
    copy = copy.sort((a, b) => {
      const valueOne: Person = a;
      const valueTwo: Person = b;

      const desc = order ? -1 : 1;

      switch (sort) {
        case SORT_BY.name:
        case SORT_BY.sex:
          return (
            (valueOne[sort] as string).localeCompare(valueTwo[sort] as string) *
            desc
          );
        case SORT_BY.died:
        case SORT_BY.born:
          return (
            ((valueOne[sort] as number) - (valueTwo[sort] as number)) * desc
          );
        default:
          return 0;
      }
    });
  }

  if (sex) {
    copy = copy.filter(p => p.sex === sex);
  }

  if (query) {
    const lowQuery = query.toLowerCase();

    copy = copy.filter(
      p =>
        p.name.toLowerCase().includes(lowQuery) ||
        p.motherName?.toLowerCase().includes(lowQuery) ||
        p.fatherName?.toLowerCase().includes(lowQuery),
    );
  }

  if (centuries.length > 0) {
    const numCenturies = centuries.map(c => +c);

    copy = copy.filter(p => {
      const centuryBorn =
        p.born % 100 === 0 ? p.born / 100 : Math.ceil(p.born / 100);

      return numCenturies.includes(centuryBorn);
    });
  }

  return copy;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  const filteredPeople = getFilteredPeople(people, searchParams);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {error ? (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  ) : (
                    <>
                      {people.length === 0 ? (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      ) : (
                        <>
                          {filteredPeople.length === 0 ? (
                            <p>
                              There are no people matching the current search
                              criteria
                            </p>
                          ) : (
                            <PeopleTable
                              people={filteredPeople}
                              peopleFromAPI={people}
                            />
                          )}
                        </>
                      )}
                    </>
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
