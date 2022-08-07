import React, { useState, useContext, useCallback } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { PeopleContext } from '../../components/PeopleContext';
import { PeopleTable } from '../../components/PeopleTable';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const { personId } = useParams();
  const { people } = useContext(PeopleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const appliedQuery = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const [query, setQuery] = useState(appliedQuery);

  const debounce = (f: (query: string) => void, delay: number) => {
    let timer: number;

    return (...args: string[]) => {
      clearTimeout(timer);
      timer = setTimeout(f, delay, ...args);
    };
  };

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      const params: { [key: string]: string } = {};

      if (newQuery) {
        params.query = newQuery;
      }

      if (sortBy) {
        params.sortBy = sortBy;
      }

      if (sortOrder) {
        params.sortOrder = sortOrder;
      }

      return setSearchParams(params);
    }, 800), [personId, sortBy, sortOrder],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const filteredPeople = query
    ? people.filter(person => {
      const { name, motherName, fatherName } = person;

      return name.toLowerCase().includes(appliedQuery)
      || (motherName?.toLowerCase().includes(appliedQuery))
      || (fatherName?.toLowerCase().includes(appliedQuery));
    })
    : people;

  return (
    <>
      <div className="field">
        <p className="control has-icons-left">
          <input
            type="text"
            className="input"
            value={query}
            onChange={handleChange}
            data-cy="filterInput"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-search" />
          </span>
        </p>

        <div className="button-box">
          <Link
            to="/people/new"
            className="button is-primary level"
          >
            Add new person
          </Link>
        </div>

      </div>

      {people.length > 0 && <PeopleTable people={filteredPeople} />}
    </>
  );
};
