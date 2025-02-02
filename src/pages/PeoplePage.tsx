import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person, OrderTypeEnum, SortFieldEnum, SexTypeEnum } from '../types';
import { filterPeoples } from '../utils/filterPeoples';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') as SortFieldEnum | null;
  const order = searchParams.get('order') as OrderTypeEnum | null;
  const sex = searchParams.get('sex') as SexTypeEnum | null;
  const query = searchParams.get('query') || '';

  const [peoples, setPeoples] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadPeoples = async () => {
    try {
      const peoplesResponse = await getPeople();

      setPeoples(peoplesResponse);
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeoples();
  }, []);

  const filteredPeoples = filterPeoples(peoples, sortBy, order, query, sex);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      );
    }

    if (peoples.length === 0) {
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;
    }

    if (filteredPeoples.length === 0) {
      return <p>There are no people matching the current search criteria</p>;
    }

    return <PeopleTable peoples={filteredPeoples} />;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">{renderContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
};
