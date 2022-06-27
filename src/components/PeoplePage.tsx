import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { getPeople } from '../api/api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  // const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState('');

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      navigate(`?${searchParams.toString()}`);
    }, 500),
    [],
  );

  const handleQueryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(e.target.value);
    applyQuery(e.target.value);
  };

  const fetchPeople = async () => {
    const result = await getPeople();

    setPeopleFromServer(result);
  };

  const arrayOfPeople = peopleFromServer.map(child => ({
    ...child,
    father: peopleFromServer
      .find(father => father.name === child.fatherName) || null,
    mother: peopleFromServer
      .find(mother => mother.name === child.motherName) || null,
  }));

  const visibleArrayOfPeople = arrayOfPeople.filter(person => (
    (person.name + person.fatherName + person.motherName)
      .toLowerCase()
      .includes(query.toLowerCase())
  ));

  useEffect(() => {
    fetchPeople();
  }, [query]);

  return (
    <>
      <h3>People Page</h3>
      <input
        type="text"
        placeholder="Find a person"
        className="Person__input"
        value={query}
        onChange={handleQueryChange}
      />
      <PeopleTable arrayOfPeople={visibleArrayOfPeople} />
    </>
  );
};
