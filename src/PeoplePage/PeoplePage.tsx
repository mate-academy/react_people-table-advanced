import React, { useCallback, useEffect, useState } from 'react';
import './PeoplePage.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../api/getPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const fetchPeople = async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
  };

  useEffect(() => {
    fetchPeople().then(r => r);
  }, []);

  let updatePeople = people.map(person => (
    {
      ...person,
      motherNameSlug: people.find(mother => person.motherName === mother.name),
      fatherNameSlug: people.find(father => person.fatherName === father.name),
    }
  ));

  const history = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history(`?${searchParams.toString()}`);
    }, 500),
    [],
  );

  const handleQueryChange = (event: { target: { value: string; }; }) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleSortChange = (event: React.MouseEvent<HTMLElement>) => {
    const value = (event.target as Element).innerHTML;

    if (event.target as Element) {
      searchParams.set('sortBy', value);
    } else {
      searchParams.delete('sortBy');
    }

    if (sortOrder === 'asc' && value === sortBy) {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    history(`?${searchParams.toString()}`);
  };

  if (appliedQuery) {
    updatePeople = updatePeople.filter(
      person => `${person.name}${person.fatherName}${person.motherName}`.toLowerCase().includes(appliedQuery.toLowerCase()),
    );
  }

  if (sortBy) {
    updatePeople.sort((a: Person, b: Person) => {
      switch (sortBy) {
        case 'Name':
          return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'Sex':
          return sortOrder === 'asc'
            ? a.sex.localeCompare(b.sex)
            : b.sex.localeCompare(a.sex);
        case 'Born':
          return sortOrder === 'asc'
            ? a.born - b.born
            : b.born - a.born;
        case 'Died':
          return sortOrder === 'asc'
            ? a.died - b.died
            : b.died - a.died;
        default:
          return 0;
      }
    });
  }

  return (
    <>
      <div className="wrapper container">
        <h1 className="pp__title">People Page</h1>
        <br />
        <input
          className="form-control"
          type="text"
          placeholder="Type name"
          onChange={handleQueryChange}
          value={query || ''}
        />
      </div>
      <PeopleTable
        visiblePeople={updatePeople}
        handleSortChange={handleSortChange}
      />
    </>
  );
};
