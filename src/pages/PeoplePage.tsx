import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { preparePeople } from '../utils/preparePeople';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  const preparedPeople = preparePeople(
    people,
    {
      query,
      sex,
      centuries,
      sort,
      order,
    },
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length !== 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading
                ? <Loader />
                : (
                  <>
                    {isError && (
                      <p data-cy="peopleLoadingError">
                        Something went wrong
                      </p>
                    )}

                    {people.length === 0 && !loading && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                    {preparedPeople.length === 0 && !loading && (
                      <p>
                        There are no people matching the current search criteria
                      </p>
                    )}

                    <PeopleTable people={preparedPeople} slug={slug} />
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
