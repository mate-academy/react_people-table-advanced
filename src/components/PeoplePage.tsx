import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useSearchParams, NavLink } from 'react-router-dom';
import debounce from 'lodash/debounce';

import PeopleTable from './PeopleTable';
import NewPerson from './NewPerson';

import { getPeople } from '../api/api';

import PersonEnum from '../enums/PersonEnum';

const addPersonParents = (person: Person, peopleArray: Person[]) => {
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

const loadData = async (): Promise<Person[]> => {
  return getPeople()
    .then(response => {
      return response.map((person, _, arr) => addPersonParents(person, arr));
    });
};

const PeoplePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isFormOpen = useLocation().pathname === '/people/new';

  const [people, setPeople] = useState<Person[] | null>(null);
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

  const peopleNames = useMemo(() => {
    const maleNames: Omit<Person, 'sex'>[] = [];
    const femaleNames: Omit<Person, 'sex'>[] = [];

    people?.forEach(person => {
      if (person.sex === 'm') {
        maleNames.push({
          name: person.name,
          born: person.born,
          died: person.died,
        });
      }

      if (person.sex === 'f') {
        femaleNames.push({
          name: person.name,
          born: person.born,
          died: person.died,
        });
      }
    });

    return [maleNames, femaleNames];
  }, [people]);

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
        setSearchParams(searchParams);
      } else {
        searchParams.delete('query');
        setSearchParams(searchParams);
      }
    }, 500),
    [],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleSortChange = (sortByQuery: PersonEnum | '') => {
    switch (true) {
      case sortByQuery === '':
        searchParams.delete('sortBy');
        searchParams.delete('sortOrder');
        break;

      case sortByQuery !== sortBy:
        searchParams.set('sortBy', sortByQuery);
        searchParams.set('sortOrder', 'asc');
        break;

      case sortByQuery === sortBy:
        searchParams.set(
          'sortOrder',
          sortOrder === 'asc' ? 'desc' : 'asc',
        );
        break;

      default:
        break;
    }

    setSearchParams(searchParams);
  };

  const handleNewPersonSubmit = (newPerson: Person) => {
    const slug = (`${newPerson.name} ${newPerson.born}`)
      .toLowerCase()
      .split(' ')
      .join('-');

    const newPersonWithSlug = {
      ...newPerson,
      slug,
    };

    if (people !== null) {
      setPeople(prevPeople => {
        if (prevPeople === null) {
          return prevPeople;
        }

        return ([
          ...prevPeople,
          addPersonParents(newPersonWithSlug, people),
        ]);
      });
    }
  };

  const preparePeople = () => {
    if (people === null) {
      return null;
    }

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

        <div className="col mb-3">
          {isFormOpen
            ? (
              <NewPerson
                peopleNames={peopleNames}
                onNewPersonSubmit={handleNewPersonSubmit}
              />
            )
            : (
              <NavLink
                to="new"
                className="btn btn-dark w-100"
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
            {preparedPeople === null
              ? (
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
              )
              : (
                <PeopleTable
                  people={preparedPeople}
                  onSortChange={handleSortChange}
                />
              )}
          </>
        )}
    </div>
  );
};

export default PeoplePage;
