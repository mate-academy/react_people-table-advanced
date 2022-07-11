import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { getPeople } from '../../api/api';
import { Person, PersonParents } from '../../types/Person';
import { NewPerson } from '../NewPerson';
import { PeopleTable } from '../PeopleTable';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  const [allPeople, setAllPeople] = useState<Person[] | []>([]);

  const getNewPerson = () => {
    getPeople().then(result => {
      const newPersons:Person[] = result.map(
        (person:Person) => ({
          ...person,
          father: result.find(
            (parent:PersonParents) => parent.name === person.fatherName,
          ) || null,
          mother: result.find(
            (parent:PersonParents) => parent.name === person.motherName,
          ) || null,
        }),
      );

      setAllPeople(newPersons);
    });
  };

  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);

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

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  let visiablePeople = allPeople;

  if (appliedQuery) {
    const lowerQuery = query.toLowerCase();

    visiablePeople = allPeople.filter(
      person => person.name?.toLowerCase().includes(lowerQuery)
        || person.fatherName?.toLowerCase().includes(lowerQuery)
        || person.motherName?.toLowerCase().includes(lowerQuery),
    );
  }

  const [sortOrder, setSortOrder] = useState('asc');

  const sortingBy = (param: string) => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

    if (param === 'name' || param === 'sex') {
      visiablePeople.sort((a, b) => {
        return (
          sortOrder === 'asc'
            ? a[param].localeCompare(b[param])
            : b[param].localeCompare(a[param])
        );
      });
    }

    if (param === 'born' || param === 'died') {
      visiablePeople.sort((a, b) => {
        return (
          sortOrder === 'asc'
            ? a[param] - b[param]
            : b[param] - a[param]
        );
      });
    }

    if (param) {
      searchParams.set('sortBy', param);
    } else {
      searchParams.delete('sortBy');
    }

    navigate(`?${searchParams.toString()}`);

    return (visiablePeople);
  };

  const sortColumn = searchParams.get('sortBy');

  const [addNew, setAddNew] = useState(false);

  const hideNewPerson = (newPerson: Person) => {
    setAllPeople(prevState => ([
      ...prevState,
      newPerson,
    ]));

    navigate('/people/');

    setAddNew(false);
  };

  useEffect(() => {
    getNewPerson();
  }, []);

  return (
    <div className="PeoplePage">
      <h1 className="PeoplePage__title">People page</h1>
      <div className="PeoplePage__options">
        <input
          value={query}
          onChange={handleQueryChange}
          className="PeoplePage__search"
          type="text"
          data-cy="filterInput"
        />
        <NavLink
          to="/people/new"
        >
          <button
            type="button"
            className="PeoplePage__addButton"
            onClick={() => {
              setAddNew(true);
            }}
          >
            Add person
          </button>
        </NavLink>
      </div>
      <div className="PeoplePage__block">
        <PeopleTable
          people={visiablePeople}
          sortingBy={sortingBy}
          sortColumn={sortColumn}
        />
        {addNew && (
          <NewPerson
            people={allPeople}
            hideNewPerson={hideNewPerson}
          />
        )}
      </div>
    </div>
  );
};
