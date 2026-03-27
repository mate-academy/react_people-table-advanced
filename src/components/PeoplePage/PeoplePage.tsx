import React, { useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Person } from '../../types';
import { Loader } from '../Loader';

import { getPeople } from '../../api';
import { PeopleFilters } from '../PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort') as keyof Person | null;
  const order = searchParams.get('order');

  useEffect(() => {
    getPeople()
      .then(setPeopleList)

      .catch(() => setErrorMessage(true))

      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = peopleList.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (centuries.length > 0) {
      const century = Math.ceil(person.born / 100).toString();

      if (!centuries.includes(century)) {
        return false;
      }
    }

    if (query) {
      const nameMatch = person.name.toLowerCase().includes(query);
      const motherMatch = person.motherName?.toLowerCase().includes(query);
      const fatherMatch = person.fatherName?.toLowerCase().includes(query);

      if (!nameMatch && !motherMatch && !fatherMatch) {
        return false;
      }
    }

    return true;
  });
  const sortedPeople = [...visiblePeople].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    const valA = a[sortField] ?? '';
    const valB = b[sortField] ?? '';

    if (valA === valB) {
      return 0;
    }

    const result = valA > valB ? 1 : -1;

    return order === 'desc' ? -result : result;
  });

  const isNotFound =
    !loading &&
    !errorMessage &&
    peopleList.length > 0 &&
    visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !errorMessage && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {peopleList.length === 0 && !loading && !errorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {peopleList.length > 0 && !loading && !errorMessage && (
                <PeopleTable peopleList={sortedPeople} />
              )}

              {isNotFound && <p>There are no people on the server</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/*import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

</>export const PeoplePage = () => {
 - return (
  -  <>
    -  <h1 className="title">People Page</h1>

     - <div className="block">
       - <div className="columns is-desktop is-flex-direction-row-reverse">
        -  <div className="column is-7-tablet is-narrow-desktop">
         -   <PeopleFilters />
          -</div>

          -<div className="column">
         -   <div className="box table-container">
            -  <Loader />

           -   <p data-cy="peopleLoadingError">Something went wrong</p>

             - <p data-cy="noPeopleMessage">There are no people on the server</p>

              <p>There are no people matching the current search criteria</p>

             <PeopleTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};*/
