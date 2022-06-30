import React, { useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PeopleContext } from '../PeopleContext/PeopleContext';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const { people } = useContext(PeopleContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const peopleQuery = searchParams.get('query') || '';
  const sortOrder = searchParams.get('sortOrder') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const navigate = useNavigate();

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

  const sortTable = () => {
    switch (sortBy) {
      case 'name':
      case 'sex':
        return filterPeople().sort((el1, el2) => (
          sortOrder === 'asc'
            ? el1[sortBy].localeCompare(el2[sortBy])
            : el2[sortBy].localeCompare(el1[sortBy])
        ));

      case 'born':
      case 'died':
        return filterPeople().sort((el1, el2) => (
          sortOrder === 'asc'
            ? +el1[sortBy] - (+el2[sortBy])
            : +el2[sortBy] - (+el1[sortBy])
        ));

      default:
        return filterPeople();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();

    if (query || sortBy || sortOrder) {
      setSearchParams({ query, sortBy, sortOrder });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <div className="filter-add">
        <input
          className="input"
          type="text"
          placeholder="Please enter a name"
          value={peopleQuery}
          onChange={handleChange}
        />
      </div>

      <div className="filter-add">
        <button
          onClick={() => navigate('/people/new')}
          type="button"
          className="button is-dark button-add"
        >
          Add person
        </button>
      </div>

      <PeopleTable
        people={sortTable()}
      />
    </>
  );
};
