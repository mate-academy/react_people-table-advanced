import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

interface PeopleFiltersProps {
  query: string;
  onQueryChange: (newQuery: string) => void;
  sex: string;
  onSexChange: (newSex: string) => void;
  centuries: number[];
  onCenturyChange: (century: number[]) => void;
}

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  query,
  onQueryChange,
  sex,
  onSexChange,
  centuries,
  onCenturyChange,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCenturies = searchParams.getAll('centuries').map(Number) || [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  const handleSexChange = (newSex: string) => {
    onSexChange(newSex);
  };

  const handleCenturyChange = (century: number) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (centuries.includes(century)) {
      newParams.delete('centuries', century.toString());
    } else {
      newParams.append('centuries', century.toString());
    }

    setSearchParams(newParams);
  };

  const allCenturies = [16, 17, 18, 19, 20];
  const isAllActive = activeCenturies.length === 0;

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === '' ? 'is-active' : ''}
          onClick={() => handleSexChange('')}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
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
            onChange={handleSearchChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {allCenturies.map(century => (
              <a
                key={century}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(century) ? 'is-info' : ''}`}
                onClick={() => handleCenturyChange(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !isAllActive,
              })}
              onClick={() => onCenturyChange([])}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            onQueryChange('');
            onSexChange('');
            onCenturyChange([]);
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
