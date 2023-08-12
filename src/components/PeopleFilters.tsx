/* eslint-disable max-len */
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { FC } from 'react';
import { SearchLink } from '../utils/SearchLink';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

type Props = {
  query: string;
  sex: string;
  centuries: string[];
};

const sexValues = [
  { title: 'All', value: '' },
  { title: 'Female', value: 'f' },
  { title: 'Male', value: 'm' },
];

const centuriesValues = ['16', '17', '18', '19', '20'];

export const PeopleFilters: FC<Props> = ({ query, sex, centuries }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleQueryChange(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function togglePeopleCenturies(currentCentury: string) {
    const toggledCentury = centuries.includes(currentCentury)
      ? centuries.filter((century) => century !== currentCentury)
      : [...centuries, currentCentury];

    return toggledCentury;
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexValues.map((gender) => (
          <SearchLink
            className={classNames({
              'is-active': gender.value === sex,
            })}
            key={gender.title}
            params={{ sex: gender.value || null }}
          >
            {gender.title}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={(event) => handleQueryChange({ query: event.target.value || null })}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesValues.map((century) => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{ centuries: togglePeopleCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
          params={{ query: null, sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
