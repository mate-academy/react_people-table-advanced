import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';
import { getPeople } from '../../api/people';

import PeopleTable from '../PeopleTable';
import { Loader } from '../Loader';

const DEBOUNCE_DELAY = 500;

const findParents = (people: Person[]): Person[] => {
  return people.map(person => ({
    ...person,
    mother: people.find(parent => parent.name === person.motherName) || null,
    father: people.find(parent => parent.name === person.fatherName) || null,
  }));
};

const filterPeople = (people: Person[], query: string) => {
  const lowerQuery = query.toLowerCase();

  const filtered = people.filter(person => (
    person.name.toLowerCase().includes(lowerQuery)
      || person.motherName?.toLowerCase().includes(lowerQuery)
      || person.fatherName?.toLowerCase().includes(lowerQuery)
  ));

  return filtered;
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams({});
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [appliedQuery, setAppliedQuery] = useState(query);

  const { personSelected = '' } = useParams<{ personSelected: string }>();

  const applyQuery = useCallback(
    debounce((newQuery) => {
      setAppliedQuery(newQuery);
      searchParams.set('query', newQuery);
      setSearchParams(searchParams);
    }, DEBOUNCE_DELAY),
    [searchParams, personSelected],
  );

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => findParents(peopleFromServer))
      .then(peopleFromServer => {
        const filteredPeople = filterPeople(peopleFromServer, appliedQuery);

        setPeople(peopleFromServer);
        setVisiblePeople(filteredPeople);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filteredPeople = filterPeople(people, appliedQuery);

    setVisiblePeople(filteredPeople);
  }, [appliedQuery]);

  return (
    <>
      <h1 className="title">People table</h1>

      <div className="container">
        {isLoading
          ? <Loader />
          : (
            <>
              <input
                type="text"
                className="input"
                placeholder="Search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  applyQuery(event.target.value);
                }}
              />
              <PeopleTable
                people={visiblePeople}
                personSelected={personSelected}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </>
          )}
      </div>
    </>
  );
};
