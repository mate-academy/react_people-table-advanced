import { FilterSexType } from '../types/Sex';
import classNames from 'classnames';
import { SetURLSearchParams } from 'react-router-dom';
import { FilterBy, QueryParam } from '../types/Order';
import { SearchLink } from './SearchLink';

type Props = {
  setSearchParams: SetURLSearchParams;
  searchParams: URLSearchParams;
  sex: string | null;
  centuries: string[];
};

export const PeopleFilters = ({
  setSearchParams,
  searchParams,
  sex,
  centuries,
}: Props) => {
  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set(QueryParam.SEARCH, event.target.value);
    } else {
      params.delete(QueryParam.SEARCH);
    }

    setSearchParams(params);
  }

  function handleSexChange(sexType: FilterSexType) {
    const params = new URLSearchParams(searchParams);

    if (sexType !== FilterSexType.All) {
      params.set(FilterBy.Sex, sexType);
    } else {
      params.delete(FilterBy.Sex);
    }

    setSearchParams(params);
  }

  function handleCenturiesChange(century: string) {
    const params = new URLSearchParams(searchParams);
    const currentCenturies = searchParams.getAll(FilterBy.Centuries);

    if (currentCenturies.includes(century)) {
      params.delete(FilterBy.Centuries);
      currentCenturies.forEach(currentCentury => {
        if (currentCentury !== century) {
          params.append(FilterBy.Centuries, currentCentury);
        }
      });
    } else {
      params.append(FilterBy.Centuries, century);
    }

    setSearchParams(params);
  }

  const availableCenturies = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({
            'is-active': !sex,
          })}
          onClick={() => handleSexChange(FilterSexType.All)}
        >
          All
        </a>
        <a
          className={classNames({
            'is-active': sex === FilterSexType.Male,
          })}
          onClick={() => handleSexChange(FilterSexType.Male)}
        >
          Male
        </a>
        <a
          className={classNames({
            'is-active': sex === FilterSexType.Female,
          })}
          onClick={() => handleSexChange(FilterSexType.Female)}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
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
            {availableCenturies.map(century => (
              <a
                key={century}
                data-cy={`century-${century}`}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                onClick={() => handleCenturiesChange(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
          params={{ query: null, sex: null, centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
