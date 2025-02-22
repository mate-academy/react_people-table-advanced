import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import React, { useState, useEffect } from 'react';

interface PeopleFiltersProps {
  persons: Person[];
  onFilterChange: (filter: 'all' | 'male' | 'female') => void;

  onClick: (century: string | 'all' | null) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  onFilterChange,
  onClick,
  onChange,
}) => {
  const [filter, setFilter] = useState<'all' | 'male' | 'female'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const centuryQuery = searchParams.getAll('century') || [];

  useEffect(() => {
    const currentFilter = searchParams.get('filter') as
      | 'all'
      | 'male'
      | 'female';
    const currentSearch = searchParams.get('search') || '';

    if (currentFilter) {
      setFilter(currentFilter);
    } else {
      setFilter('all');
    }

    if (centuryQuery.length > 0) {
      searchParams.set('century', centuryQuery.join(','));
    } else {
      searchParams.delete('century');
    }

    setSearchQuery(currentSearch);
  }, [searchParams]);

  const handleAllClick = () => {
    searchParams.delete('century');
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete('century');
    newSearchParams.delete('filter');
    newSearchParams.set('filter', 'all');

    setSearchParams(newSearchParams);
    onClick(null);
  };

  const handleResetFilters = () => {
    searchParams.delete('century');
    const newSearchParams = new URLSearchParams();

    newSearchParams.delete('filter');
    newSearchParams.delete('sort');
    newSearchParams.delete('search');
    newSearchParams.delete('century');
    setSearchParams(newSearchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={filter === 'all' ? 'is-active' : ''}
          to="#"
          onClick={e => {
            e.preventDefault();
            onFilterChange('all');
          }}
        >
          All
        </Link>
        <Link
          className={filter === 'male' ? 'is-active' : ''}
          to="#"
          onClick={e => {
            e.preventDefault();
            onFilterChange('male');
          }}
        >
          Male
        </Link>
        <Link
          className={filter === 'female' ? 'is-active' : ''}
          to="#"
          onClick={e => {
            e.preventDefault();
            onFilterChange('female');
          }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchQuery}
            onChange={onChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <Link
                key={century}
                data-cy="century"
                className={`button mr-1 ${centuryQuery.includes(century) ? 'is-info' : ''}`}
                to={`/people?century=${century}`}
                onClick={e => {
                  e.preventDefault();
                  onClick(century);
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="#/people"
              onClick={handleAllClick}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
          onClick={e => {
            e.preventDefault();
            handleResetFilters();
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
