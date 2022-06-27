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
        people.sort((el1, el2) => (
          order === 'asc'
            ? el1.name.localeCompare(el2.name)
            : el2.name.localeCompare(el1.name)
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
