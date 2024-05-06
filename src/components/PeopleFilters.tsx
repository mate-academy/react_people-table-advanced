import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import cn from 'classnames';
import PanelFilterBlock from './PanelFilterBlock';

enum FilterStatus {
  All = '',
  Male = 'm',
  Female = 'f',
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('query') || '';
  const curFilter = searchParams.get('sex') || '';

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
            onChange={handleQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <PanelFilterBlock />
    </nav>
  );
};
