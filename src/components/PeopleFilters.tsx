import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Sex } from '../types/Sex';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleSexFilterChange = (sex: Sex) => {
    const params = new URLSearchParams(searchParams);

    if (sex === '') {
      params.delete('sex');
    } else {
      params.set('sex', sex);
    }

    setSearchParams(params);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;

    if (value === '') {
      params.delete('query');
    } else {
      params.set('query', value);
    }

    setSearchParams(params);
  };

  const handleCenturyFilterChange = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    params.delete('centuries');

    newCenturies.forEach(c => params.append('centuries', c));
    setSearchParams(params);
  };

  const handleClearCenturyFilter = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    params.delete('query');
    params.delete('sex');
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({
            'is-active': sexFilter === '',
          })}
          to="#"
          onClick={e => {
            e.preventDefault();
            handleSexFilterChange('');
          }}
        >
          All
        </Link>
        <Link
          className={cn({
            'is-active': sexFilter === 'm',
          })}
          to="#"
          onClick={e => {
            e.preventDefault();
            handleSexFilterChange('m');
          }}
        >
          Male
        </Link>
        <Link
          className={cn({
            'is-active': sexFilter === 'f',
          })}
          to="#"
          onClick={e => {
            e.preventDefault();
            handleSexFilterChange('f');
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
            onChange={e => handleSearchChange(e)}
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
              className={cn('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              to="#"
              onClick={e => {
                e.preventDefault();
                handleCenturyFilterChange('16');
              }}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              to="#"
              onClick={e => {
                e.preventDefault();
                handleCenturyFilterChange('17');
              }}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              to="#"
              onClick={e => {
                e.preventDefault();
                handleCenturyFilterChange('18');
              }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              to="#"
              onClick={e => {
                e.preventDefault();
                handleCenturyFilterChange('19');
              }}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              to="#"
              onClick={e => {
                e.preventDefault();
                handleCenturyFilterChange('20');
              }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="#"
              onClick={e => {
                e.preventDefault();
                handleClearCenturyFilter();
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
          to="#"
          onClick={() => handleResetFilters()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
