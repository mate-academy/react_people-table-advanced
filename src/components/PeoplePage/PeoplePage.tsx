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
  // const [sortOrder, setSortOrder] = useState('asc');

  const [isOpenForm, setIsOpenForm] = useState(false);
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';
  const [selectedSort, setSelectedSort] = useState(sortBy);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => setPeople(response.map((human: People) => {
        const mother = response
          .find((m: People) => m.name === human.motherName);
        const father = response
          .find((f: People) => f.name === human.fatherName);

        return { ...human, mother, father };
      })));
    setIsLoading(false);
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

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const lowerQuery = query.toLowerCase();

  const filterPeople = useMemo(() => (people
    .filter(person => person.name.toLowerCase().includes(lowerQuery)
    || person.motherName?.toLowerCase().includes(lowerQuery)
    || person.fatherName?.toLowerCase().includes(lowerQuery))
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return sortOrder === 'asc'
            ? a[sortBy].localeCompare(b[sortBy])
            : b[sortBy].localeCompare(a[sortBy]);
        case 'born':
        case 'died':
          return sortOrder === 'asc'
            ? a[sortBy] - b[sortBy]
            : b[sortBy] - a[sortBy];
        default:
          return 0;
      }
    })
  ), [appliedQuery, people, sortBy, sortOrder]);

  const getSortTable = (sort:string) => {
    if (sortOrder === 'asc') {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    searchParams.set('sortBy', sort);
    setSelectedSort(sort);

    navigate(`?${searchParams.toString()}`);
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
      {isLoading
        ? <TailSpin color="blue" />
        : (
          <PeopleTable
            filterPeople={filterPeople}
            getSortTable={getSortTable}
            sortOrder={sortOrder}
            selectedSort={selectedSort}
          />
        )}

      {(filterPeople.length === 0) && <p>No results</p>}
    </div>
  );
};

export default PeoplePage;
