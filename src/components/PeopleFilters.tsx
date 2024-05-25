import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter } from '../types';
import { getSearchWith } from '../utils/searchWith';

type Props = {
  filter: Filter;
};

export const PeopleFilters: React.FC<Props> = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const defaultCenturies = ['16', '17', '18', '19', '20'];

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const setSearchWith = (params: any) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: e.target.value || null });
  };

  const reset = () => {
    return getSearchWith(
      {
        query: null,
        centuries: null,
        sex: null,
      },
      searchParams,
    );
  };

  const selectLinkCentury = (tempCenturies: string[], century: string) => {
    return getSearchWith(
      {
        tempCenturies: tempCenturies.includes(century)
          ? tempCenturies.filter(tempCentury => tempCentury !== century)
          : [...tempCenturies, century],
      },
      searchParams,
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{ search: getSearchWith({ sex: null }, searchParams) }}
          className={classNames({ 'is-active': sex === '' })}
        >
          All
        </Link>
        <Link
          to={{ search: getSearchWith({ sex: 'm' }, searchParams) }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </Link>
        <Link
          to={{ search: getSearchWith({ sex: 'f' }, searchParams) }}
          className={classNames({ 'is-active': sex === 'f' })}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            className="input"
            placeholder="Search"
            onChange={handleQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {defaultCenturies.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{ search: selectLinkCentury(centuries, century) }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': centuries.length,
              })}
              to={{ search: getSearchWith({ centuries: null }, searchParams) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          onClick={reset}
          to={{ search: reset() }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
