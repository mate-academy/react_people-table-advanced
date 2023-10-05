import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const sexFilter: {
  [key:string]: string | null;
} = {
  All: null,
  Male: 'm',
  Female: 'f',
};

export const PeopleFilters:React.FC<{
  centuries: number[]
}> = ({ centuries }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeQuery: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchParams(getSearchWith(searchParams, {
      query: event.target.value || null,
    }));
  };

  const params = {
    century: searchParams.getAll('century').map(Number),
    sex: searchParams.get('sex'),
    query: searchParams.get('query'),
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.keys(sexFilter).map((filter:string) => (
          <SearchLink
            key={filter}
            className={sexFilter[filter] === params.sex ? 'is-active' : ''}
            params={{ sex: sexFilter[filter] }}
          >
            {filter}
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
            value={params.query || ''}
            onChange={onChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <div className="level-left">
              {centuries.map(century => (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': params.century.includes(century),
                  })}
                  params={{
                    century: params.century.includes(century)
                      ? params.century
                        .filter(value => value !== century).map(String)
                      : [...params.century, century].map(String),
                  }}
                >
                  {century}
                </SearchLink>
              ))}
            </div>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={`button is-success ${params.century.length > 0 ? 'is-outlined' : ''}`}
              params={{ century: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          data-cy="centuryALL"
          className="button is-link is-outlined is-fullwidth"
          params={{ century: null, query: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
