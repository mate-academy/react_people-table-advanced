import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import cn from 'classnames';

enum FilterStatus {
  All = '',
  Male = 'm',
  Female = 'f',
}

enum Centuries {
  Sixteen = '16',
  Seventeen = '17',
  Eighteen = '18',
  Nineteen = '19',
  Twenty = '20',
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('query') || '';
  const curFilter = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function handleQuery(event: React.ChangeEvent<HTMLInputElement>) {
    const newSearchParams = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(newSearchParams);
  }

  function handleFilterStatus(filterBy: FilterStatus) {
    const newSearchParams = getSearchWith(searchParams, {
      sex: filterBy || null,
    });

    setSearchParams(newSearchParams);
  }

  function toggleCentury(century: string) {
    const newSearchParams = getSearchWith(searchParams, {
      centuries: centuries.includes(century)
        ? centuries.filter(curCentury => curCentury !== century)
        : [...centuries, century],
    });

    setSearchParams(newSearchParams);
  }

  function handleResetCenturies() {
    const newSearchParams = getSearchWith(searchParams, {
      centuries: [],
    });

    setSearchParams(newSearchParams);
  }

  function handleRestAllFilters() {
    const newSearchParams = getSearchWith(searchParams, {
      query: '',
      sex: '',
      centuries: [],
    });

    setSearchParams(newSearchParams);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(FilterStatus).map(([key, value]) => (
          <a
            key={key}
            className={cn({ 'is-active': curFilter === value })}
            onClick={() => {
              handleFilterStatus(value);
            }}
          >
            {key}
          </a>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={queryParam}
            onChange={event => {
              handleQuery(event);
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
            {Object.values(Centuries).map(value => (
              <a
                key={value}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': centuries.includes(value),
                })}
                onClick={() => {
                  toggleCentury(value);
                }}
              >
                {value}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': !!centuries.length,
              })}
              onClick={() => handleResetCenturies()}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => handleRestAllFilters()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
