import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { FilterParam } from '../types/FilterParam';
import { filterPeople } from '../utils/filterPeople';

type Props = {
  people: Person[],
  setPeople: (newValue: Person[]) => void,
};

export const PeoplePage: React.FC<Props> = ({ setPeople, people }) => {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get(FilterParam.Sex);
  const query = searchParams.get(FilterParam.Query);
  const centuries = searchParams.getAll(FilterParam.Centuries);
  const sortField = searchParams.get(FilterParam.Sort);
  const order = searchParams.get(FilterParam.Order);

  const visiblePeople = filterPeople(
    people,
    sex,
    query,
    centuries,
    sortField,
    order,
  );

  useEffect(() => {
    setHasError(false);
    setLoading(true);

    getPeople()
      .then((peopleData) => {
        setPeople(peopleData);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => setPeople([]);
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters people={people} />
          </div>

          <div className="block">
            <div className="box table-container">
              {loading && !hasError && !people.length && <Loader />}

              {!loading && hasError && !people.length && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !hasError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !hasError && people.length
                && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
