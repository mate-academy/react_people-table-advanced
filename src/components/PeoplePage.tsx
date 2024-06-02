import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sortType = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    return () => setPeople([]);
  }, []);

  const setSearchWith = (params: {
    order?: string | null;
    sort?: string | null;
  }) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleAddParams = (param: string) => {
    let newOrder = null;
    let newType: string | null = param;

    if (sortType !== param) {
      newOrder = null;
    } else if (!order) {
      newOrder = 'desc';
    } else {
      newOrder = null;
      newType = null;
    }

    setSearchWith({ order: newOrder, sort: newType });
  };

  const filteredPeople = getFilteredPeople(people, {
    query,
    sex,
    centuries,
    sortType,
    order,
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!filteredPeople.length && (
                <PeopleTable
                  people={filteredPeople}
                  handleAddParams={handleAddParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
