import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import debounce from 'lodash/debounce';

import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable';
import { Human, Child } from '../../types/human';

type Query = {
  personName: string;
  motherName: string;
  fatherName: string;
};

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

export const PeoplePage: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const personName = searchParams.get('personName')?.toLowerCase() || '';
  const motherName = searchParams.get('motherName')?.toLowerCase() || '';
  const fatherName = searchParams.get('fatherName')?.toLowerCase() || '';
  const [query, setQuery] = useState<Query>({
    personName,
    motherName,
    fatherName,
  });
  const [people, setPeople] = useState<Child[]>([]);

  const filteredPeople = useMemo(() => {
    return people.filter(human => human.name.toLowerCase().includes(personName)
      && ((!human.motherName && !motherName) // human doesn't have mother and filter by motherName is empty
        || human.motherName?.toLowerCase().includes(motherName)) // or human's mother name includes filter value
      && ((!human.fatherName && !fatherName) // human doesn't have father and filter by fatherName is empty
        || human.fatherName?.toLowerCase().includes(fatherName))); // or human's father name includes filter value
  }, [people, personName, motherName, fatherName]);

  useEffect(() => {
    getPeople()
      .then(newPeople => setPeople(findParents(newPeople)));
  }, []);

  const applyQuery = useCallback(
    debounce((newQuery: Query) => {
      const entries = Object.entries(newQuery);

      entries.forEach(
        ([queryName, value]) => (value
          ? searchParams.set(queryName, value)
          : searchParams.delete(queryName)
        ),
      );

      navigate(`?${searchParams.toString()}`);
    }, 1000),
    [],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value = '' } } = event;
    const newQuery = { ...query, [name]: value.toLowerCase() };

    setQuery(newQuery);
    applyQuery(newQuery);
  };

  return (
    <>
      <h1>People page</h1>

      <div className="name-filters">
        <h2>Filter by: </h2>

        <input
          className="input is-normal"
          data-cy="filterInput"
          name="personName"
          placeholder="Person Name"
          value={query.personName}
          onChange={handleQueryChange}
        />

        <input
          className="input is-normal"
          data-cy="filterInput"
          name="motherName"
          placeholder="Mother Name"
          value={query.motherName}
          onChange={handleQueryChange}
        />

        <input
          className="input is-normal"
          data-cy="filterInput"
          name="fatherName"
          placeholder="Father Name"
          value={query.fatherName}
          onChange={handleQueryChange}
        />
      </div>

      {people.length && <PeopleTable people={filteredPeople} />}
    </>
  );
};
