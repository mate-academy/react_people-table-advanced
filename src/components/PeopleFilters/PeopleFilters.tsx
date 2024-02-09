import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { SexFilter } from '../../types/SexFilter';
import { getSearchWith } from '../../utils/searchHelper';
import { Params } from '../../types/Params';

const CENTURIES = [16, 17, 18, 19];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('century');
  const sex = searchParams.get('sex');

  function toggleCentury(data: number) {
    const century = data.toString();

    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(century)
      ? centuries.filter(item => item !== century)
      : [...centuries, century];

    params.delete('century');

    newCenturies.forEach(el => {
      params.append('century', el);
    });

    setSearchParams(params);
  }

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p
        className="panel-tabs"
        data-cy="SexFilter"
      >
        <Link
          type="button"
          className={classNames({ 'is-active': !sex })}
          to={{
            search: getSearchWith(
              { sex: +SexFilter.all || null },
              searchParams,
            ),
          }}
        >
          All
        </Link>

        <Link
          type="button"
          className={classNames({ 'is-active': sex === SexFilter.male })}
          to={{
            search: getSearchWith({ sex: SexFilter.male }, searchParams),
          }}
        >

          Male
        </Link>

        <Link
          type="button"
          className={classNames({ 'is-active': sex === SexFilter.female })}
          to={{
            search: getSearchWith(
              { sex: SexFilter.female },
              searchParams,
            ),
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
            value={query || ''}
            onChange={event => setSearchWith({
              query: event.target.value || null,
            })}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <button
                type="button"
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              type="button"
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{ search: getSearchWith({ century: null }, searchParams) }}
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
            search: getSearchWith({
              century: null,
              sex: null,
              query: null,
            }, searchParams),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
