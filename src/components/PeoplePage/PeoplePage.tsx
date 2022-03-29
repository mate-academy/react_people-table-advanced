import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';
import { getPeople } from '../../api/people';

import './PeoplePage.scss';

import { Loader } from '../Loader';
import PeopleTable from '../PeopleTable';
import NewPerson from '../NewPerson';

type Props = {
  edit: boolean,
};

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

export const PeoplePage: React.FC<Props> = ({ edit }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams({});
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [appliedQuery, setAppliedQuery] = useState(query);

  const { personSelected = '' } = useParams<{ personSelected: string }>();

  const form = useMemo(() => {
    return edit
      ? <NewPerson people={people} />
      : <a href={`#/people/new?${searchParams}`} className="button add-button">Add person</a>;
  }, [edit, searchParams]);

  const applyQuery = useCallback(
    debounce((newQuery) => {
      setAppliedQuery(newQuery);
      searchParams.set('query', newQuery);
      setSearchParams(searchParams);
    }, DEBOUNCE_DELAY),
    [edit, searchParams, personSelected],
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
              {form}
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
