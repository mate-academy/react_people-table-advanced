import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import {
  useLocation, useRouteMatch,
  useHistory, Link, Route,
} from 'react-router-dom';
import debounce from 'lodash/debounce';
import { PeopleTable } from '../PeopleTable';
import { NewPerson } from '../NewPerson';

import { getPeople } from '../../api';
import { MatchParams, AddPerson, Person } from '../../utils/type';
import { callback, createSlug } from '../../utils/addFunctions';
import './People.scss';

export const People = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [people, setPeople] = useState<any[]>([]);

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const match = useRouteMatch <MatchParams>('/people/:slug?');
  const personId = match?.params?.slug || '0';
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);
  const sortByColumn: string | undefined = searchParams.get('sortBy') || '';
  const sortByOrder = searchParams.get('sortOrder') || '';

  const applyQuery = useCallback(
    debounce((newQuery: string | null) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history.push({ search: searchParams.toString() });
    }, 500), [],
  );
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    applyQuery(value);
  };

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  const visibleList = useMemo(() => {
    if (!appliedQuery) {
      return people;
    }

    const nameFromQuery = appliedQuery.toLowerCase();

    return people.filter(({ name, motherName, fatherName }) => `${name} ${fatherName || ''} ${motherName || ''}`.toLowerCase().includes(nameFromQuery));
  }, [people, appliedQuery]);

  const sortedList = useMemo(() => {
    if (!sortByColumn && !sortByOrder) {
      return visibleList;
    }

    const sortByToLowerCase = sortByColumn.toLowerCase();

    return [...visibleList].sort(callback(sortByToLowerCase, sortByOrder));
  }, [sortByColumn, sortByOrder, visibleList]);

  const addPerson: AddPerson = (form) => {
    const slug = createSlug(form.name, String(form.born));
    const newPerson: Person = {
      name: form.name,
      sex: form.sex,
      born: Number(form.born),
      died: Number(form.died),
      fatherName: (form.father) ? form.father : null,
      motherName: (form.mother) ? form.mother : null,
      slug,
    };

    const newArray = [...people, newPerson];

    setPeople(newArray);
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">
            People Table
          </h1>
        </div>
      </section>
      <section className="section">
        <div>
          <label htmlFor="query">
            <input
              value={query}
              id="query"
              onChange={handleChangeInput}
              className="input__search"
              type="text"
              name="query"
              placeholder="Search"
            />
          </label>
        </div>
        <div>
          {location.pathname === '/people/new' ? (
            <NewPerson
              people={people}
              onAddPerson={addPerson}
            />
          ) : (
            <>
              <Link to={{
                pathname: '/people/new',
                search: searchParams.toString(),
              }}
              >
                <button
                  type="button"
                  className="button__form "
                >
                  Add Person
                </button>
              </Link>
              <Route
                path="/people/new"
                exact
              >
                <NewPerson
                  people={people}
                  onAddPerson={addPerson}
                />
              </Route>
            </>
          )}
        </div>
      </section>
      {people.length && (
        <PeopleTable
          people={sortedList}
          personId={personId}
        />
      )}
    </>
  );
};
