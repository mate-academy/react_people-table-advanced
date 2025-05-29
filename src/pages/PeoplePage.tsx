import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useMemo } from 'react';
import { getPeople } from '../api';
import { usePeoples } from '../store/PeopleContext';
import { useError } from '../store/ErrorContext';
import { useLoading } from '../store/LoadingContext';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { peoples, setPeoples } = usePeoples();
  const { error, setError, noMatch, setNoMatch } = useError();
  const { isLoading, setLoading } = useLoading();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const gender = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  useEffect(() => {
    setError(false);
    setLoading(true);

    getPeople()
      .then(setPeoples)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setError, setLoading, setPeoples]);

  const filteredAndSortedPeople = useMemo(() => {
    return [...peoples]
      .sort((person1, person2) => {
        if (!sort) {
          return 0;
        }

        switch (sort) {
          case 'name':
            return order
              ? person2.name.localeCompare(person1.name)
              : person1.name.localeCompare(person2.name);
          case 'sex':
            return order
              ? person2.sex.localeCompare(person1.sex)
              : person1.sex.localeCompare(person2.sex);
          case 'born':
            return order
              ? person2.born - person1.born
              : person1.born - person2.born;
          case 'died':
            return order
              ? person2.died - person1.died
              : person1.died - person2.died;
          default:
            return 0;
        }
      })
      .filter(person => {
        if (gender && person.sex !== gender) {
          return false;
        }

        if (query) {
          const q = query.toLowerCase();
          const nameMatch = person.name.toLowerCase().includes(q);
          const motherMatch = person.motherName?.toLowerCase().includes(q);
          const fatherMatch = person.fatherName?.toLowerCase().includes(q);

          if (!nameMatch && !motherMatch && !fatherMatch) {
            return false;
          }
        }

        if (centuries.length > 0) {
          const century = Math.ceil(person.born / 100);

          if (!centuries.includes(century.toString())) {
            return false;
          }
        }

        return true;
      });
  }, [peoples, sort, order, gender, query, centuries]);

  useEffect(() => {
    setNoMatch(filteredAndSortedPeople.length === 0);
  }, [filteredAndSortedPeople, setNoMatch]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && peoples && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!error && !isLoading && peoples.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatch && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && peoples && !noMatch && (
                <PeopleTable
                  filteredAndSortedPeople={filteredAndSortedPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
