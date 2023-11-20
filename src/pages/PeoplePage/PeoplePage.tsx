import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters';
import { Filters } from '../../types/Filters';
import { filterPeople } from '../../utils/filterPeople';
import { Sort } from '../../types/Sort';
import { sortPeople } from '../../utils/sortPeople';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[] | []>([]);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  const filters: Filters = useMemo(() => {
    return {
      centuries: (searchParams.getAll('century')),
      sex: (searchParams.get('sex')),
      query: (searchParams.get('query')),
    };
  }, [searchParams]);

  const sorts: Sort = useMemo(() => {
    return {
      sortBy: (searchParams.get('sort')),
      order: (searchParams.get('order')),
    };
  }, [searchParams]);

  useEffect(() => {
    const initialLoad = async () => {
      try {
        const humans = await getPeople();

        setPeople(humans.map(human => {
          return {
            ...human,
            mother: humans.find(person => person.name === human.motherName),
            father: humans.find(person => person.name === human.fatherName),
          };
        }));
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    initialLoad();
  }, []);

  const filteredPeople = sortPeople(filterPeople(people, filters), sorts);

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

              {isLoading
                ? <Loader />
                : (
                  <>
                    {error && (
                      <p
                        data-cy="peopleLoadingError"
                        className="has-text-danger"
                      >
                        Something went wrong
                      </p>
                    )}

                    {!people.length && !isLoading
                      ? (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      )
                      : <PeopleTable people={filteredPeople} />}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
