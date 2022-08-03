import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import debounce from 'lodash/debounce';

import { QueryParams, SortBy, SortOrder } from '../../types/queryParams';
import { Human, Child } from '../../types/human';

import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable';

function findParents(people: Human[]): Child[] {
  return people.map(human => {
    const { motherName, fatherName } = human;

    return {
      ...human,
      mother: people.find(mother => motherName === mother.name),
      father: people.find(father => fatherName === father.name),
    };
  });
}

const compareStrings = (a: string, b: string) => a.localeCompare(b);

export const PeoplePage: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';
  const [queryParams, setQueryParams] = useState<QueryParams>({
    query,
    sortBy,
    sortOrder,
  });
  const [people, setPeople] = useState<Child[]>([]);

  useEffect(() => {
    getPeople()
      .then(newPeople => setPeople(findParents(newPeople)));
  }, []);

  const filteredPeople = people
    .filter(human => human.name.toLowerCase().includes(query)
      || human.motherName?.toLowerCase().includes(query)
      || human.fatherName?.toLowerCase().includes(query));

  const sortPeople = useCallback(() => {
    if (!sortBy) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((p1, p2): number => {
      switch (sortBy) {
        case SortBy.Name:
        case SortBy.Sex:
          return sortOrder === SortOrder.asc
            ? compareStrings(p1[sortBy], p2[sortBy])
            : compareStrings(p2[sortBy], p1[sortBy]);

        case SortBy.Born:
        case SortBy.Died:
          return sortOrder === SortOrder.asc
            ? p1[sortBy] - p2[sortBy]
            : p2[sortBy] - p1[sortBy];

        default:
          return 0;
      }
    });
  }, [filteredPeople, sortBy, sortOrder]);

  const updateSearchParams = useCallback(
    (newQuery: QueryParams) => {
      const entries = Object.entries(newQuery);

      entries.forEach(
        ([queryName, value]) => (value
          ? searchParams.set(queryName, value)
          : searchParams.delete(queryName)
        ),
      );

      setSearchParams(searchParams);
    }, [pathname],
  );

  const applyQueryWithDebounce = useCallback(
    debounce((newQuery: QueryParams) => {
      updateSearchParams(newQuery);
    }, 500),
    [pathname],
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value = '' } } = event;
    const newQuery = { ...queryParams, [name]: value.toLowerCase() };

    setQueryParams(newQuery);
    applyQueryWithDebounce(newQuery);
  };

  const handleSortChange = useCallback((newSortByValue: SortBy) => {
    const newQuery = {
      ...queryParams,
      sortBy: newSortByValue.toLowerCase(),
    };

    if (newSortByValue !== queryParams.sortBy) {
      newQuery.sortOrder = SortOrder.asc;
    } else {
      switch (queryParams.sortOrder) {
        case SortOrder.asc:
          newQuery.sortOrder = SortOrder.desc;
          break;

        case SortOrder.desc:
          newQuery.sortOrder = SortOrder.asc;
          break;

        default:
          newQuery.sortOrder = '';
          break;
      }
    }

    setQueryParams(newQuery);
    updateSearchParams(newQuery);
  }, [queryParams]);

  return (
    <>
      <h1>People page</h1>

      <div className="name-filters">
        <h2>Filter by: </h2>

        <input
          className="input is-normal"
          data-cy="filterInput"
          name="query"
          placeholder="Person Name"
          value={queryParams.query}
          onChange={handleFilterChange}
        />
      </div>

      {people.length ? (
        <PeopleTable
          sortPeople={handleSortChange}
          people={sortPeople()}
        />
      ) : <h1>There is nobody :/</h1> }
    </>
  );
};
