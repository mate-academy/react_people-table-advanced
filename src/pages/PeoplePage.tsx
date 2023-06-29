import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  let visiblePeople = people.filter(person => {
    return person.name.toLowerCase().includes(query.toLowerCase().trim())
      || person.fatherName?.toLowerCase().includes(query.toLowerCase().trim())
      || person.motherName?.toLowerCase().includes(query.toLowerCase().trim());
  });

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(
      searchParams,
      { query: e.target.value || null },
    ));
  };

  const fetchPeople = async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch (error) {
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  if (centuries.length > 0) {
    const getCentury = (person: Person) => Math.ceil(person.born / 100);

    visiblePeople = visiblePeople.filter(
      person => centuries.includes(
        getCentury(person).toString(),
      ),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (sort) {
    visiblePeople.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);

        case 'born':
        case 'died':
          return a[sort] - b[sort];

        default:
          return 0;
      }
    });

    if (isReversed) {
      visiblePeople.reverse();
    }
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && people.length !== 0 && (
              <PeopleFilters
                query={query}
                onQueryChange={onQueryChange}
                centuries={centuries}
                sex={sex}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {loadError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length ? (
                !loadError && !isLoading && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )
              ) : (
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
