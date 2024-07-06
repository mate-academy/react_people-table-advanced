import classNames from 'classnames';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchParams } from '../../utils/searchHelper';
import { Sex } from '../../types/Sex';
import { useContext, useEffect } from 'react';
import { PeopleContext } from '../../PeopleContext';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { people, warning, centuriesArray, setWarning, setCenturiesArray } =
    useContext(PeopleContext);

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    if (warning) {
      setWarning('');
    }
    // eslint-disable-next-line
  }, [searchParams]);

  useEffect(() => {
    let tempArr: string[] = [];

    people.forEach(item => {
      if (!tempArr.includes((Math.floor(item.born / 100) + 1).toString())) {
        tempArr = [...tempArr, (Math.floor(item.born / 100) + 1).toString()];
      }
    });
    setCenturiesArray(tempArr.sort((a, b) => +a - +b));
  }, [people, setCenturiesArray]);

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
    navigate({
      pathname: '/people',
      search,
    });
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const clearAll = () => {
    setSearchWith({
      sex: Sex.All,
      query: '',
      senturies: null,
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(Sex).map(([key, value]) => (
          <Link
            key={key}
            className={classNames({
              'is-active': value === sex,
            })}
            to={{
              pathname: '/people',
              search: getSearchWith(
                {
                  sex: value || null,
                },
                searchParams,
              ),
            }}
          >
            {key}
          </Link>
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
            {centuriesArray?.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{
                  pathname: '/people',
                  search: getSearchWith(
                    {
                      centuries: centuries.includes(century)
                        ? centuries.filter(cen => cen !== century)
                        : [...centuries, century],
                    },
                    searchParams,
                  ),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              to="#/people"
              onClick={() => setSearchWith({ centuries: null })}
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
