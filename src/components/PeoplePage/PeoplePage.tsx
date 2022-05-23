import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { getPeople } from '../../api/api';
import { People } from '../../types/people';
import PeopleTable from '../PeopleTable/PeopleTable';
import NewPerson from '../NewPerson/NewPerson';
import './PeoplePage.scss';

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<People[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedSort, setSelectedSort] = useState('');
  const [isOpenForm, setIsOpenForm] = useState(false);
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);

  useEffect(() => {
    getPeople()
      .then(response => setPeople(response.map((human: People) => {
        const mother = response
          .find((m: People) => m.name === human.motherName);
        const father = response
          .find((f: People) => f.name === human.fatherName);

        return { ...human, mother, father };
      })));
  }, []);

  const addNewPeople = (newPerson:People) => {
    setPeople(curList => [...curList, newPerson]);
  };

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

  const getSearchParams = (name:string, value:string) => {
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }

    navigate(`?${searchParams.toString()}`);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const lowerQuery = query.toLowerCase();

  const filterPeople = useMemo(() => (people
    .filter(person => person.name.toLowerCase().includes(lowerQuery)
    || person.motherName?.toLowerCase().includes(lowerQuery)
    || person.fatherName?.toLowerCase().includes(lowerQuery))
  ), [appliedQuery, people]);

  const getSortTable = (sort:string) => {
    setSelectedSort(sort);
    getSearchParams('sortBy', selectedSort);
    getSearchParams('sortOrder', sortOrder);

    switch (sortOrder) {
      case 'asc':
        switch (sort) {
          case 'name':
          case 'sex':
            filterPeople.sort((a, b) => (a[sort]).localeCompare(b[sort]));
            setSortOrder('desc');
            break;
          case 'born':
          case 'died':
            filterPeople.sort((a, b) => a[sort] - b[sort]);
            setSortOrder('desc');
            break;
          default:
        }

        break;
      case 'desc':
        switch (sort) {
          case 'name':
          case 'sex':
            filterPeople.sort((a, b) => (b[sort]).localeCompare(a[sort]));
            setSortOrder('asc');
            break;
          case 'born':
          case 'died':
            filterPeople.sort((a, b) => b[sort] - a[sort]);
            setSortOrder('asc');
            break;
          default:
        }

        break;
      default:
    }
  };

  const getOpenForm = () => {
    setIsOpenForm(!isOpenForm);
  };

  return (
    <div className="peoplePage">
      <h1 className="title">
        People Page
      </h1>
      {isOpenForm && (
        <NewPerson
          addNewPeople={addNewPeople}
          people={people}
          setIsOpenForm={setIsOpenForm}
        />
      )}
      {isOpenForm
        ? (
          <Link to="/people" onClick={getOpenForm}>
            <p className="button btn">
              Close
            </p>
          </Link>
        )
        : (
          <Link to="new" onClick={getOpenForm}>
            <p className="button">
              Add new person
            </p>
          </Link>
        )}
      <div>
        <input
          className="input is-normal inputMargin"
          style={{ width: '350px', marginBottom: '10px' }}
          type="text"
          data-cy="filterInput"
          placeholder="filter table"
          value={query}
          onChange={handleQueryChange}
        />
      </div>
      {(filterPeople.length === 0)
        ? <TailSpin color="blue" />
        : (
          <PeopleTable
            filterPeople={filterPeople}
            getSortTable={getSortTable}
            sortOrder={sortOrder}
            selectedSort={selectedSort}
          />
        )}
    </div>
  );
};

export default PeoplePage;
