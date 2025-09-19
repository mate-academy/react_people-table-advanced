import classNames from 'classnames';
import type { ChangeEvent } from 'react';

type Props = {
  sex: string;
  query: string;
  centuries: string[];
  allCenturies: number[];
  handleGenderChange: (gen: string) => void;
  handleQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCenturyChange: (number: number) => void;
  clearCenturies: () => void;
  resetAll: () => void;
};

export const PeopleFilters: React.FC<Props> = ({
  sex,
  query,
  centuries,
  allCenturies,
  handleGenderChange,
  handleQueryChange,
  handleCenturyChange,
  clearCenturies,
  resetAll,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <button
          type="button"
          className={classNames(sex === '' ? 'is-active' : '')}
          onClick={() => handleGenderChange('')}
        >
          All
        </button>
        <button
          type="button"
          className={classNames(sex === 'm' ? 'is-active' : '')}
          onClick={() => handleGenderChange('m')}
        >
          Male
        </button>
        <button
          type="button"
          className={classNames(sex === 'f' ? 'is-active' : '')}
          onClick={() => handleGenderChange('f')}
        >
          Female
        </button>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            className="input"
            placeholder="Search"
            onChange={e => {
              handleQueryChange(e);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {allCenturies.map(cen => {
              return (
                <button
                  key={cen}
                  data-cy="century"
                  className={classNames(
                    centuries.includes(cen.toString())
                      ? 'button mr-1 is-info'
                      : 'button mr-1',
                  )}
                  onClick={() => {
                    handleCenturyChange(cen);
                  }}
                >
                  {cen}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              onClick={e => {
                e.preventDefault();
                clearCenturies();
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          type="button"
          className="button is-link is-outlined is-fullwidth"
          onClick={e => {
            e.preventDefault();
            resetAll();
          }}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
