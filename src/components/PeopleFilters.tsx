import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || 'All';
  const centuries = searchParams.getAll('centuries') || [];

  // eslint-disable-next-line
  function setSearchWith(params: any) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleSexChange(newSex: string) {
    const params = new URLSearchParams(searchParams);

    params.set('sex', newSex);
    setSearchParams(params);
  }

  const hadnlQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value });
  };

  const toogleCentury = (char: string) => {
    let newCentury;

    if (centuries.includes(char)) {
      newCentury = centuries.filter(centr => centr !== char);
    } else {
      newCentury = [...centuries, char];
    }

    setSearchWith({ century: newCentury });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': sex === 'All',
          })}
          onClick={() => handleSexChange('All')}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({
            'is-active': sex === 'm',
          })}
          onClick={() => handleSexChange('Male')}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({
            'is-active': sex === 'f',
          })}
          onClick={() => handleSexChange('Female')}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={hadnlQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(centrury => (
              <SearchLink
                key={centrury}
                params={{
                  centuries: centuries.includes(centrury)
                    ? centuries.filter(ch => centrury !== ch)
                    : [...centuries, centrury],
                }}
                data-cy="century"
                onClick={() => toogleCentury(centrury)}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(centrury),
                })}
              >
                {centrury}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            centuries: null,
            sex: null,
            query: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
