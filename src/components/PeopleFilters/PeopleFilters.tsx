import cn from 'classnames';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const [queryInput, setQueryInput] = useState('');

  const setSearchWith = (params: SearchParams) => {
    setSearchParams(getSearchWith(searchParams, params));
  };

  const setSex = (value: null | 'f' | 'm') => {
    setSearchWith({ sex: value });
  };

  const setQuery = (value: string) => {
    const newValue = value || null;

    setSearchWith({ query: newValue });
  };

  const toggleCentury = (value: string) => {
    const newCenturies = centuries.includes(value)
      ? centuries.filter(item => item !== value)
      : [...centuries, value];

    setSearchWith({ centuries: newCenturies });
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(event.target.value);

    setQuery(event.target.value);
  };

  const handleClear = () => {
    setSearchParams({});
    setQueryInput('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className={cn({ 'is-active': !sex })} onClick={() => setSex(null)}>
          All
        </a>
        <a
          className={cn({ 'is-active': sex === 'm' })}
          onClick={() => setSex('m')}
        >
          Male
        </a>
        <a
          className={cn({ 'is-active': sex === 'f' })}
          onClick={() => setSex('f')}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={queryInput}
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
            <a
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': centuries.includes('16'),
              })}
              onClick={() => toggleCentury('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': centuries.includes('17'),
              })}
              onClick={() => toggleCentury('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': centuries.includes('18'),
              })}
              onClick={() => toggleCentury('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': centuries.includes('19'),
              })}
              onClick={() => toggleCentury('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': centuries.includes('20'),
              })}
              onClick={() => toggleCentury('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button', 'mr-1', 'is-success', {
                'is-outlined': centuries.length > 0,
              })}
              onClick={() => setSearchWith({ centuries: [] })}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={handleClear}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
