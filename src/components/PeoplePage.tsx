import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useGetPeople } from '../hook/useGetPeople';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export const PeoplePage = () => {
  const { people, isLoading, isError, peopleLen } = useGetPeople();
  const [searchParams] = useSearchParams();

  const query: string | null = searchParams.get('query');
  const centuries: string[] | null = searchParams.getAll('centuries');
  const sex: string | null = searchParams.get('sex');

  const filteredPeople = useMemo(() => {
    if (!people) {
      return [];
    }

    let result = [...people];

    if (query) {
      result = result.filter(person => {
        return (
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase())
        );
      });
    }

    if (centuries.length !== 0) {
      result = result.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      });
    }

    if (sex) {
      result = result.filter(person => {
        return sex === 'all' ? true : sex === person.sex;
      });
    }

    return result;
  }, [people, query, centuries, sex]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {peopleLen !== 0 && !isError && !isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {peopleLen === 0 && !isError && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/*<p>There are no people matching the current search criteria</p>*/}

              {peopleLen !== 0 && !isError && !isLoading && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
