import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    const value = event.target.value;

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const getCenturyParams = (century: string) => {
    if (centuries.includes(century)) {
      return {
        centuries: centuries.filter(c => c !== century),
      };
    }

    return {
      centuries: [...centuries, century],
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }} className={!sex ? 'is-active' : ''}>
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
            <SearchLink
              data-cy="century"
              params={getCenturyParams('16')}
              className={`button mr-1 ${centuries.includes('16') ? 'is-info' : ''}`}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              params={getCenturyParams('17')}
              className={`button mr-1 ${centuries.includes('17') ? 'is-info' : ''}`}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              params={getCenturyParams('18')}
              className={`button mr-1 ${centuries.includes('18') ? 'is-info' : ''}`}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              params={getCenturyParams('19')}
              className={`button mr-1 ${centuries.includes('19') ? 'is-info' : ''}`}
            >
              19
            </SearchLink>
            <SearchLink
              data-cy="century"
              params={getCenturyParams('20')}
              className={`button mr-1 ${centuries.includes('20') ? 'is-info' : ''}`}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: [] }}
              className="button is-success is-outlined"
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
            sex: null,
            query: null,
            centuries: [],
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
