import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

const buttonArray = ['16', '17', '18', '19', '20'];

const getButtonClass = (value: string, numbers: string[]) => {
  return classNames('button', 'mr-1', {
    'is-info': numbers.includes(value),
  });
};

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const numbers = searchParams.getAll('numbers') || [];

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  function getNumberArray(number: string) {
    return numbers.includes(number)
      ? numbers.filter(ch => ch !== number)
      : [...numbers, number];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
          className={classNames({
            'is-active': !sex.length,
          })}
        >
          All
        </Link>

        <Link
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
          className={classNames({
            'is-active': sex === 'm',
          })}
        >
          Male
        </Link>

        <Link
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
          className={classNames({
            'is-active': sex === 'f',
          })}
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
            onChange={event => handleQueryChange(event)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {buttonArray.map(number => (
              <Link
                key={number}
                to={{
                  search: getSearchWith(searchParams, {
                    numbers: getNumberArray(number),
                  }),
                }}
                data-cy="century"
                className={getButtonClass(number, numbers)}
              >
                {number}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              to={{ search: getSearchWith(searchParams, { numbers: null }) }}
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': !!numbers.length,
              })}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{
            search: getSearchWith(searchParams, {
              sex: null,
              numbers: null,
              query: null,
            }),
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
