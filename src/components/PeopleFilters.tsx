import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { SearchWith } from '../utils/SearchWith';
import { SexType } from '../types/SexType';

type Props = {
  searchParams: URLSearchParams,
  setSearchParams: (nextInit: string) => void,
  query: string,
  sexFilter: string,
  centuries: string[],
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  query,
  sexFilter,
  centuries,
}) => {
  const centuryFilterNumbers = ['16', '17', '18', '19', '20'];

  function setSearchWith(params: any) {
    const search = SearchWith(params, searchParams);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  function handleCenturyFilter(century: string) {
    return SearchWith({
      centuries: centuries.includes(century)
        ? centuries.filter(currentCentury => currentCentury !== century)
        : [...centuries, century],
    }, searchParams);
  }

  function clearCenturies() {
    return SearchWith({ centuries: null }, searchParams);
  }

  function handleReset() {
    return SearchWith({
      query: null,
      sexFilter: null,
      centuries: null,
    });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames('', {
            'is-active': sexFilter === '',
          })}
          to={{ search: SearchWith({ sex: null }, searchParams) }}
        >
          All
        </Link>

        <Link
          className={classNames('', {
            'is-active': sexFilter === SexType.MALE,
          })}
          to={{ search: SearchWith({ sex: SexType.MALE }, searchParams) }}
        >
          Male
        </Link>
        <Link
          className={classNames('', {
            'is-active': sexFilter === SexType.FEMALE,
          })}
          to={{ search: SearchWith({ sex: SexType.FEMALE }, searchParams) }}
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
            onChange={handleQueryChange}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryFilterNumbers.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{ search: handleCenturyFilter(century) }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              to={{ search: clearCenturies() }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: handleReset() }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
