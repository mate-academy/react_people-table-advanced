import React, {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import debounce from 'lodash/debounce';
import {
  useHistory, useLocation,
} from 'react-router-dom';
import { getPeople } from '../../api/api';
import { Person, ServerIPerson } from '../../api/interface';
import { Loader } from '../Loader';
import { PersonInfo } from '../PersonInfo';
import { PersonRow } from '../PersonRow';

import './PeopleTable.scss';
import {
  filteringPeoleList,
  sortingList,
} from '../../api/helper';
import { TableHeader } from '../TableHeader';

export const initialList: Person[] = [];

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [foundPerson, setFoundPerson] = useState<Person | ServerIPerson | undefined>(undefined);
  const [isAddingForm, setIsAddingForm] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(result => {
        if (initialList.length === 0) {
          result.forEach((person: ServerIPerson) => {
            initialList.push({
              name: person.name,
              sex: person.sex,
              born: person.born,
              died: person.died,
              father: person.fatherName === null
                ? undefined
                : result.find((father: ServerIPerson) => father.name === person.fatherName),
              mother: person.motherName === null
                ? undefined
                : result.find((mother: ServerIPerson) => mother.name === person.motherName),
              slug: person.slug,
            });
          });
        }

        setPeople(initialList);
        setIsLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    setPeople(initialList);
  }, [initialList]);

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

    history.push(`?${searchParams.toString()}`);
  }, 500), [searchParams, history]);

  const handleQueryChange = (event: ChangeEvent<{value: string}>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  useEffect(() => {
    const updateList = searchParams.get('sortBy')
      ? sortingList(
        filteringPeoleList(
          apliedQuery.toLowerCase(),
          initialList,
        ),
        searchParams.get('sortBy') || '',
        searchParams.get('sortOrder') || '',
      )
      : filteringPeoleList(
        apliedQuery.toLowerCase(),
        initialList,
      );

    setPeople(updateList);
  }, [apliedQuery]);

  // found selected person
  useEffect(() => {
    if (foundPerson === undefined && searchParams.has('slug')) {
      searchParams.delete('slug');
      history.push(`?${searchParams.toString()}`);
    }
  }, [foundPerson]);

  useEffect(() => {
    setFoundPerson(people
      .find(person => person.slug === searchParams.get('slug')));
  }, [searchParams]);

  if (isLoading) {
    return (<Loader />);
  }

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
            isAddingForm={isAddingForm}
          />
        </thead>
        <tbody>
          {error
            ? (
              <p>People not found</p>
            )
            : (
              <PersonRow
                people={people}
                initialList={initialList}
              />
            )}
        </tbody>
      </table>
    </div>
  );
};
