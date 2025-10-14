import { ChangeEvent } from 'react';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

const centuriesList = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Sex filter */}
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={!sex ? 'is-active' : ''}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={sex === 'f' ? 'is-active' : ''}
        >
          Female
        </SearchLink>
      </p>

      {/* Name filter */}
      <div className="panel-block">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          defaultValue={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.trim();
            searchParams.set('query', value || '');
            window.history.replaceState(
              null,
              '',
              `#/people?${searchParams.toString()}`
            );
          }}
        />
      </div>

      {/* Century filter */}
      <div className="panel-block">
        <div
          className="level is-flex-grow-1 is-mobile"
          data-cy="CenturyFilter"
        >
          <div className="level-left">
            {centuriesList.map((c) => {
              const isSelected = selectedCenturies.includes(c);
              return (
                <SearchLink
