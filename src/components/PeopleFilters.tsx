import { FC } from 'react';

type Props = {
  query: string;
  handleQueryChange: (query: string) => void;
  sex: string;
  handleSexChange: (sex: '' | 'm' | 'f') => void;
  centuriesList: number[];
  centuries: number[] | null;
  hanldeCenturiesChange: (centuries: number) => void;
  handleCenturiesReset: () => void;
  resetFilters: () => void;
};

export const PeopleFilters: FC<Props> = ({
  query,
  handleQueryChange,
  sex,
  handleSexChange,
  centuriesList,
  centuries,
  hanldeCenturiesChange,
  handleCenturiesReset,
  resetFilters,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === '' ? 'is-active' : ''}
          // href="#/people"
          onClick={() => handleSexChange('')}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          // href="#/people?sex=m"
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          // href="#/people?sex=f"
          onClick={() => handleSexChange('f')}
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
            value={query}
            onChange={event => handleQueryChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(century => (
              <a
                key={century}
                data-cy="century"
                className={`button mr-1 ${
                  centuries?.includes(century) ? 'is-info' : ''
                }`}
                onClick={() => hanldeCenturiesChange(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={handleCenturiesReset}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={resetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
