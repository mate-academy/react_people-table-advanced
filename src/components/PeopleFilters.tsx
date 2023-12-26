import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Filter } from '../types/Filter';

export const PeopleFilters = () => {
  const [filterParams, setFilterParams] = useSearchParams();

  const handleFilterChanging = (
    field: Filter,
    value: string,
  ) => {
    setFilterParams(currentParams => {
      if (!value) {
        currentParams.delete(field);

        return currentParams;
      }

      currentParams.set(field, value);

      return currentParams;
    });
  };

  const handleCenturiesApplying = (value: string) => {
    const centuries = filterParams.getAll('century');

    if (centuries.includes(value)) {
      setFilterParams(currentParams => {
        const currentCentury = currentParams.getAll('century')
          .filter(centuryNumber => centuryNumber !== value);

        currentParams.delete('century');

        currentCentury.forEach(century => {
          currentParams.append('century', century);
        });

        return currentParams;
      });
    } else {
      setFilterParams(currentParams => {
        currentParams.append('century', value);

        return currentParams;
      });
    }
  };

  const handleResetCenturies = () => {
    setFilterParams(currentParams => {
      currentParams.delete('century');

      return currentParams;
    });
  };

  const handleResetAll = () => {
    setFilterParams({});
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          role="presentation"
          className={cn({ 'is-active': !filterParams.get('sex') })}
          onClick={() => handleFilterChanging(Filter.Sex, '')}
        >
          All
        </a>
        <a
          role="presentation"
          className={cn({ 'is-active': filterParams.get('sex') === 'm' })}
          onClick={() => handleFilterChanging(Filter.Sex, 'm')}
        >
          Male
        </a>
        <a
          role="presentation"
          className={cn({ 'is-active': filterParams.get('sex') === 'f' })}
          onClick={() => handleFilterChanging(Filter.Sex, 'f')}
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
            value={filterParams.get('query') || ''}
            onChange={(event) => handleFilterChanging(
              Filter.Query,
              event.target.value,
            )}
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
              role="presentation"
              className={cn(
                'button mr-1',
                { 'is-info': filterParams.getAll('century').includes('16') },
              )}
              onClick={() => handleCenturiesApplying('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              role="presentation"
              className={cn(
                'button mr-1',
                { 'is-info': filterParams.getAll('century').includes('17') },
              )}
              onClick={() => handleCenturiesApplying('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              role="presentation"
              className={cn(
                'button mr-1',
                { 'is-info': filterParams.getAll('century').includes('18') },
              )}
              onClick={() => handleCenturiesApplying('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              role="presentation"
              className={cn(
                'button mr-1',
                { 'is-info': filterParams.getAll('century').includes('19') },
              )}
              onClick={() => handleCenturiesApplying('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              role="presentation"
              className={cn(
                'button mr-1',
                { 'is-info': filterParams.getAll('century').includes('20') },
              )}
              onClick={() => handleCenturiesApplying('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              role="presentation"
              className="button is-success is-outlined"
              onClick={handleResetCenturies}
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
          onClick={handleResetAll}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
