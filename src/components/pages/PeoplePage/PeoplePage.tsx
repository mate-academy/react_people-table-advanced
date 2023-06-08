import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../../PeopleFilters';
import { Loader } from '../../Loader';
import { PeopleTable } from '../../PeopleTable';
import { Person } from '../../../types/Person';
import { getPeople } from '../../../api';
import { assignParents } from '../../../utils/assignParents';
import { getSortedPeople } from '../../../utils/getSortedPeople';
import { getFilteredPeople } from '../../../utils/getFilteredPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [arePeopleLoading, setArePeopleLoading] = useState(false);
  const [arePeopleLoaded, setArePeopleLoaded] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const { slug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const loadPeople = async () => {
    try {
      setArePeopleLoading(true);

      const peopleFromServer = await getPeople();
      const peopleWithParents = assignParents(peopleFromServer);

      setPeople(peopleWithParents);
      setArePeopleLoaded(true);
    } catch {
      setHasLoadingError(true);
    } finally {
      setArePeopleLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const filteredPeople = useMemo(() => {
    return getFilteredPeople(people, searchParams);
  }, [people, sex, query, centuries]);

  const sortedPeople = useMemo(() => {
    return getSortedPeople(filteredPeople, searchParams);
  }, [filteredPeople, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {arePeopleLoading && <Loader />}

              {hasLoadingError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {(arePeopleLoaded && !people.length) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {arePeopleLoaded && (
                sortedPeople.length
                  ? (
                    <PeopleTable
                      people={sortedPeople}
                      selectedSlug={slug}
                      sort={sort}
                      order={order}
                    />
                  )
                  : (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
