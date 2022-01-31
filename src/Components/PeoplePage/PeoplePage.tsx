import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import {
  Outlet,
  useLocation,
  useNavigate,
  Link,
} from 'react-router-dom';
import { getPeople } from '../../api';
import { SortBy, SortOrder } from '../../types';
import {
  convertToSortOrderEnum,
  convertToSortByEnum,
  processPeople,
  sortPeople,
} from './utils';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<ProcessedPerson[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const searchParams = new URLSearchParams(search);

  const appliedQuery = searchParams.get('query') || '';
  const selectedSortBy = convertToSortByEnum(searchParams.get('sortBy'));
  const selectedSortOrder = convertToSortOrderEnum(searchParams.get('sortOrder'));

  const [enteredQuery, setEnteredQuery] = useState(appliedQuery);

  const loadPeople = async () => {
    const peopleFromServer: Person[] = await getPeople();

    setPeople(processPeople(peopleFromServer));
    setLoading(false);
  };

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      navigate({
        search: searchParams.toString(),
      });
    }, 500),
    [],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleSortByChange = (sortBy: SortBy) => {
    searchParams.set('sortBy', sortBy);

    if (selectedSortBy !== sortBy) {
      searchParams.set('sortOrder', 'asc');
    } else {
      searchParams.set('sortOrder', selectedSortOrder === SortOrder.asc ? 'desc' : 'asc');
    }

    navigate({
      search: searchParams.toString(),
    });
  };

  const handleAddPerson = (person: ProcessedPerson) => {
    setPeople([
      ...people,
      person,
    ]);

    navigate({
      pathname: '/people',
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    loadPeople();
  }, []);

  let filteredPeople = people;

  if (appliedQuery) {
    const lowerCaseQuery = appliedQuery.toLowerCase();

    filteredPeople = people.filter(({ name, motherName, fatherName }) => {
      return [name, motherName, fatherName].some(
        field => (field ? field.toLowerCase().includes(lowerCaseQuery) : false),
      );
    });
  }

  if (selectedSortBy) {
    filteredPeople = sortPeople(filteredPeople, selectedSortBy, selectedSortOrder);
  }

  return (
    <>
      <div className="level">
        <div className="level-item">
          <h1 className="title">People</h1>
        </div>
      </div>
      {loading
        ? (<h2 className="subtitle">Loading people...</h2>)
        : (
          <>
            <div className="level">
              <div className="level-left">
                <input
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={enteredQuery}
                  onChange={handleQueryChange}
                />
              </div>
              <div className="level-right">
                {pathname !== '/people/new'
                  ? (
                    <Link
                      type="button"
                      className="button"
                      to={{
                        pathname: '/people/new',
                        search,
                      }}
                    >
                      Add person
                    </Link>
                  )
                  : (
                    <div>
                      <Outlet context={[people, handleAddPerson]} />
                    </div>
                  )}
              </div>
            </div>
            <div className="level">
              <div className="level-item">
                <PeopleTable
                  selectedSortBy={selectedSortBy}
                  selectedSortOrder={selectedSortOrder}
                  filteredPeople={filteredPeople}
                  handleSortByChange={handleSortByChange}
                />
              </div>
            </div>
          </>
        )}
    </>
  );
};
