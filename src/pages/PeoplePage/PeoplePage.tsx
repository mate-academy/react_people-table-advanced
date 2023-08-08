import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleContext } from '../../context';

import {
  ErrorNotification,
  Loader,
  PeopleFilters,
  PeopleTable,
} from '../../components';
import { PersonSex } from '../../types';
import { getFilteredPeople } from '../../utils';

export const PeoplePage = () => {
  const {
    loading,
    errorMessage,
    people,
  } = useContext(PeopleContext);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') as PersonSex;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const filteredPeople = useMemo(() => {
    return getFilteredPeople(people,
      {
        query,
        sex,
        centuries,
        sort,
        order,
      });
  }, [people, searchParams]);

  const isEmptyFilteredPeople = filteredPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? <Loader /> : (
                <>
                  {errorMessage && <ErrorNotification />}

                  {isEmptyFilteredPeople && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {!errorMessage
                    && !isEmptyFilteredPeople
                    && <PeopleTable people={filteredPeople} />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
