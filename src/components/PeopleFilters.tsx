import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SexFilter, SenturyFilter } from '../types/FilterKeys';
import { SearchParms } from '../types/SearchParams';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCenturiesLink = (paramValue: string | null) => {
    const newSerchParams = new URLSearchParams(searchParams);

    if (!paramValue) {
      newSerchParams.delete(SearchParms.Centuries);

      return newSerchParams.toString();
    }

    const centuriesList = newSerchParams.getAll(SearchParms.Centuries);

    if (centuriesList.includes(paramValue)) {
      newSerchParams.delete(SearchParms.Centuries);
      centuriesList
        .forEach(el => el !== paramValue
            && newSerchParams.append(SearchParms.Centuries, el));

      return newSerchParams.toString();
    }

    newSerchParams.append(SearchParms.Centuries, paramValue);

    return newSerchParams.toString();
  };

  const handleFilterLink = (paramKey: string, paramValue: string) => {
    if (searchParams.get(paramKey) === paramValue) {
      return searchParams.toString();
    }

    const newSerchParams = new URLSearchParams(searchParams);

    if (!paramValue) {
      newSerchParams.delete(paramKey);

      return newSerchParams.toString();
    }

    newSerchParams.set(paramKey, paramValue);

    return newSerchParams.toString();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setSearchParams(handleFilterLink(SearchParms.Query, event.target.value));
  };

  const handleResetAllFilters = () => {
    const newSerchParams = new URLSearchParams(searchParams);

    newSerchParams.delete(SearchParms.Centuries);
    newSerchParams.delete(SearchParms.Query);
    newSerchParams.delete(SearchParms.Sex);

    return newSerchParams.toString();
  };

  const isResetAllActive = searchParams.has(SearchParms.Sex)
    || searchParams.has(SearchParms.Query)
    || searchParams.has(SearchParms.Centuries);

  const hasActiveLinkActive = (sex: string) => {
    return sex === searchParams.get(SearchParms.Sex)
    || (sex === SexFilter.All
      && !searchParams.has(SearchParms.Sex));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SexFilter).map(([key, value]) => (
          <Link
            to={{ search: handleFilterLink(SearchParms.Sex, value) }}
            key={key}
            className={classNames({
              'is-active': hasActiveLinkActive(value),
            })}
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
            className="input"
            placeholder="Search"
            value={searchParams.get(SearchParms.Query) ?? ''}
            onChange={handleInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Object.values(SenturyFilter).map(value => (
              <Link
                key={value}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': searchParams
                    .getAll(SearchParms.Centuries).includes(value),
                })}
                to={{ search: handleCenturiesLink(value) }}
              >
                {value}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': searchParams.has(SearchParms.Centuries),
              })}
              to={{ search: handleCenturiesLink(null) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className={classNames('button', 'is-link', 'is-fullwidth', {
            'is-outlined': isResetAllActive,
          })}
          to={{ search: handleResetAllFilters() }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
