import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  query: string;
  sex: string;
  centuries: string[];
};

const availableCenturies = [16, 17, 18, 19, 20];

export const PeopleFilters = ({ query, sex, centuries }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{
            pathname: '/people',
            search: getSearchWith(searchParams, { sex: null }),
          }}
          className={sex === '' ? 'is-active' : ''}
        >
          All
        </Link>

        <Link
          to={{
            pathname: '/people',
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </Link>

        <Link
          to={{
            pathname: '/people',
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
          className={sex === 'f' ? 'is-active' : ''}
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
            onChange={event => {
              setSearchParams(
                getSearchWith(searchParams, {
                  query: event.target.value || null,
                }),
              );
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {availableCenturies.map(century => {
              const isSelected = centuries.includes(century.toString());
              const updatedCenturies = isSelected
                ? centuries.filter(c => c !== century.toString())
                : [...centuries, century.toString()];

              return (
                <Link
                  to={{
                    pathname: '/people',
                    search: getSearchWith(searchParams, {
                      centuries: updatedCenturies,
                    }),
                  }}
                  data-cy="century"
                  key={century}
                  className={isSelected ? 'button mr-1 is-info' : 'button mr-1'}
                >
                  {century}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              to={{
                pathname: '/people',
                search: getSearchWith(searchParams, { centuries: null }),
              }}
              className={
                centuries.length > 0
                  ? 'button is-success is-outlined'
                  : 'button is-success'
              }
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
