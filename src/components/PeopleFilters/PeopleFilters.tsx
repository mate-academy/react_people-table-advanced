import { NavigateOptions, URLSearchParamsInit } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import classNames from 'classnames';

const sexs = ['All', 'Male', 'Female'];
const centuries = [16, 17, 18, 19, 20];

type Props = {
  sex: string;
  query: string;
  centuriesFromParams: string[];
  searchParams: URLSearchParams;
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOpts?: NavigateOptions,
  ) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  sex,
  query,
  centuriesFromParams,
  searchParams,
  setSearchParams,
}) => {
  const handleSex = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    type: string,
  ) => {
    e.preventDefault();
    let newParams = '';

    if (type === 'a') {
      searchParams.delete('sex');
    } else {
      newParams = getSearchWith(searchParams, {
        sex: type,
      });
    }

    setSearchParams(newParams);
  };

  const handleCenturies = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    value: string,
  ) => {
    e.preventDefault();

    const newCenturies = centuriesFromParams.includes(value)
      ? centuriesFromParams.filter(cent => cent !== value)
      : [...centuriesFromParams, value];

    const newParams = getSearchWith(searchParams, {
      centuries: newCenturies,
    });

    setSearchParams(newParams);
  };

  const handleQuery = (value: string) => {
    let newParams = '';

    if (!value) {
      searchParams.delete('query');
    } else {
      newParams = getSearchWith(searchParams, {
        query: value,
      });
    }

    setSearchParams(newParams);
  };

  const resetAll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    setSearchParams('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexs.map((item, index) => (
          <a
            key={index}
            className={classNames({
              'is-active': sex === item.toLowerCase()[0],
            })}
            onClick={e => handleSex(e, item.toLowerCase()[0])}
          >
            {item}
          </a>
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
            onChange={e => handleQuery(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(item => (
              <a
                key={item}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuriesFromParams.includes(item.toString()),
                })}
                onClick={e => handleCenturies(e, item.toString())}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={e => resetAll(e)}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={e => resetAll(e)}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
