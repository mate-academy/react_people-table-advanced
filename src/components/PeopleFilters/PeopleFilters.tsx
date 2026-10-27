import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SerchParams } from '../../types/SerchParams';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getNewSearchParams = (param: string, value: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (value === null) {
      newSearchParams.delete(param);
    } else {
      newSearchParams.set(param, value);
    }

    return newSearchParams;
  };

  const handleNameFilterChange = (query: string) => {
    setSearchParams(getNewSearchParams(SerchParams.Name, query || null));
  };

  const handleCenturyFilter = (century: string) => {
    const serchCenturies = searchParams.getAll(SerchParams.Centuries);

    const newSearchCenturies = serchCenturies.includes(century)
      ? serchCenturies.filter(c => c !== century)
      : [...serchCenturies, century];

    const newSearchParams = getNewSearchParams(SerchParams.Centuries, null);

    newSearchCenturies.forEach(c => {
      newSearchParams.append(SerchParams.Centuries, c);
    });

    return newSearchParams;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': !searchParams.get(SerchParams.Sex) })}
          to={{ search: getNewSearchParams(SerchParams.Sex, null).toString() }}
        >
          All
        </Link>
        <Link
          className={cn({
            'is-active': searchParams.get(SerchParams.Sex) === 'm',
          })}
          to={{ search: getNewSearchParams(SerchParams.Sex, 'm').toString() }}
        >
          Male
        </Link>
        <Link
          className={cn({
            'is-active': searchParams.get(SerchParams.Sex) === 'f',
          })}
          to={{ search: getNewSearchParams(SerchParams.Sex, 'f').toString() }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get(SerchParams.Name) || ''}
            onChange={e => handleNameFilterChange(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <Link
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': searchParams
                  .getAll(SerchParams.Centuries)
                  .includes('16'),
              })}
              to={{ search: handleCenturyFilter('16').toString() }}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': searchParams
                  .getAll(SerchParams.Centuries)
                  .includes('17'),
              })}
              to={{ search: handleCenturyFilter('17').toString() }}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': searchParams
                  .getAll(SerchParams.Centuries)
                  .includes('18'),
              })}
              to={{ search: handleCenturyFilter('18').toString() }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': searchParams
                  .getAll(SerchParams.Centuries)
                  .includes('19'),
              })}
              to={{ search: handleCenturyFilter('19').toString() }}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': searchParams
                  .getAll(SerchParams.Centuries)
                  .includes('20'),
              })}
              to={{ search: handleCenturyFilter('20').toString() }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                search: getNewSearchParams(
                  SerchParams.Centuries,
                  null,
                ).toString(),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
