import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useLocation, useSearchParams, NavLink } from 'react-router-dom';
import debounce from 'lodash/debounce';

import PeopleTable from './PeopleTable';
import NewPerson from './NewPerson';

import { getPeople } from '../api/api';

import PersonEnum from '../enums/PersonEnum';
import getSearchWith from '../utils/getSearchWith';

const linkPersonWithParents = (person: Person, peopleArray: Person[]) => {
  const mother = peopleArray.find(possibleParent => (
    possibleParent.name === person.motherName
  ));
  const father = peopleArray.find(possibleParent => (
    possibleParent.name === person.fatherName
  ));

  return {
    ...person,
    mother: mother || null,
    father: father || null,
  };
};

const loadData = (): Promise<Person[]> => {
  return getPeople()
    .then(response => {
      return response.map((person, _, arr) => (
        linkPersonWithParents(person, arr)
      ));
    });
};

const PeoplePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isFormOpen = useLocation().pathname === '/people/new';

  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const appliedQuery = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const [query, setQuery] = useState(appliedQuery);

  useEffect(() => {
    loadData()
      .then(loadedPeople => setPeople(loadedPeople))
      .catch(() => setIsError(true));
  }, []);

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      setSearchParams(getSearchWith({ query: newQuery }, searchParams));
    }, 500),
    [],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleNewPersonSubmit = (newPerson: Person) => {
    setPeople(prevPeople => {
      return ([
        ...prevPeople,
        linkPersonWithParents(newPerson, prevPeople),
      ]);
    });
  };

  const preparePeople = () => {
    const preparedPeople = people.filter(person => (
      person.name.toLowerCase()
        .includes(appliedQuery.toLowerCase())
      || person.motherName?.toLowerCase()
        .includes(appliedQuery.toLowerCase())
      || person.fatherName?.toLowerCase()
        .includes(appliedQuery.toLowerCase())
    ));

    const numOrder = sortOrder === 'asc'
      ? 1
      : -1;

    switch (sortBy) {
      case PersonEnum.Name:
      case PersonEnum.Sex:
        preparedPeople.sort((firstPerson, secondPerson) => (
          firstPerson[sortBy].localeCompare(secondPerson[sortBy]) * numOrder
        ));
        break;

      case PersonEnum.Born:
      case PersonEnum.Died:
        preparedPeople.sort((firstPerson, secondPerson) => (
          (firstPerson[sortBy] - secondPerson[sortBy]) * numOrder
        ));
        break;

      default:
        break;
    }

    return preparedPeople;
  };

  const preparedPeople = preparePeople();

  return (
    <div className="PeoplePage">
      <h1 className="text-center mb-3">People Page</h1>

      <div className="row mb-3">
        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              id="nameInput"
              className="form-control"
              placeholder="Name"
              value={query}
              onChange={handleInputChange}
              data-cy="filterInput"
            />

            <label htmlFor="nameInput">Name</label>
          </div>
        </div>

        <div className="col">
          {isFormOpen
            ? (
              <NewPerson
                people={people}
                onNewPersonSubmit={handleNewPersonSubmit}
              />
            )
            : (
              <NavLink
                to="../new"
                className="
                  btn btn-lg btn-dark
                  w-100 h-100
                  d-flex justify-content-center align-items-center
                "
              >
                Add new person
              </NavLink>
            )}
        </div>
      </div>

      {isError
        ? (
          <h3 className="text-center">
            An error occurred while loading people data
          </h3>
        )
        : (
          <>
            {preparedPeople.length !== 0
              ? (
                <PeopleTable
                  people={preparedPeople}
                />
              )
              : (
                <>
                  {people.length !== 0 ? (
                    <h3 className="text-center">
                      Could not find any people by
                      this query
                    </h3>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <div
                        className="spinner-border"
                        style={{
                          width: '3rem',
                          height: '3rem',
                        }}
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                </>
              )}
          </>
        )}
    </div>
  );
};

export default PeoplePage;
