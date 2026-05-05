import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../../utils/searchHelper';
import { GenderFilter } from './GenderFilter';
import { NameQueryInput } from './NameQueryInput';
import { CenturiesFilter } from './CenturiesFilter';
import FilterParam from '../../types/Filter';

const PeopleFiltersBase = () => {
  const [searchParams] = useSearchParams();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <GenderFilter />
      <NameQueryInput />
      <CenturiesFilter />

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(searchParams, {
              [FilterParam.Centuries]: null,
              [FilterParam.Sex]: null,
              [FilterParam.Name]: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

export const PeopleFilters = React.memo(PeopleFiltersBase);
