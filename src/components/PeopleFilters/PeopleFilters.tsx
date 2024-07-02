import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchParams } from '../../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleSexChange = (value: string) => {
    setSearchWith({ sex: value || null });
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const handleCenturesTogle = (centure: string) => {
    const newCentury = centuries.includes(centure)
      ? centuries.filter(cen => cen !== centure)
      : [...centuries, centure];

    setSearchWith({ centuries: newCentury });
  };

  const clearAll = () => {
    setSearchWith({
      sex: '',
      query: '',
      senturies: null,
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': sex === '',
          })}
          to="#/people"
          onClick={e => {
            e.preventDefault();
            handleSexChange('');
          }}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': sex === 'm',
          })}
          to="/people"
          onClick={e => {
            e.preventDefault();
            handleSexChange('m');
          }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': sex === 'f',
          })}
          to="/people"
          onClick={e => {
            e.preventDefault();
            handleSexChange('f');
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
              className={classNames('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              to="#/people"
              onClick={e => {
                e.preventDefault();
                handleCenturesTogle('16');
              }}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              to="#/people"
              onClick={e => {
                e.preventDefault();
                handleCenturesTogle('17');
              }}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              to="#/people"
              onClick={e => {
                e.preventDefault();
                handleCenturesTogle('18');
              }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              to="#/people"
              onClick={e => {
                e.preventDefault();
                handleCenturesTogle('19');
              }}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              to="#/people"
              onClick={e => {
                e.preventDefault();
                handleCenturesTogle('20');
              }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              to="#/people"
              onClick={() => {
                setSearchWith({
                  centuries: null,
                });
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
          to="/people"
          onClick={clearAll}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
