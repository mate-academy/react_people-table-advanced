import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { SexFilter } from '../../types/SexFilter';
import { CenturiesFilter } from '../../types/CenturiesFilter';
import { AVAILABLE_CENTURIES } from '../../constants/availableCenturies';
import { Param } from '../../types/Param';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const peopleSex = searchParams.get(Param.Sex) || SexFilter.All;
  const centuries = searchParams.getAll(Param.Centuries) || [];
  const query = searchParams.get(Param.Query) || '';

  const handleFilterSex = (sex: SexFilter) => {
    const params = new URLSearchParams(searchParams);

    if (sex) {
      params.set(Param.Sex, sex);
    } else {
      params.delete(Param.Sex);
    }

    return params.toString();
  };

  const handleFilterBornInXCentury = (century: CenturiesFilter) => {
    const params = new URLSearchParams(searchParams);

    if (century === CenturiesFilter.All) {
      params.delete(Param.Centuries);

      return params.toString();
    }

    const newCenturies = centuries.includes(century.toString())
      ? centuries.filter(currCentury => +currCentury !== century)
      : [...centuries, century];

    params.delete(Param.Centuries);
    newCenturies.forEach(centuryToAppend =>
      params.append(Param.Centuries, centuryToAppend.toString()),
    );

    return params.toString();
  };

  const handleFilterQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value.length) {
      params.set(Param.Query, event.target.value);
    } else {
      params.delete(Param.Query);
    }

    setSearchParams(params);
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete(Param.Sex);
    params.delete(Param.Centuries);
    params.delete(Param.Query);

    return params.toString();
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SexFilter).map(([key, value]) => (
          <Link
            key={key}
            className={classNames({
              'is-active': peopleSex === value,
            })}
            to={{
              search: handleFilterSex(value),
            }}
          >
            {key}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            className="input"
            placeholder="Search"
            onChange={handleFilterQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {AVAILABLE_CENTURIES.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{
                  search: handleFilterBornInXCentury(+century),
                }}
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
              to={{ search: handleFilterBornInXCentury(CenturiesFilter.All) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: handleResetFilters() }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
