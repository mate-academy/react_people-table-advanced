import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const location = useLocation();
  const [textInput, setTextInput] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const centuries = searchParams.get('centuries');

  const getUpdatedLink = (key: string, value: string | null) => {
    const params = new URLSearchParams(location.search);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    return `/people?${params.toString()}`;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    setTextInput(value);

    const newUrl = getUpdatedLink('name', value);

    navigate(newUrl, { replace: true });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={sex === null ? 'is-active' : ''}
          to={getUpdatedLink('sex', null)}
        >
          All
        </Link>
        <Link
          className={sex === 'm' ? 'is-active' : ''}
          to={getUpdatedLink('sex', 'm')}
        >
          Male
        </Link>
        <Link
          className={sex === 'f' ? 'is-active' : ''}
          to={getUpdatedLink('sex', 'f')}
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
            value={textInput}
            placeholder="Search"
            onChange={handleSearchChange}
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
              className={
                centuries === '16' ? 'button mr-1 is-info' : 'button mr-1'
              }
              to={getUpdatedLink('centuries', '16')}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={
                centuries === '17' ? 'button mr-1 is-info' : 'button mr-1'
              }
              to={getUpdatedLink('centuries', '17')}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={
                centuries === '18' ? 'button mr-1 is-info' : 'button mr-1'
              }
              to={getUpdatedLink('centuries', '18')}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={
                centuries === '19' ? 'button mr-1 is-info' : 'button mr-1'
              }
              to={getUpdatedLink('centuries', '19')}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={
                centuries === '20' ? 'button mr-1 is-info' : 'button mr-1'
              }
              to={getUpdatedLink('centuries', '20')}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={getUpdatedLink('centuries', null)}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
