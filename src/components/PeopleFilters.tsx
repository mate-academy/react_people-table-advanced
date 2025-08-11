import classNames from 'classnames';
import { Link, useSearchParams, useLocation } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const location = useLocation();

  const mergeSearchParams = (newParams: { [key: string]: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === '' || value == null) {
        params.delete(key);

        return;
      }

      if (key === 'centuries') {
        const currentValues = params.getAll('centuries');

        if (currentValues.includes(value)) {
          const newValues = currentValues.filter(val => val !== value);

          params.delete('centuries');
          newValues.forEach(val => params.append('centuries', val));
        } else {
          params.append('centuries', value);
        }
      } else {
        params.set(key, value);
      }
    });

    return `${location.pathname}?${params.toString()}`;
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value === '') {
      params.delete('query');
    } else {
      params.set('query', e.target.value);
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames('', { 'is-active': sex === '' })}
          to={mergeSearchParams({ sex: '' })}
        >
          All
        </Link>
        <Link
          className={classNames('', { 'is-active': sex === 'm' })}
          to={mergeSearchParams({ sex: 'm' })}
        >
          Male
        </Link>
        <Link
          className={classNames('', { 'is-active': sex === 'f' })}
          to={mergeSearchParams({ sex: 'f' })}
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
            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              to={mergeSearchParams({ centuries: '16' })}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              to={mergeSearchParams({ centuries: '17' })}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              to={mergeSearchParams({ centuries: '18' })}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              to={mergeSearchParams({ centuries: '19' })}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              to={mergeSearchParams({ centuries: '20' })}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button mr-1', {
                'is-success': centuries.length === 0,
              })}
              to={mergeSearchParams({ centuries: '' })}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={location.pathname}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
