import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const currentSex = searchParams.get('sex') || null;

  type ParamsType = {
    sort: string | null,
    order: string | null,
    sex: 'm' | 'f' | null,
    query: string | null,
    centuries: number | null,
  };

  function setSearchWith(params: Partial<ParamsType>) {
    const currentSort = searchParams.get('sort') || '';
    const currentOrder = searchParams.get('order') || null;

    const updatedParams: ParamsType = {
      sort: !currentSort ? null : currentSort,
      order: currentOrder,
      sex: !params.sex ? null : params.sex,
      query: !params.query ? null : params.query,
      centuries: params.centuries === undefined ? null : params.centuries,
    };

    const search = getSearchWith(updatedParams, searchParams);

    setSearchParams(search);
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value });
  };

  const toggleCenturies = (recivedCentury: number) => {
    const century = recivedCentury.toString();

    return centuries.includes(century)
      ? centuries.filter(
        (possibleCentury) => possibleCentury !== century,
      )
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': currentSex === null })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': currentSex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': currentSex === 'f' })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="text"
            className="input"
            placeholder="Search"
            value={query}
            onChange={onInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map((century) => (
              <SearchLink
                data-cy="century"
                key={century}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(`${century}`),
                })}
                params={{ centuries: toggleCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
