/* eslint-disable prettier/prettier */
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person, SortField, SortOrder } from '../types';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredPeople = people.filter(person => {
    const searchPeople =
      query === '' ||
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.toLowerCase());

    const searchBySex = !sex || person.sex === sex;

    const searchByCenturies =
      centuries.length === 0 ||
      centuries.includes(Math.floor(person.born / 100) + 1 + '');

    return searchPeople && searchBySex && searchByCenturies;
  });

  if (sortField) {
    filteredPeople.sort((a, b) => {
      switch (sortField) {
        case SortField.Name:
          return a.name.localeCompare(b.name);
        case SortField.Sex:
          return a.sex.localeCompare(b.sex);
        case SortField.Born:
          return a.born - b.born;
        case SortField.Died:
          return a.died - b.died;
        default:
          return 0;
      }
    });

    if (sortOrder === SortOrder.Descending) {
      filteredPeople.reverse();
    }
  }

  const handleSorting = (column: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== column) {
      setSearchParams(
        getSearchWith(searchParams, { sort: column, order: null }),
      );
    } else if (currentOrder !== SortOrder.Descending) {
      setSearchParams(
        getSearchWith(searchParams, {
          sort: column,
          order: SortOrder.Descending,
        }),
      );
    } else {
      setSearchParams(getSearchWith(searchParams, { sort: null, order: null }));
    }
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {error && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {!error && people.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!error &&
                    filteredPeople.length === 0 &&
                    searchParams.size !== 0 && (
                    <p>
                        There are no people matching the current search criteria
                    </p>
                  )}
                  <div className="container">
                    <div className="block">
                      <PeopleTable
                        people={filteredPeople}
                        active={slug}
                        onSort={handleSorting}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
