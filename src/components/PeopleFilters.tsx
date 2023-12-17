import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>,
  people: Person[]
};

export const PeopleFilters:React.FC<Props> = ({ setPeople, people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];

  const filteredPeople = people.filter(person => {
    const filteredPerson = (
      person.name.toLowerCase().includes(query.toLowerCase())
    || (person.fatherName
      && person.fatherName.toLowerCase().includes(query.toLowerCase()))
    || (person.motherName
      && person.motherName.toLowerCase().includes(query.toLowerCase()))
    ) && (
      sex
        ? person.sex === sex
        : person
    ) && (
      centuries.length
        ? centuries.includes((Math.ceil(+person.born / 100).toString()))
        : person
    );

    return filteredPerson;
  });

  useEffect(() => {
    setPeople(filteredPeople);
  }, [filteredPeople, setPeople]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value || null,
      }),
    );
  };

  const handleCenturies = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(cent => cent !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !sex })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'm' })}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'f' })}
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
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
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <Link
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': centuries.includes('16') },
              )}
              to={{
                search: getSearchWith(
                  searchParams,
                  { centuries: handleCenturies('16') },
                ),
              }}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': centuries.includes('17') },
              )}
              to={{
                search: getSearchWith(
                  searchParams,
                  { centuries: handleCenturies('17') },
                ),
              }}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': centuries.includes('18') },
              )}
              to={{
                search: getSearchWith(
                  searchParams,
                  { centuries: handleCenturies('18') },
                ),
              }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': centuries.includes('19') },
              )}
              to={{
                search: getSearchWith(
                  searchParams,
                  { centuries: handleCenturies('19') },
                ),
              }}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': centuries.includes('20') },
              )}
              to={{
                search: getSearchWith(
                  searchParams,
                  { centuries: handleCenturies('20') },
                ),
              }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                search: getSearchWith(
                  searchParams,
                  { centuries: [] },
                ),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(
              searchParams,
              { centuries: [], query: null, sex: null },
            ),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
