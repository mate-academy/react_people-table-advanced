import React, {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import debounce from 'lodash/debounce';
import {
  useHistory, useLocation,
} from 'react-router-dom';
import { ServerIPerson } from '../../api/interface';
import { PersonInfo } from '../PersonInfo';
import { PersonRow } from '../PersonRow';

import './PeopleTable.scss';
import {
  filteringPeopleList,
  sortingList,
} from '../../api/helper';
import { TableHeader } from '../TableHeader';

type PeopleTableT = {
  people: ServerIPerson[];
  setPeople: Function;
  error: string;
};

export const PeopleTable: React.FC<PeopleTableT> = ({
  people,
  setPeople,
  error,
}) => {
  const [foundPerson, setFoundPerson] = useState<ServerIPerson | undefined>(undefined);
  const [isAddingForm, setIsAddingForm] = useState<boolean>(false);

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // query zone
  const apliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(apliedQuery);

  const applyQuery = useCallback(debounce((newQuery: string) => {
    if (newQuery) {
      searchParams.set('query', newQuery);
    } else {
      searchParams.delete('query');
    }

    if (history.location.search !== `?${searchParams.toString()}`) {
      history.push(`?${searchParams.toString()}`);
    }
  }, 500), [searchParams, history]);

  const handleQueryChange = useCallback((event: ChangeEvent<{value: string}>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  }, [applyQuery]);

  const updatePeopleList = useCallback(() => {
    return searchParams.get('sortBy')
      ? sortingList(
        filteringPeopleList(
          apliedQuery.toLowerCase(),
          people,
        ),
        searchParams.get('sortBy') || '',
        searchParams.get('sortOrder') || '',
      )
      : filteringPeopleList(
        apliedQuery.toLowerCase(),
        people,
      );
  }, [apliedQuery, people, searchParams]);

  // found selected person
  useEffect(() => {
    if (searchParams.get('slug') !== foundPerson?.slug) {
      setFoundPerson(people
        .find(person => person.slug === searchParams.get('slug')));

      if (people.find(person => person.slug === searchParams.get('slug')) === undefined
        && searchParams.has('slug')) {
        searchParams.delete('slug');
        if (history.location.search !== `?${searchParams.toString()}`) {
          history.push(`?${searchParams.toString()}`);
        }
      }
    }
  }, [searchParams, people, foundPerson, history]);

  return (
    <div className="PeoplePage">
      <div className="form-info">
        <div className="Filtering">
          <input
            type="text"
            className="search"
            value={query}
            placeholder="Search....."
            onChange={handleQueryChange}
          />
        </div>

        {foundPerson && (
          <div className="info">
            <h2>Selected Person: </h2>
            <PersonInfo person={foundPerson} />
          </div>
        )}
        {!isAddingForm && (
          <button
            type="button"
            onClick={() => {
              setIsAddingForm(true);
              history.push('/people/new');
            }}
          >
            Add person
          </button>
        )}
      </div>
      <table
        className="PeopleTable"
      >
        <thead>
          <TableHeader
            people={people}
            setPeople={setPeople}
          />
        </thead>
        <tbody>
          {error
            ? (
              <p>{error}</p>
            )
            : (
              <PersonRow
                people={updatePeopleList()}
                initialList={people}
              />
            )}
        </tbody>
      </table>
    </div>
  );
};
