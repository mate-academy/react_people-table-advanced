import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import { centuries, sexFilter } from './Filters.data';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';

type Props = {
  sexParam: 'male' | 'female' | 'all';
};

export const Filters = ({ sexParam }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centParam = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const hanleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchWith({ query: value || null });
  };

  const toogleCenturies = (century: string) => {
    const newCentury = centParam.includes(century)
      ? centParam.filter(cent => cent !== century)
      : [...centParam, century];

    return newCentury;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilter.map(option => (
          <SearchLink
            key={option.value}
            params={{ sex: option.href }}
            className={sexParam === option.value ? 'is-active' : ''}
          >
            {option.value}
          </SearchLink>
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
            onChange={hanleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centParam.includes(century),
                })}
                params={{ centuries: toogleCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!centuries.length,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
