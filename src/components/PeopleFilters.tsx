import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  setSearchWith: (params: SearchParams) => void;
};

const buttonsCenturies = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC<Props> = ({ setSearchWith }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const filterCenturies = searchParams.getAll('century') || [];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({
            'is-active': sex === null,
          })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: null }}
          className={cn({
            'is-active': sex === 'm',
          })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: null }}
          className={cn({
            'is-active': sex === 'f',
          })}
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
            // eslint-disable-next-line max-len
            onChange={(event) => setSearchWith({ query: event.target.value || null })}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {buttonsCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': filterCenturies.includes(century),
                })}
                params={{
                  centuries: filterCenturies.includes(century)
                    ? filterCenturies.filter(item => item !== century)
                    : [...filterCenturies, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
          params={{
            centuries: null,
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
