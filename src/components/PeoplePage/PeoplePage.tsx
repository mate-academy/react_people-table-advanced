import React, { useCallback, useEffect, useState } from 'react';
import {
  Routes, Route, useLocation, useNavigate,
} from 'react-router-dom';
import { debounce } from 'lodash';
import { getPeople } from '../../api';
import PeopleTable from '../PeopleTable/PeopleTable';
import './PeoplePage.scss';
import NewPerson from '../NewPerson/NewPerson';
import AddPerson from '../AddPerson/AddPerson';

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);
  const currentSortBy = searchParams.get('sortBy') || '';
  const navigate = useNavigate();
  const peopleWithParents = [...people];

  const addPersonToThelist = (newPerson: Person) => {
    setPeople([...people,
      newPerson]);
  };

  people.map((person, index, arr) => {
    peopleWithParents[index].father
    = arr.find(currentPerson => {
        return person.fatherName === currentPerson.name;
      });

    peopleWithParents[index].mother
    = arr.find(currentPerson => person.motherName === currentPerson.name);

    return '';
  });

  const applyQuery = useCallback(
    debounce((newQuery: string, sortBy: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery.toLowerCase());
      } else {
        searchParams.delete('query');
      }

      if (sortBy) {
        searchParams.set('sortBy', sortBy);
      }

      navigate(`?${searchParams.toString()}`);
    }, 500),
    [],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value[value.length - 1] === ' ') {
      return;
    }

    setQuery(value);

    applyQuery(value, currentSortBy);
  };

  const getVisiblePeople = () => {
    if (appliedQuery) {
      const visiblePeople = peopleWithParents.filter(person => {
        const valueForComparation
        = person.name.split(' ').join('')
        + (person.motherName ? (person.motherName.split(' ')).join('') : '')
        + (person.fatherName ? (person.fatherName.split(' ')).join('') : '');

        return valueForComparation.toLowerCase().includes(query);
      });

      return visiblePeople;
    }

    return people;
  };

  useEffect(() => {
    setQuery(appliedQuery);
  }, [appliedQuery]);

  useEffect(() => {
    getPeople().then(result => {
      setPeople(result);
    });
  }, []);

  return (
    <div className="PeoplePage">
      <h2 className="PeoplePageTitle">
        People Page
      </h2>

      <div className="AddPersonEntranceContainer">
        {location.pathname
          === 'react_people-table-advanced/people' && <AddPerson />}
      </div>

      <Routes>
        <Route
          path="/new"
          element={(
            <NewPerson
              people={people}
              addPersonToTheList={addPersonToThelist}
            />
          )}
        />
      </Routes>

      <h3
        className="TableTitle"
      >
        People table
      </h3>

      <label className="Search">
        Search
        <input
          value={query}
          data-cy="filterInput"
          className="Search__input"
          onChange={handleInputChange}
        />
      </label>

      <ul className="Persons">
        <PeopleTable
          people={getVisiblePeople()}
        />
      </ul>
    </div>
  );
};

export default PeoplePage;
