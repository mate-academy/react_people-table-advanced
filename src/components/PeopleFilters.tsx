import React from 'react';

type Props = {
  name: string;
  selectedSex: string;
  sortBy: string;
  selectedCenturies: string[];
  onFilterChange: (name: string) => void;
  onSexChange: (sex: string) => void;
  onCenturyChange: (century: string[]) => void;
  onSortChange: (sort: string) => void;
  onReset: () => void;
};

const allCenturies = ['17', '18', '19', '20'];

export const PeopleFilters: React.FC<Props> = ({
  name,
  onFilterChange,
  onSexChange,
  onCenturyChange,
  onReset,
  selectedCenturies,
  selectedSex,
}) => {
  const handleToggleAllCenturies = (e: React.MouseEvent) => {
    e.preventDefault();
    const areAllSelected = allCenturies.every(c =>
      selectedCenturies.includes(c),
    );

    if (areAllSelected) {
      onCenturyChange([]);
    } else {
      onCenturyChange(allCenturies);
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={`button ${selectedSex === '' ? 'is-active' : ''}`}
          href="#/people"
          onClick={() => onSexChange('')}
        >
          All
        </a>
        <a
          className={`button ${selectedSex === 'm' ? 'is-active' : ''}`}
          href="#/people?sex=m"
          onClick={() => onSexChange('m')}
        >
          Male
        </a>
        <a
          className={`button ${selectedSex === 'f' ? 'is-active' : ''}`}
          href="#/people?sex=f"
          onClick={() => onSexChange('f')}
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
            value={name}
            onChange={e => onFilterChange(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {allCenturies.map(c => (
              <a
                key={c}
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.includes(c) ? 'is-info' : ''}`}
                href={`#/people?centuries=${c}`}
                onClick={e => {
                  e.preventDefault();
                  if (selectedCenturies.includes(c)) {
                    onCenturyChange(selectedCenturies.filter(sc => sc !== c));
                  } else {
                    onCenturyChange([...selectedCenturies, c]);
                  }
                }}
              >
                {c}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button is-success is-outlined ${selectedCenturies.length === 0 ? 'is-active' : ''}`}
              href="#/people"
              onClick={handleToggleAllCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={onReset}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
