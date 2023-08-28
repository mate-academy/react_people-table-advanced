import { Link, useLocation, useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import { Sex } from '../types/Sex';
import { LinksForCentury } from './LinksForCentury';

type Props = {
  people: Person[],
  onSetFilteredPeople: (newPeople: Person[]) => void,
};

export const PeopleFilters: React.FC<Props> = React.memo(({
  people, onSetFilteredPeople,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const location = useLocation();

  const getFilteredPeople = () => {
    return [...people]
      .filter(person => { // FiltredPeopleByQuery
        const correctQuery = query.trim().toLocaleLowerCase();
        const { name, motherName, fatherName } = person;

        if (correctQuery) {
          if (motherName !== null
            && motherName.toLocaleLowerCase().includes(correctQuery)
          ) {
            return true;
          }

          if (fatherName !== null
            && fatherName.toLocaleLowerCase().includes(correctQuery)
          ) {
            return true;
          }

          return name.toLocaleLowerCase().includes(correctQuery);
        }

        return true;
      })
      .filter(person => { // FiltredPeopleBySex
        if (sex) {
          return person.sex === sex;
        }

        return true;
      })
      .filter(person => { // FiltredPeopleByCentury
        if (centuries !== undefined && centuries.length > 0) {
          const { born } = person;
          const bornCentury = Math.ceil(+born / 100);

          return centuries.includes(bornCentury.toString());
        }

        return true;
      });
  };

  const handlerQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = { query: event.target.value || null };

    setSearchParams(getSearchWith(searchParams, newParams));
  };

  useEffect(() => {
    onSetFilteredPeople(getFilteredPeople());
  }, [searchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': sex === Sex.Empty })}
          to={{
            pathname: location.pathname,
            search: getSearchWith(searchParams, { sex: null }),
          }}
        >
          All
        </Link>

        <Link
          className={classNames({ 'is-active': sex === Sex.Male })}
          to={{
            pathname: location.pathname,
            search: getSearchWith(searchParams, { sex: Sex.Male }),
          }}
        >
          Male
        </Link>

        <Link
          className={classNames({ 'is-active': sex === Sex.Female })}
          to={{
            pathname: location.pathname,
            search: getSearchWith(searchParams, { sex: Sex.Female }),
          }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handlerQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <LinksForCentury />
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            pathname: location.pathname,
            search: getSearchWith(searchParams, {
              sex: null,
              centuries: null,
              query: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
});
