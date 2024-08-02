import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const getNewCenturies = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(num => num !== century)
      : [...centuries, century];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: e.target.value || null }),
    );
  };

  const getCenturiesClass = (century: string) => {
    return cn('button', 'mr-1', { 'is-info': centuries.includes(century) });
  };

  const getSexLinkClass = (value: 'm' | 'f' | null) =>
    cn({ 'is-active': sex === value });

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }} className={getSexLinkClass(null)}>
          All
        </SearchLink>

        <SearchLink params={{ sex: 'm' }} className={getSexLinkClass('m')}>
          Male
        </SearchLink>

        <SearchLink params={{ sex: 'f' }} className={getSexLinkClass('f')}>
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
            value={query || ''}
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
            <SearchLink
              data-cy="century"
              className={getCenturiesClass('16')}
              params={{ centuries: getNewCenturies('16') }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={getCenturiesClass('17')}
              params={{ centuries: getNewCenturies('17') }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={getCenturiesClass('18')}
              params={{ centuries: getNewCenturies('18') }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={getCenturiesClass('19')}
              params={{ centuries: getNewCenturies('19') }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={getCenturiesClass('20')}
              params={{ centuries: getNewCenturies('20') }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
