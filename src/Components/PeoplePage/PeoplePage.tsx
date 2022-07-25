import React, { useCallback, useContext, useState } from 'react';
import debounce from 'lodash/debounce';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../PeopleTable';
import { PeopleContext } from '../PeopleContext';
import './PeoplePage.scss';

export const PeoplePage: React.FC = React.memo(() => {
  const { people } = useContext(PeopleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';
  const appliedQuery = searchParams.get('query') || '';
  const [inputQuery, setInputQuery] = useState(appliedQuery);
  const navigate = useNavigate();

  const filterPeople = () => {
    const lowerQuery = appliedQuery?.toLowerCase();

    if (lowerQuery) {
      return people.filter(person => (
        person.name.toLowerCase().includes(lowerQuery)
        || person.motherName?.toLowerCase().includes(lowerQuery)
        || person.fatherName?.toLowerCase().includes(lowerQuery)
      ));
    }

    return people;
  };

  const sortTable = () => {
    switch (sortBy) {
      case 'name':
      case 'sex':
        return filterPeople().sort((firsPerson, secondPerson) => (
          sortOrder === 'asc'
            ? firsPerson[sortBy].localeCompare(secondPerson[sortBy])
            : secondPerson[sortBy].localeCompare(firsPerson[sortBy])

        ));

      case 'born':
      case 'died':
        return filterPeople().sort((firsPerson, secondPerson) => (
          sortOrder === 'asc'
            ? Number(firsPerson[sortBy]) - Number(secondPerson[sortBy])
            : Number(secondPerson[sortBy]) - Number(firsPerson[sortBy])
        ));

      default:
        return filterPeople();
    }
  };

  const applyQuery = useCallback(
    debounce((query) => {
      if (query || sortBy || sortOrder) {
        setSearchParams({ query, sortBy, sortOrder });
      } else {
        setSearchParams({});
      }
    }, 500),
    [setSearchParams, sortBy, sortOrder],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyQuery(event.target.value.toLowerCase());
    setInputQuery(event.target.value);
  };

  return (
    <div className="container">
      <div className="inputs">
        <input
          className="form-control"
          type="text"
          data-cy="filterInput"
          placeholder="Enter person name"
          value={inputQuery || ''}
          onChange={handleQueryChange}
        />

        <button
          className="btn btn-outline-info"
          type="button"
          onClick={() => navigate('/people/new')}
        >
          Add a new person
        </button>
      </div>

      <PeopleTable people={sortTable()} />
    </div>
  );
});
