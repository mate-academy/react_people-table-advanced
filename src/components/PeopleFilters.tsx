import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuriesArr = [16, 17, 18, 19, 20];
  const centuries = searchParams.getAll('centuries') || [];

  type Params = {
    query?: string | null,
    centuries?: string[],
  };

  const setSearchWith = (params: Params) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: e.target.value || null });
  };

  const toggleCenturies = (ch: string) => {
    const newCenturies = centuries.includes(ch)
      ? centuries.filter(letter => letter !== ch)
      : [...centuries, ch];

    setSearchWith({ centuries: newCenturies });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={!sex ? 'is-active' : ''}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={sex === 'f' ? 'is-active' : ''}

        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            className="input"
            placeholder="Search"
            onChange={handleQueryChange}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArr.map(century => (
              // eslint-disable-next-line react/button-has-type
              <button
                key={century}
                data-cy="century"
                className={classNames('button mr-1',
                  { 'is-info': centuries.includes(century.toString()) })}
                onClick={() => toggleCenturies(century.toString())}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={classNames('button is-success',
                { 'is-outlined': centuries.length !== 0 })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
