import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [sParams, setSParams] = useSearchParams();

  function handleCenturies(centNum: string) {
    if (sParams.getAll('centuries').includes(centNum)) {
      sParams.delete('centuries', centNum);
    } else {
      sParams.append('centuries', centNum);
    }

    // if (sParams.getAll('centuries').length === 5) {
    //   sParams.delete('centuries');
    // }

    setSParams(sParams);
  }

  return (
    <div className="column is-7-tablet is-narrow-desktop">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <SearchLink
            className={classNames({ 'is-active': sParams.get('sex') === null })}
            params={{ sex: null }}
          >
            All
          </SearchLink>
          <SearchLink
            className={classNames({ 'is-active': sParams.get('sex') === 'm' })}
            params={{ sex: 'm' }}
          >
            Male
          </SearchLink>
          <SearchLink
            className={classNames({ 'is-active': sParams.get('sex') === 'f' })}
            params={{ sex: 'f' }}
          >
            Female
          </SearchLink>
        </p>

        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              data-cy="NameFilter"
              type="search"
              className="input"
              placeholder="Search"
              value={
                sParams.get('name') === null
                  ? ''
                  : (sParams.get('name') as string)
              }
              onChange={({ target }) => {
                setSParams(p => {
                  return getSearchWith(p, {
                    name: target.value === '' ? null : target.value,
                  });
                });
              }}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {['16', '17', '18', '19', '20'].map(num => (
                <button
                  key={num}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': sParams.getAll('centuries').includes(num),
                  })}
                  onClick={() => {
                    handleCenturies(num);
                  }}
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="level-right ml-4">
              <button
                data-cy="centuryALL"
                className={classNames('button is-success', {
                  'is-outlined': sParams.has('centuries'),
                })}
                onClick={() => {
                  setSParams(prevSParams => {
                    prevSParams.delete('centuries');

                    return prevSParams;
                  });
                }}
              >
                All
              </button>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <a
            className="button is-link is-outlined is-fullwidth"
            href="#/people"
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </div>
  );
};
