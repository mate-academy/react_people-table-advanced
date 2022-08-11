import React, {
  useCallback, useContext, useMemo,
  useState,
} from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import debounce from 'lodash/debounce';

import { AppContext } from '../context';

import { PeopleTable } from './PeopleTable';

import PersonEnum from '../enums/PersonEnum';
import getSearchWith from '../utils/getSearchWith';

export const PeoplePage: React.FC = () => {
  const { state } = useContext(AppContext);
  const { people, loading, error } = state;

  const [searchParams, setSearchParams] = useSearchParams();

  const appliedQuery = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const [query, setQuery] = useState(appliedQuery);

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

  const preparePeople = () => {
    const loweredQuery = appliedQuery.toLowerCase();

    const preparedPeople = people.filter(person => (
      person.name.toLowerCase()
        .includes(loweredQuery)
      || person.motherName?.toLowerCase()
        .includes(loweredQuery)
      || person.fatherName?.toLowerCase()
        .includes(loweredQuery)
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
          (
            firstPerson[sortBy] - secondPerson[sortBy]
          ) * numOrder
        ));
        break;

      default:
        break;
    }

    return preparedPeople;
  };

  const preparedPeople = useMemo(
    preparePeople,
    [people, appliedQuery, sortBy, sortOrder],
  );

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
        </div>
      </div>

      {loading && (
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

      {error
        ? (
          <h3 className="text-center">
            An error occurred while loading people data
          </h3>
        )
        : (
          <PeopleTable
            people={preparedPeople}
          />
        )}
    </div>
  );
};
