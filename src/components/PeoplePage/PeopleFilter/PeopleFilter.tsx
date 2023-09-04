import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { QueryParams } from '../../../types/QueryParams';
import { SearchParams, getSearchWith } from '../../../utils/searchHelper';
import { SearchLink } from './SearchLink';

type Props = {
  value: string;
};

const numbersOfCenturies = ['16', '17', '18', '19', '20'];

export const PeopleFilter: React.FC<Props> = ({ value }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get(QueryParams.Sex) || '';
  const centuries = searchParams.getAll(QueryParams.Centuries) || [];

  const setSearchWith = (param: SearchParams) => {
    const newQuery = getSearchWith(searchParams, param);

    setSearchParams(newQuery.toString());
  };

  const getCenturiesForSearch = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(currentCentury => currentCentury !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">
        Filters
      </p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': !sex,
          })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({
            'is-active': sex === 'm',
          })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({
            'is-active': sex === 'f',
          })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={value}
            onChange={(e) => setSearchWith({ query: e.target.value || null })}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {numbersOfCenturies.map(currentCentury => (
              <SearchLink
                data-cy="century"
                key={currentCentury}
                params={{ centuries: getCenturiesForSearch(currentCentury) }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(currentCentury),
                })}
              >
                {currentCentury}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={classNames('button', 'is-success', {
                'is-outlined': centuries.length > 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ query: null, sex: null, centuries: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
