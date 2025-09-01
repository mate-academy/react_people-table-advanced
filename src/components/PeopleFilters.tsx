import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { Person } from '../types/Person';
import { getCentury } from '../utils/getCentury';

type Props = {
  people: Person[];
  query: string;
  centuries: string[];
};

export const PeopleFilters: React.FC<Props> = ({
  people,
  query,
  centuries,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [nameQuery, setNameQuery] = useState(query);

  const sex = searchParams.get('sex') || '';

  const availableCenturies = Array.from(
    new Set(
      people
        .map(person => getCentury(person.born))
        .filter((century): century is number => !!century)
        .map(century => century.toString()),
    ),
  ).sort();

  useEffect(() => {
    setNameQuery(query);
  }, [query]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newParams = new URLSearchParams(searchParams);

    setNameQuery(value);

    if (!value) {
      newParams.delete('query');
    } else {
      newParams.set('query', value);
    }

    setSearchParams(newParams);
  };

  const handleCenturyToggle = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');
    newCenturies.forEach(c => newParams.append('centuries', c));

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sex === 'f' })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={nameQuery}
            onChange={handleNameChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {availableCenturies.map(century => (
              <button
                key={century}
                data-cy="century"
                type="button"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
                onClick={() => handleCenturyToggle(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
