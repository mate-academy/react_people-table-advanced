import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import classNames from 'classnames';
import { NameFilter } from './NameFilter';
import { CenturyFilter } from './CenturyFilter';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSex = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries') || [];

  const handleUpdate = (paramsToUpdate: SearchParams) => {
    const newSearch = getSearchWith(searchParams, paramsToUpdate);

    setSearchParams(new URLSearchParams(newSearch));
  };

  const handleClearAll = () => {
    setSearchParams('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames('', { 'is-active': !selectedSex })}
          onClick={() => handleUpdate({ sex: null })}
        >
          All
        </a>
        <a
          className={classNames('', { 'is-active': selectedSex === 'm' })}
          onClick={() => handleUpdate({ sex: 'm' })}
        >
          Male
        </a>
        <a
          className={classNames('', { 'is-active': selectedSex === 'f' })}
          onClick={() => handleUpdate({ sex: 'f' })}
        >
          Female
        </a>
      </p>

      <NameFilter handleUpdate={handleUpdate} />

      <CenturyFilter
        selectedCenturies={selectedCenturies}
        onUpdate={handleUpdate}
      />

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => handleClearAll()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
