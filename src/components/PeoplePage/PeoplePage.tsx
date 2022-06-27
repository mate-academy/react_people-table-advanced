import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const peopleQuery = searchParams.get('query') || '';

  const sortTable = (value: string, order: string) => {
    switch (value) {
      case 'name':
      case 'sex':
        people.sort((el1, el2) => (
          order === 'asc'
            ? el1[value].localeCompare(el2[value])
            : el2[value].localeCompare(el1[value])
        ));
        break;

      case 'born':
      case 'died':
        people.sort((el1, el2) => (
          order === 'asc'
            ? +el1[value] - (+el2[value])
            : +el2[value] - (+el1[value])
        ));
        break;

      default:
        break;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    if (query) {
      setSearchParams({ query });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    getPeople()
      .then(result => setPeople(result));
  }, []);

  const filterPeople = () => {
    const lowerQuery = peopleQuery.toLowerCase();

    if (lowerQuery) {
      return people.filter(person => (
        person.name.toLowerCase().includes(peopleQuery)
        || person.motherName?.toLowerCase().includes(peopleQuery)
        || person.fatherName?.toLowerCase().includes(peopleQuery)
      ));
    }

    return people;
  };

  return (
    <>
      <div className="filterInput">
        <input
          className="input"
          type="text"
          placeholder="Please enter a name"
          value={peopleQuery}
          onChange={handleChange}
        />
      </div>
      <PeopleTable
        people={filterPeople()}
        sortTable={sortTable}
      />
    </>
  );
};
