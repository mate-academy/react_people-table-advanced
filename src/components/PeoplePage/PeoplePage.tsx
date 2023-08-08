import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { People } from '../People/People';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilters';
import { FilterParams } from '../../types/FilterParams';
import { SortColumns } from '../../utils/SortColumns';
import { filterPeople } from '../../utils/functions';

export const PeoplePage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const visiblePeople = useMemo(() => {
    const filters: FilterParams = {
      queryFilter: searchParams.get('query'),
      centuryFilter: searchParams.getAll('centuries'),
      sexFilter: searchParams.get('sex'),
      sortFilter: searchParams.get('sort') as SortColumns,
      sortOrder: searchParams.get('order'),
    };

    return filterPeople(people, filters);
  }, [people, searchParams]);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const ErrorBlock = (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  );

  const EmptyPeopleBlock = (
    <p data-cy="noPeopleMessage">
      There are no people on the server
    </p>
  );

  const EmptyVisiblePeopleBlock = (
    <p>
      There are no people matching the current search criteria
    </p>
  );

  const renderingBlock = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return ErrorBlock;
    }

    if (!people.length) {
      return EmptyPeopleBlock;
    }

    if (!visiblePeople.length) {
      return EmptyVisiblePeopleBlock;
    }

    return <People people={visiblePeople} />;
  };

  return (
    <div className="section">
      <div className="container">

        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">

            <div className="column is-7-tablet is-narrow-desktop">
              {!isLoading
                && (
                  <PeopleFilters />
                )}
            </div>

            <div className="column">
              <div className="box table-container">
                {renderingBlock()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
