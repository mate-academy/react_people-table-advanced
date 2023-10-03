import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonItem } from './PersonItem';
import { PeopleFilters } from './PeopleFilters';
import { SortKeys } from '../types/SortKeys';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { SearchingParams } from '../types/SearchParams';
import { getSortedPeople } from '../utils/getSortedPeople';
import { getFilterdPeople } from '../utils/getFilterdPeople';

function getPreparedPeople(people: Person[]) {
  return people.map(person => {
    return {
      ...person,
      mother: people.find(mother => mother.name === person.motherName),
      father: people.find(father => father.name === person.fatherName),
    };
  });
}

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { personId = '' } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get(SearchingParams.Sort) || '';
  const order = searchParams.get(SearchingParams.Order) || '';
  const selectedSex = searchParams.get(SearchingParams.Sex) || '';
  const query = searchParams.get(SearchingParams.Query) || '';
  const selectedCenturies = searchParams
    .getAll(SearchingParams.Centuries) || [];

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(getPreparedPeople(data));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getSortParams = (sortKey: SortKeys): SearchParams => {
    if (sort !== sortKey) {
      return {
        sort: sortKey,
        order: null,
      };
    }

    if (sort === sortKey && !order) {
      return { order: 'desc' };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const isPeopleOnServer = !!people.length && !isError;
  const isNoPeopleOnServer = !people.length && !isLoading;

  const filteredPeople = getFilterdPeople(
    people,
    selectedSex,
    query,
    selectedCenturies,
  );
  const sortedPeople = getSortedPeople(
    filteredPeople,
    sort as SortKeys,
    order ? -1 : 1,
  );

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
              {isLoading && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isPeopleOnServer && (
                <table
                  data-cy="peopleTable"
                  className="
                  table
                  is-striped
                  is-hoverable
                  is-narrow
                  is-fullwidth"
                >
                  <thead>
                    <tr>
                      {Object.entries(SortKeys).map(([key, value]) => (
                        <th key={key}>
                          <span className="is-flex is-flex-wrap-nowrap">
                            {key}
                            <SearchLink
                              params={getSortParams(value)}
                            >
                              <span className="icon">
                                <i
                                  className={classNames('fas', {
                                    'fa-sort': sort !== value,
                                    'fa-sort-up': sort === value && !order,
                                    'fa-sort-down': sort === value,
                                  })}
                                />
                              </span>
                            </SearchLink>
                          </span>
                        </th>
                      ))}
                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>

                  <tbody>
                    {sortedPeople.map(person => (
                      <PersonItem
                        key={person.slug}
                        person={person}
                        selectedSlug={personId}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
