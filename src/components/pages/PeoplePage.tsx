import 'bulma/css/bulma.css';
import { useEffect, useState } from 'react';
import { Table } from '../Table/Table';
import { Loader } from '../Loader';
import { preparePeopleData } from '../../utils/preparePeopleData';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleFilters } from '../PeopleFilters';

import { useSearchParams } from 'react-router-dom';
import { getPreperedDataToFilter } from '../../utils/getPreperedDataToFilter';

export const PeoplePage: React.FC = () => {
  const [dataFromServer, setDataFromServer] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const visiblePeopleData = getPreperedDataToFilter(
    dataFromServer,
    sex,
    centuries,
    query,
    sort,
    order,
  );

  useEffect(() => {
    setDataFromServer([]);
    setErrorMessage(null);
    setIsLoading(true);
    getPeople()
      .then((data: Person[]) => {
        const peopleData = preparePeopleData(data);

        setDataFromServer(peopleData);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {errorMessage}
      </p>
    );
  }

  if (dataFromServer?.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              <h1 className="title">People Page</h1>

              {visiblePeopleData.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              ) : (
                <Table people={visiblePeopleData} isLoading={isLoading} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
