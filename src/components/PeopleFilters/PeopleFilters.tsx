import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { AvailableFilters, FilterTypes } from '../../utils/enums';
import { CENTURIES } from '../../utils/const';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink/SearchLink';
type Props = {
  setSelectedFilter: (type: string) => void;
};
export const PeopleFilters: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(AvailableFilters.Query) || '';
  const sexParam = searchParams.get(AvailableFilters.Sex) || FilterTypes.All;
  const centuries = searchParams.getAll(AvailableFilters.Centuries) || [];

  function setSeachWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleSexChange(sex: string) {
    setSeachWith({ sex: sex || null });
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSeachWith({ query: event.target.value || null });
  }

  function toggleCenturies(century: string) {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    return newCenturies;
  }

  function clearCenturies() {
    setSeachWith({ centuries: [] });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(FilterTypes).map(([key, value]) => (
          <a
            key={key}
            className={classNames({
              'is-active': sexParam === value,
            })}
            onClick={() => handleSexChange(value)}
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
            {CENTURIES.map(century => (
              <SearchLink
                params={{ centuries: toggleCenturies(century) }}
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={clearCenturies}
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
