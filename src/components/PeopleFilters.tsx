import React from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  query: string;
  updateQuery: (query: string) => void;
  updateSex: (sex: string) => void;
  selected: string[];
  toggleCentury: (century: string) => void;
  resetAllFilters: () => void;
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  updateQuery,
  toggleCentury,
  selected,
  updateSex,
  resetAllFilters,
}) => {
  const [searchParams] = useSearchParams();

  function getActiveCentury(value: string) {
    return selected.includes(value) ? 'button mr-1 is-info' : 'button mr-1';
  }
  function getActiveSex(value: string) {
    return searchParams.get('sex') === value ? 'is-active' : '';
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!searchParams.get('sex') ? 'is-active' : ''}
          onClick={() => updateSex('all')}
        >
          All
        </a>
        <a className={getActiveSex('m')} onClick={() => updateSex('m')}>
          Male
        </a>
        <a className={getActiveSex('f')} onClick={() => updateSex('f')}>
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
            onChange={e => updateQuery(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className={getActiveCentury('16')}
              onClick={() => toggleCentury('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={getActiveCentury('17')}
              onClick={() => toggleCentury('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={getActiveCentury('18')}
              onClick={() => toggleCentury('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={getActiveCentury('19')}
              onClick={() => toggleCentury('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={getActiveCentury('20')}
              onClick={() => toggleCentury('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button is-success ${selected.length === 0 ? '' : 'is-outlined'}`}
              onClick={() => toggleCentury('ALL')}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAllFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
