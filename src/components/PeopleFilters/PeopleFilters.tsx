import { SearchLink } from '../SearchLink';
import classNames from 'classnames';
import { SexFilters } from '../../types/SexFilters';
import { useSearchParams } from 'react-router-dom';

const centuriesCollection = ['16', '17', '18', '19', '20'];

type Props = {
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleCentury: (century: string) => void;
  query: string;
  centuriesQuery: string[];
};

export const PeopleFilters: React.FC<Props> = ({
  handleQueryChange,
  toggleCentury,
  query,
  centuriesQuery,
}) => {
  const [searchParams] = useSearchParams();
  const selectedSexFilter = searchParams.get('sex');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <div className="panel-tabs" data-cy="SexFilter">
        {SexFilters.map(({ name, sex }) => (
          <SearchLink
            key={name}
            className={classNames({
              'is-active':
                selectedSexFilter === sex || (!selectedSexFilter && !sex),
            })}
            params={{ sex }}
          >
            {name}
          </SearchLink>
        ))}
      </div>

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
            {centuriesCollection.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuriesQuery.includes(century),
                })}
                params={{ centuries: [century] }}
                onClick={event => {
                  event.preventDefault();
                  toggleCentury(century);
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button mr-1 is-success', {
                'is-outlined': centuriesQuery.length > 0,
              })}
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
