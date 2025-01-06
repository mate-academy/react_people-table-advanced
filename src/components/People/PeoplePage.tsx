import { PeopleFilters } from './PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../index';
import { getPeople } from '../../api';
import { Person, SortField } from '../../types';
import { useParams, useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';

const PeoplePage = () => {
  const [people, setPeople] = React.useState<Person[]>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const sortColumn = searchParams.get('sort') as SortField;
  const sortOrder = searchParams.get('order') || 'asc';

  const sortedPeople = React.useMemo(() => {
    if (!sortColumn) {
      return people;
    }

    return [...(people || [])].sort((a, b) => {
      if (sortColumn === SortField.Name || sortColumn === SortField.Sex) {
        return sortOrder === 'asc'
          ? a[sortColumn].localeCompare(b[sortColumn])
          : b[sortColumn].localeCompare(a[sortColumn]);
      }

      if (sortColumn === SortField.Born || sortColumn === SortField.Died) {
        return sortOrder === 'asc'
          ? a[sortColumn] - b[sortColumn]
          : b[sortColumn] - a[sortColumn];
      }

      return 0;
    });
  }, [sortColumn, sortOrder, people]);

  const searchPeopleByName = (name: string | null) => {
    return people?.find(
      person => person.name.toLowerCase() === name?.toLowerCase(),
    );
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              {!error && !loading && (
                <PeopleTable
                  people={sortedPeople}
                  slug={slug}
                  searchPeopleByName={searchPeopleByName}
                  sortColumn={sortColumn}
                  sortOrder={sortOrder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
