import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Sex } from '../../types/Sex';
import { getSearchWith } from '../../utils/search';

const ListData = [16, 17, 18, 19, 20];

type Props = {
  centuries: string[];
  query: string;
  sex: Sex;
  searchParams: URLSearchParams,
  setSearchParams: (s: URLSearchParams) => void
};

export const PeopleFilters: React.FC<Props> = ({
  centuries,
  query,
  setSearchParams,
  searchParams,
  sex,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setSearchWith(params: any) {
    const search = getSearchWith(params, searchParams);
    const mewSearchParams = new URLSearchParams(search);

    setSearchParams(mewSearchParams);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': sex === Sex.All,
          })}
          to={{ search: getSearchWith({ sex: null }, searchParams) }}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': sex === Sex.Male,
          })}
          to={{ search: getSearchWith({ sex: Sex.Male }, searchParams) }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': sex === Sex.Female,
          })}
          to={{ search: getSearchWith({ sex: Sex.Female }, searchParams) }}
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
            {ListData.map(num => (
              <Link
                key={num}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(num.toString()),
                })}
                to={{
                  search: getSearchWith({
                    centuries: centuries.includes(num.toString())
                      ? centuries.filter(c => c !== num.toString())
                      : [...centuries, num.toString()],
                  }, searchParams),
                }}
              >
                {num}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                search:
                  getSearchWith({ centuries: null }, searchParams),
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
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
