import classnames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
};

export const PeopleFilters: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  const buttonNumbers = ['16', '17', '18', '19', '20'];
  const EMPTY_CENTURIES: string[] = [];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    const updatedSearchParams
      = getSearchWith(searchParams, { query: value || null });

    setSearchParams(new URLSearchParams(updatedSearchParams));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classnames({
            'is-active': !searchParams.get('sex'),
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classnames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classnames({
            'is-active': searchParams.get('sex') === 'f',
          })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">

          <SearchLink params={{ query: query || null }}>
            <input
              data-cy="NameFilter"
              type="search"
              className="input"
              placeholder="Search"
              value={query || ''}
              onChange={handleInputChange}
            />
          </SearchLink>

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="false" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {buttonNumbers.map(centuryButton => {
              const isSelected = centuries.includes(centuryButton);
              const updatedCenturies = isSelected
                ? centuries.filter(century => century !== centuryButton)
                : [...centuries, centuryButton];

              return (
                <SearchLink
                  data-cy="century"
                  className={classnames('button', 'mr-1', {
                    'is-info': isSelected,
                  })}
                  params={{ centuries: updatedCenturies }}
                  key={centuryButton}
                >
                  {centuryButton}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classnames('button', 'is-success', {
                'is-outlined': centuries.length,
              })}
              params={{ centuries: EMPTY_CENTURIES }}
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
            sex: null,
            centuries: EMPTY_CENTURIES,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
