import classNames from 'classnames';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const menCN = classNames({
    'is-active': searchParams.get('sex') === 'm',
  });

  const femaleCN = classNames({
    'is-active': searchParams.get('sex') === 'f',
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSP = new URLSearchParams(searchParams.toString());

    setQuery(event.target.value);
    newSP.set('query', event.target.value);
    setSearchParams(newSP.toString());

    if (event.target.value.length === 0) {
      newSP.delete('query');
      setSearchParams(newSP.toString());
    }
  };

  const getCenturiesLink = (cent: string) => {
    return {
      centuries: searchParams.getAll('centuries').includes(cent)
        ? [...searchParams.getAll('centuries').filter(item => item !== cent)]
        : [...searchParams.getAll('centuries'), cent],
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={!searchParams.get('sex') ? 'is-active' : ''}
        >
          All
        </SearchLink>
        <SearchLink className={menCN} params={{ sex: 'm' }}>
          Male
        </SearchLink>
        <SearchLink className={femaleCN} params={{ sex: 'f' }}>
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
            onChange={e => handleInput(e)}
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
              className={`button mr-1 ${searchParams.getAll('centuries').includes('16') && 'is-info'}`}
              params={getCenturiesLink('16')}
            >
              16
            </SearchLink>

            <SearchLink
              params={getCenturiesLink('17')}
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('17') && 'is-info'}`}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('18') && 'is-info'}`}
              params={getCenturiesLink('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('19') && 'is-info'}`}
              params={getCenturiesLink('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('20') && 'is-info'}`}
              params={getCenturiesLink('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={`button ${searchParams.get('centuries') ? 'is-outlined' : 'is-success'}`}
              onClick={() => {
                searchParams.delete('centuries');
                setSearchParams(searchParams);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: null }}
          onClick={() => {
            setQuery('');
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
