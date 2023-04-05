import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { PageTitle } from './PageTitle';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';
  const centuriesParam = searchParams.getAll('centuries');
  const centuries = centuriesParam.length > 0 ? centuriesParam : [];

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const people = await getPeople();

        setData(people);
        setAllPeople(people);
      } catch (fetchError) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredData = (peopleData: Person[]) => {
    const matchesQuery = (str: string | null, queryLower: string) => {
      return str && str.toLowerCase().includes(queryLower);
    };

    let filteredDataByParams = peopleData.filter((person) => {
      // Filter by query (name)
      if (query) {
        const queryLower = query.toLowerCase();
        const nameMatches = matchesQuery(person.name, queryLower);
        const fatherMatches = matchesQuery(person.fatherName, queryLower);
        const motherMatches = matchesQuery(person.motherName, queryLower);

        if (!nameMatches && !fatherMatches && !motherMatches) {
          return false;
        }
      }

      // Filter by sex
      if (sex && person.sex !== sex) {
        return false;
      }

      // Filter by centuries
      if (centuries.length > 0) {
        const birthCentury = Math.floor(person.born / 100) + 1;

        if (!centuries.some((century) => century === birthCentury.toString())) {
          return false;
        }
      }

      return true;
    });

    // Sort filtered data based on the 'sort' parameter
    if (sort === 'sex') {
      filteredDataByParams = filteredDataByParams.sort((a, b) => {
        const compare = a.sex.localeCompare(b.sex);

        return order === 'asc' ? compare : -compare;
      });
    }

    if (sort === 'born') {
      filteredDataByParams = filteredDataByParams.sort((a, b) => {
        return order === 'asc' ? a.born - b.born : b.born - a.born;
      });
    }

    if (sort === 'died') {
      filteredDataByParams = filteredDataByParams.sort((a, b) => {
        return order === 'asc' ? a.died - b.died : b.died - a.died;
      });
    }

    if (sort === 'name') {
      filteredDataByParams = filteredDataByParams.sort((a, b) => {
        const compare = a.name.localeCompare(b.name);

        return order === 'asc' ? compare : -compare;
      });
    }

    return filteredDataByParams;
  };

  const filteredPeople = filteredData(data);

  return (
    <>
      <PageTitle title="People Page" />

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && data.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable
                  data={filteredPeople}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  allData={allPeople}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
