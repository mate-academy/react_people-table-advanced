import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { updateSearch } from '../utils/MyImplementationOfSearchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      searchParams.set('query', event.target.value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('query');
      setSearchParams(searchParams);
    }
  };

  const centuryMarkup = (century: string) => {
    return (
      <Link
        data-cy="century"
        className={
          classNames('button', 'mr-1', {
            'is-info': searchParams.toString().includes(`centuries=${century}`),
          })
        }
        to={{
          search: updateSearch({ centuries: [century] }),
        }}
      >
        {century}
      </Link>
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={
            classNames({ 'is-active': searchParams.get('sex') === null })
          }
          to={{
            search: updateSearch({ sex: null }),
          }}
        >
          All
        </Link>
        <Link
          className={
            classNames({
              'is-active': searchParams.toString().includes('sex=m'),
            })
          }
          to={{
            search: updateSearch({ sex: 'm' }),
          }}
        >
          Male
        </Link>
        <Link
          className={
            classNames({
              'is-active': searchParams.toString().includes('sex=f'),
            })
          }
          to={{
            search: updateSearch({ sex: 'f' }),
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
            value={searchParams.get('query') || ''}
            onChange={queryChangeHandler}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryMarkup('16')}
            {centuryMarkup('17')}
            {centuryMarkup('18')}
            {centuryMarkup('19')}
            {centuryMarkup('20')}
          </div>
          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={
                classNames('button', 'is-success', {
                  'is-outlined': searchParams.toString().includes('centuries'),
                })
              }
              to={{
                search: updateSearch({ centuries: null }),
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
          to={{
            search: updateSearch({
              centuries: null,
              sex: null,
              query: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
