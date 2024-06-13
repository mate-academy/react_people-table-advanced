import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const inputValue = searchParams.get('query') || '';
  const letters = searchParams.getAll('letters') || [];
  const centuries = ['16', '17', '18', '19', '20'];

  const changeQuery = (newQuery: string) => {
    const query = newQuery ? newQuery : null;

    setSearchParams(getSearchWith(searchParams, { query }));
  };

  const getNewLetters = (letter: string) => {
    if (letters.includes(letter)) {
      const search = getSearchWith(searchParams, {
        letters: letters.filter(p => p !== letter),
      });

      return search;
    } else {
      const search = getSearchWith(searchParams, {
        letters: [...letters, letter],
      });

      return search;
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === null,
          })}
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          to={{
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
          to={{
            search: getSearchWith(searchParams, { sex: 'f' }),
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
            value={inputValue}
            onChange={e => changeQuery(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(link => {
              return (
                <Link
                  key={link}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': letters.includes(link),
                  })}
                  to={{
                    search: getNewLetters(link),
                  }}
                >
                  {link}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames(
                'button',
                {
                  'is-outlined is-success': letters.length !== 0,
                },
                {
                  'is-success': letters.length === 0,
                },
              )}
              to={{
                search: '',
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
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
