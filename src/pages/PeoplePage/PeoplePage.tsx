import React, { useCallback, useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import debounce from 'lodash/debounce';

import PeopleTable from '../../components/PeopleTable/PeopleTable';
import NewPerson from '../../components/NewPerson/NewPerson';

import { getPeople } from '../../api/people';

import { Person } from '../../types/person';

import './PeoplePage.scss';

const PeoplePage: React.FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const appliedQuery = searchParams.get('query');
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');

  const [people, setPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState(appliedQuery);

  const displayForm = location.pathname.includes('new');

  const fetchPeople = async () => {
    setPeople(await getPeople());
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
        setSearchParams(searchParams);
      } else {
        searchParams.delete('query');
        setSearchParams(searchParams);
      }
    }, 500),
    [],
  );

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  let visiblePeople = appliedQuery
    ? people.filter(person => {
      const lowerQuery = appliedQuery.toLowerCase();

      return person.name?.toLowerCase().includes(lowerQuery)
      || person.motherName?.toLowerCase().includes(lowerQuery)
      || person.fatherName?.toLowerCase().includes(lowerQuery);
    })
    : people;

  if (sortBy) {
    switch (sortBy) {
      case 'name':
      case 'sex': {
        visiblePeople = [...visiblePeople].sort((a, b) => {
          switch (sortOrder) {
            case 'asc':
              return a[sortBy].localeCompare(b[sortBy]);

            case 'desc':
              return b[sortBy].localeCompare(a[sortBy]);

            default:
              return 0;
          }
        });
        break;
      }

      case 'born':
      case 'died': {
        visiblePeople = [...visiblePeople].sort((a, b) => {
          switch (sortOrder) {
            case 'asc':
              return a[sortBy] - b[sortBy];

            case 'desc':
              return b[sortBy] - a[sortBy];

            default:
              return 0;
          }
        });
        break;
      }

      default:
        break;
    }
  }

  return (
    <>
      <label htmlFor="query">
        Search: &nbsp;
        <input
          type="text"
          id="query"
          placeholder="Search"
          value={query || ''}
          onChange={onQueryChange}
          className="mb-10"
        />
      </label>
      <div className="container">
        <PeopleTable
          people={visiblePeople}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
        {displayForm
          ? <NewPerson people={people} setPeople={setPeople} />
          : (
            <Link
              to={{
                pathname: '/people/new',
                search: location.search,
              }}
              className="add-new-person"
            >
              <button
                type="button"
                className="add-new-person__button"
              >
                Add person
              </button>
            </Link>
          )}
      </div>
    </>
  );
};

export default PeoplePage;
